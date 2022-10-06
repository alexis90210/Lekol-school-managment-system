<template>
    <div class="is-flex is-flex-wrap-wrap h100" style="background-color: #081727; gap:20px; padding-top:10vh; 
    padding-bottom:10vh; padding-inline: 40px; overflow-y: scroll;">
      
      <b-collapse
      class="card"
      animation="slide"
      v-for="(annee, index) of anneeScolaire"
      :key="index"
      :open="true"
      :aria-id="'contentIdForA11y5-' + index">
      <template #trigger="props">
          <div
              class="card-header"
              role="button"
              :aria-controls="'contentIdForA11y5-' + index"
              :aria-expanded="props.open"
          >
              <p class="card-header-title has-text-light">
                  {{ annee.debut }} -  {{ annee.fin }}
              </p>
              <a class="card-header-icon">
                  <b-icon
                      :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
              </a>
          </div>
      </template>
      <div class="card-content">
          <div class="content has-text-light is-size-6 has-text-success">
            Ouverure de l'annee  {{ annee.debut }} -  {{ annee.fin }} <br> effectuee avec success
              
          </div>

          <div class="mt-6" >
                  <b-button
                    type="is-link"
                    expanded
                    rounded
                    @click="$router.push('/')"
                    icon-left="content-save-cog"
                    >Se connecter</b-button
                  >
                </div>
      </div>
      </b-collapse>
  
      <b-collapse
      class="card card2"
      v-if="anneeScolaire.length == 0"
      :open="true"
      :aria-id="'contentIdForA11y5-'">
      <template #trigger="props">
          <div
              class="card-header"
              role="button"
              :aria-controls="'contentIdForA11y5-'"
              :aria-expanded="props.open"
          >
              <p class="card-header-title has-text-light">
                 Ouverture d'une nouvelle annee
              </p>
              <a class="card-header-icon">
                  <b-icon
                      :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
              </a>
          </div>
      </template>
      <div class="card-content">
          <div class="content has-text-light">
  
              <div class="mt">
                    <p class="text-white mt is-size-7">Debut d'annee</p>
                    <input
                      class="input-text"
                      v-model="ouverture.debut"
                      required
                    />
                  </div>
  
                  <div class="mt">
                    <p class="text-white mt is-size-7">Fin d'annee</p>
                    <input
                      class="input-text"
                      v-model="ouverture.fin"
                      required
                    />
                  </div>
              
                <div class="mt-6" >
                  <b-button
                    type="is-info"
                    icon-left="content-save-cog"
                    @click="ouvertureAnnee"
                    >J'ouvre une nouvelle annee</b-button
                  >
                </div>
  
               
          </div>
      </div>
      </b-collapse>
    </div>
  </template>
  
  <script>
  
  import db from '../../plugins/model'
  
  export default {
  
    data() {
      return {
          anneeScolaire : [],
          isOpen: 0,
          ouverture:{
              debut:'',
              fin:''
          }
      };
    },
  
    async mounted(){
      this.anneeScolaire = await db.allAnneeScolaire()
  
    },
    methods:{
  
      async adminAnnee(annee) {
          await this.$localForage.setItem('annee', annee )
          this.$router.push("/dashboard");
  
      },
  
      async ouvertureAnnee() {
          await db.createAnneeScolaire(this.ouverture.debut ,  this.ouverture.fin);
          this.anneeScolaire = await db.allAnneeScolaire()
      },
  
  
      async clotureAnnee(bool , annee) {
          let message  = bool ? "Voulez-vous cloturer l'annee " + annee + "-" + (annee+1) + " ?" : "Voulez-vous de-cloturer l'annee " + annee + "-" + (annee+1) + " ?"
          let feedback  = bool ? "Cloturer l'annee " + annee + "-" + (annee+1) + " reussie !" 
          : "De-cloturer l'annee " + annee + "-" + (annee+1) + " reussie !"
      
          this.$buefy.dialog.alert({
              title:'Cloture de l\'annee scolaire',
              message:message,
              type: bool ? "is-danger" : "is-info",
              hasIcon:true,
              onConfirm:async () => {
                  let exec = await db.clotureEtablissement(annee , bool ? 1 : 0);
                
                      this.anneeScolaire = await db.allAnneeScolaire()
               
  
              }
          })
      },
    }
  
  };
  </script>
  
  <style>
  .h100 {
    width: 100%;
    height: 100vh;
  }
  
  .card2 {
      background-color: rgba(8, 246, 8, 0.015) !important;
  }
  
  .card {
      background-color: #081727;
  }
  
  </style>
  