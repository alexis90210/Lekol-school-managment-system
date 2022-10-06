<template>
  <div>
    <!-- tab-cycle-view -->
    <form @submit.prevent="saveCycle">
      <div class="container-box pt-6" id="tab-cycle-view">
        <p class="text-white px pb-5">CONFIGURATION DES CYCLES</p>

        <div class="topleft align-row">
          <div class="topbar-title-item box  m-1 has-background-success-dark has-text-light">
            <abbr title="Cycle Maternel" class="abbr-o">
              <span class="align-row">
                <b-switch
                  type="is-success"
                  v-model="cycle.prescolaire"
                  id="conf-prescolaire"
                  true-value="1"
                  false-value="0"
                  >PRESCOLAIRE</b-switch
                >
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item box  m-1 has-background-danger-dark has-text-light">
            <abbr title="Cycle prescolaire" class="abbr-o">
              <span class="align-row align-center">
                <b-switch
                  type="is-success"
                  v-model="cycle.primaire"
                  true-value="1"
                  false-value="0"
                  id="conf-primaire"
                  >PRIMAIRE</b-switch
                >
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item box  m-1 has-background-info-dark has-text-light">
            <abbr title="Cycle primaire" class="abbr-o">
              <span class="align-row">
                <b-switch
                  type="is-success"
                  v-model="cycle.college"
                  true-value="1"
                  false-value="0"
                  id="conf-college"
                  >COLLEGE</b-switch
                >
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item box m-1 has-background-link-dark has-text-light">
            <abbr title="Cycle College" class="abbr-o">
              <span class="align-row">
                <b-switch
                  type="is-success"
                  v-model="cycle.lycee"
                  true-value="1"
                  false-value="0"
                  id="conf-lycee"
                  >LYCEE</b-switch
                >
              </span>
            </abbr>
          </div>
        </div>

        <div class="mt-6 pl-4">
          <b-button type="is-info" 
          native-type="submit"
          rounded
          icon-left="content-save-cog"
            >Valider les actions</b-button
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from '../../../plugins/model';

export default {
  layout: "dashboard",
  data(){
    return {
      cycle:{
        prescolaire:0,
        primaire:0,
        college:0,
        lycee:0
      },
      etablissement:{}
    }
  },
  async fetch() {
   this.getCycle()
  },
  methods:{

    async getCycle(){
      this.etablissement = await db.getEtabInfo()

    console.log(this.etablissement);

    if( this.etablissement ) {
      this.cycle.prescolaire = this.etablissement.bPreScolaire
      this.cycle.primaire = this.etablissement.bPrimaire
      this.cycle.college = this.etablissement.bCollege
      this.cycle.lycee = this.etablissement.bLycee

    } else {
      this.$buefy.toast.open({
        message: 'Etablissement inexistant',
        type:'is-danger',
        position:'is-bottom-right',
        duration:5000,
      })
    }
    },

    async saveCycle(){
      const reponse = await db.updateCycle(this.cycle, this.etablissement)
      this.$buefy.notification.open({
        message:reponse, 
        type:'is-success',
        position:'is-bottom-right',
        hasIcon: true,
        duration: 10000,
        pauseOnHover: true,
        progressBar: true,
      })
      this.$router.push('/return')
    }
  }
};
</script>

<style></style>
