<template>
    <div>
      <b-loading
          v-model="isLoading"
          is-full-page
          :can-cancel="false"
        ></b-loading>
      <div class="onglet-view" style="width: 1200px;height: 90vh !important; ">
  
              <p class="">Configuration generale des Frais</p>
              <div class="box-content">
                <div class="align-row" style="gap: 20px">
                  <div class="mt">
                    <p class="text-white mt">Code du frais </p>
                    <input
                      class="input-text"
                      v-model="Frais.code"
                      @input="Frais.code = Frais.code.toUpperCase() "
                    />
                  </div>
                  <div class="mt">
                    <p class="text-white mt">Nom du frais</p>
                    <input
                      v-model="Frais.nom"
                      class="input-text"
                      style="width: 500px"
                    />
                  </div>

                  <div class="mt">
                    <p class="text-white mt">Echeance du frais</p>
                    <input
                      v-model="Frais.Echeance"
                      class="input-text"
                      type="date"
                      style="width: 200px"
                    />
                  </div>

                  <div class="mt">
                    <p class="text-white pl-6 pb-2">Frais occasionnel ( ou Optionnel ) </p>
                    <abbr title="Frais occasionnel ( ou Optionnel )" class="p-2 px-6 abbr-o">
                      
                            <b-switch
                            type="is-success"
                            v-model="Frais.bOccassionnel"
                            id="conf-prescolaire"
                            true-value="1"
                            false-value="0"
                            >Oui</b-switch
                            >
                        </abbr>

                        <abbr title="Frais occasionnel ( ou Optionnel )" class=" p-2 px-6 abbr-o">
                      
                      <b-switch
                      type="is-success"
                      v-model="Frais.bOccassionnel"
                      id="conf-prescolaire"
                      true-value="0"
                      false-value="1"
                      >Non</b-switch
                      >
                  </abbr>
                  </div>  

                  <div class="mt" v-if="!select">
                    <button
                    class="btn-connection"
                    id="create-reference-Frais"
                    style="width: 150px;"
                    @click="saveFraisGeneral"
                  >
                    Valider
                  </button>
                  </div>

                  <div class="mt" v-if="!select">
                    <button
                    class="btn-connection"
                    id="create-reference-Frais"
                    style="width: 150px; background-color: blue;"
                    @click="getFraisGeneraux"
                  >
                    Actualiser
                  </button>
                  </div>

                  <div class="mt" v-if="select && checkedRows.length > 0">
                    <button
                    class="btn-connection"
                    id="create-reference-Frais"
                    style="width: 150px; background-color: green;"
                    @click="saveCopie"
                  >
                    Copie
                  </button>
                  </div>
  
      
                </div>
  
               
              </div>
  
              <div style="height: 50vh">
               <abbr class="my-3" title="Cliquez pour selectionner les frais afin de les copier dans une classe">
                <b-switch
                      type="is-success"
                      v-model="select"
                      id="conf-prescolaire"
                      :true-value="true"
                      :false-value="false"
                      >Selectionner les frais</b-switch
                      >
               </abbr>
                <b-table
            :data="FraisGeneraux"
            :checked-rows.sync="checkedRows"
                    :checkable="select"
            paginated
            type="is-info"
            class="mt-4"
            :mobile-cards="false"
            per-page="8"
          >

            <b-table-column
              field="CodeFrais"
              searchable
              label="Code Frais"
              v-slot="props"
            >
              {{ props.row.CodeFrais }}
            </b-table-column>

            <b-table-column
              field="NomFrais"
              searchable
              label="Nom Frais"
              v-slot="props"
            >
              {{ props.row.NomFrais }}
            </b-table-column>

            <b-table-column
              field="bOcassionel"
              searchable
              label="Ocassionel"
              v-slot="props"
            >
            {{ props.row.bOcassionel == 1 ? "Oui" : "Non" }}
            </b-table-column>


            <b-table-column>
              <div style="width: 200px; text-align: right" class="actionBtn">
                <b-button
                  icon-left="delete"
                  type="is-danger"
                  outlined
                  size="is-small"
                  class="mx-2"
                ></b-button>
                <b-button
                  icon-left="book-edit"
                  type="is-info"
                  outlined
                  size="is-small"
                ></b-button>
              </div>
            </b-table-column>
          </b-table>
          </div>
          
  
            </div>
    </div>
  </template>
  
  <script>

import db from '../plugins/model'

  export default {
      data(){
          return {
              FraisGeneraux:[],
              Frais:{
                  code:'',
                  nom:'Frais du mois de ' ,
                  Echeance: new Date(),
                  bOccassionnel:0
              },
              select:false,
              checkedRows:[],
              isLoading:false            
          }
      },
      async fetch() {
      this.getFraisGeneraux()
      },
      methods:{
        async saveCopie(){
            if(await this.$localForage.setItem("copie", this.checkedRows)) {
                this.$buefy.notification.open({
                    type:'is-success',
                    message:'Copie reussie, allez vers les frais par classe pour creer ...',
                    duration:10000
                })
            }
        },

        async getFraisGeneraux() {
            this.FraisGeneraux = await db.getFraisGeneraux(await this.$localForage.getItem("annee"))
        },
          async saveFraisGeneral() {
            let res =  await db.createFraisGeneral({
                CodeFrais:this.Frais.code , 
                NomFrais: this.Frais.nom,
                Echeance: this.Frais.Echeance,
                bOccassionnel: this.Frais.bOccassionnel,
                Annee: await this.$localForage.getItem("annee")
            })

            console.log(res);
            let Frais ={
                  code:'',
                  nom:'Frais du mois de ' ,
                  Echeance: new Date(),
                  bOccassionnel:0
              }
            this.Frais = Frais
            this.getFraisGeneraux()
            
            
          }
      }
  }
  </script>
  
  <style>
  
  </style>