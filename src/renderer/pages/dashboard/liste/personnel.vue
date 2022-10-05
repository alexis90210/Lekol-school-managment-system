<template>
    <div>
      <!-- tab-liste-eleve-view -->
      <div class="container-box">
        <p class="text-white px">LISTE DU PERSONNEL DE L'ECOLE</p>
  
        <div class="onglet-view" style="width: 1200px; height: 102vh !important; ">
          <p class="">Tous les agents et enseignants</p>
          <div class="box-content">
            <div class="align-row" style="gap: 20px">
              <div class="mt">
                <p class="text-white mt">Personnel</p>
                <select
                  v-model="filtre.bAgent"                  
                  class="select-combo"
                  style="width: 200px"
                >
                  <option value="1">Agent</option>
                  <option value="2">Enseignant</option>
                </select>
              </div>
              <div class="mt">
                <p class="text-white mt">Genre</p>
                <select
                  v-model="filtre.genre"
                  class="select-combo"
                  
                  style="width: 200px"
                >
                  <option value="">Tous</option>
                  <option value="1">Monsieur (M.)</option>
                  <option value="0">Madame (Mme) </option>
                </select>
              </div>
  
              <div class="mt">
                <p class="text-white mt">Etat</p>
                <select
                  v-model="filtre.etat"
                  class="select-combo"
                  style="width: 200px"
                >
                  <option value="1">Actif</option>
                  <option value="0">Supprim&eacute;</option>
                  <option value="">Tous</option>
                </select>
              </div>
  
              <div class="mt" v-if="filtre.bAgent == 1">
                <p class="text-white mt">Grade</p>
                <select
                  v-model="filtre.IDGRADE"
                  class="select-combo"
                  style="width: 150px"
                >                
                  
                  <option value="">Tous</option>
                  <option v-for="(a,i) in allGrade" :value="a.IDGRADE" :key="i"> {{a.CodeGrade}}, {{ a.NomGrade}}</option>
                </select>
              </div>

              <div class="mt" v-if="filtre.bAgent == 2">
                <p class="text-white mt">Matiere</p>
                <select
                  v-model="filtre.IDMATIERE"
                  class="select-combo"
                  style="width: 150px"
                >                
                  
                  <option value="">Toutes</option>
                  <option v-for="(a,i) in allMatiere" :value="a.IDMATIERE" :key="i"> {{a.CodeMatiere}}, {{ a.NomMatiere}}</option>
                </select>
              </div>

              <div class="mt" v-if="filtre.bAgent == 2">
                <p class="text-white mt">Classe</p>
                <select
                  v-model="filtre.IDCLASSE"
                  class="select-combo"
                  style="width: 150px"
                >                  
                  <option value="">Toutes</option>
                  <option v-for="(a,i) in classe" :value="a.IDCLASSE" :key="i"> {{a.CodeClasseIntermediaire}}</option>
              
                </select>
              </div>
  
  
            
              <div class="mt-5">
                <button
                  class="btn-connection"
                  style="width: 150px"
                  @click="getPersonnel()"
                >
                  Valider
                </button>
              </div>
  
              <div class="mt-5">
                <button
                  class="btn-connection"
                  style="width: 150px;background-color:blue;"
                  @click="getPersonnel()"
                >
                  Actualiser la liste
                </button>
              </div>
  
            </div>
          </div>
  
          <div style="height: 85vh">
            <b-table
            v-if="filtre.bAgent == 1"
              :data="allAgent"
              paginated
              type="is-info"
              class="mt-4"
              :mobile-cards="false"
              per-page="11"
            >
              <b-table-column
                field="CodeAgent"
                searchable
                label="MATRICULE"
                v-slot="props"
              >
                {{ props.row.CodeAgent }}
              </b-table-column>
  
              <b-table-column
                field="NomAgent"
                searchable
                label="NOM(S)"
                v-slot="props"
              >
                {{ props.row.NomAgent }}
              </b-table-column>
  
              <b-table-column
                field="PrenomAgent"
                searchable
                label="PRENOM(S)"
                v-slot="props"
              >
                {{ props.row.PrenomAgent }}
              </b-table-column>
  
              <b-table-column
                field="LieuNaissance"
                searchable
                label="LIEU DE NAISS..."
                v-slot="props"
              >
                {{ props.row.LieuNaissance }}
              </b-table-column>
  
              <b-table-column
                field="DateNaissance"
                searchable
                label="DATE DE NAISS..."
                v-slot="props"
              >
                {{ props.row.DateNaissance }}
              </b-table-column>
  
              <b-table-column field="bHomme" label="SEXE" v-slot="props">
                {{ props.row.bHomme == "1" ? "Mr." : "Mme." }}
              </b-table-column>
<!--   
              <b-table-column field="bEPS" label="EPS" v-slot="props">
                {{ props.row.bEPS == "1" ? "Apte" : "Inapte" }}
              </b-table-column>
  
              <b-table-column field="bNouveau" label="ETAT" v-slot="props">
                {{ props.row.bNouveau == "1" ? "Nouveau" : "Redoublant" }}
              </b-table-column>
  
              <b-table-column field="bInscription" label="STATUT" v-slot="props">
                {{
                  props.row.bInscription == "1" ? "Inscription" : "ReInscription"
                }}
              </b-table-column> -->
  
              <b-table-column v-slot="props">
                <div style="width: 200px; text-align: right" class="actionBtn">
                  <b-button
                    icon-left="delete"
                    v-if="props.row.bEtat == 1"
                    type="is-danger"
                    @click="deleteAgent(props.row, 0)"
                    outlined
                    size="is-small"
                    class="mx-2"
                  ></b-button>
                  <b-button
                    icon-left="restore"
                    v-if="props.row.bEtat == 0"
                    type="is-success"
                    @click="deleteAgent(props.row, 1)"
                    outlined
                    size="is-small"
                    class="mx-2"
                  ></b-button>
                  <b-button
                    icon-left="book-edit"
                    type="is-info"
                    outlined
                    size="is-small"
                    @click="editWindow(props.row)"
                  ></b-button>
                </div>
              </b-table-column>
            </b-table>

            <b-table
            v-if="filtre.bAgent == 2"
              :data="allEnseignant"
              paginated
              type="is-info"
              class="mt-4"
              :mobile-cards="false"
              per-page="11"
            >
              <b-table-column
                field="CodeEnseignant"
                searchable
                label="MATRICULE"
                v-slot="props"
              >
                {{ props.row.CodeEnseignant }}
              </b-table-column>
  
              <b-table-column
                field="NomEnseignant"
                searchable
                label="NOM(S)"
                v-slot="props"
              >
                {{ props.row.NomEnseignant }}
              </b-table-column>
  
              <b-table-column
                field="PrenomEnseignant"
                searchable
                label="PRENOM(S)"
                v-slot="props"
              >
                {{ props.row.PrenomEnseignant }}
              </b-table-column>
  
              <b-table-column
                field="LieuNaissance"
                searchable
                label="LIEU DE NAISS..."
                v-slot="props"
              >
                {{ props.row.LieuNaissance }}
              </b-table-column>
  
              <b-table-column
                field="DateNaissance"
                searchable
                label="DATE DE NAISS..."
                v-slot="props"
              >
                {{ props.row.DateNaissance }}
              </b-table-column>
  
              <b-table-column field="bHomme" label="SEXE" v-slot="props">
                {{ props.row.bHomme == "1" ? "Mr." : "Mme." }}
              </b-table-column>
  
              <!-- <b-table-column field="bEPS" label="EPS" v-slot="props">
                {{ props.row.bEPS == "1" ? "Apte" : "Inapte" }}
              </b-table-column> -->
  
              <!-- <b-table-column field="bNouveau" label="ETAT" v-slot="props">
                {{ props.row.bNouveau == "1" ? "Nouveau" : "Redoublant" }}
              </b-table-column>
  
              <b-table-column field="bInscription" label="STATUT" v-slot="props">
                {{
                  props.row.bInscription == "1" ? "Inscription" : "ReInscription"
                }}
              </b-table-column> -->
  
              <b-table-column v-slot="props">
                <div style="width: 200px; text-align: right" class="actionBtn">
                  <b-button
                    icon-left="delete"
                    v-if="props.row.bEtat == 1"
                    type="is-danger"
                    @click="deleteEnseignant(props.row, 0)"
                    outlined
                    size="is-small"
                    class="mx-2"
                  ></b-button>
                  <b-button
                    icon-left="restore"
                    v-if="props.row.bEtat == 0"
                    type="is-success"
                    @click="deleteEnseignant(props.row, 1)"
                    outlined
                    size="is-small"
                    class="mx-2"
                  ></b-button>
                  <b-button
                    icon-left="book-edit"
                    type="is-info"
                    outlined
                    size="is-small"
                    @click="editWindow(props.row)"
                  ></b-button>
                </div>
              </b-table-column>
            </b-table>
          </div>
        </div>
      </div>
  
     
    </div>
  </template>
  
  <script>
  ("use strict");
  const { ipcRenderer } = require("electron");
  import db from "../../../plugins/model";
  export default {
      layout: "dashboard",
      data() {
          return {
              classe: [],
              personnel: {
                  edit: false
              },
              filtre: {
                  genre: "",
                  bAgent:1,
                  IDCLASSE: "",
                  IDGRADE: "",
                  IDMATIERE:"",
                  etat:1,
                  bExamen: 0
              },
              allAgent: [],
              allGrade:[],
              allMatiere:[],
              allEnseignant:[],
              update:{}
          };
      },
      async mounted() {
          let filtre = {
            cycle: 0,
            Annee:await this.$localForage.getItem("annee"),
            IDCLASSE:0,
            bExamen:''
          }
          this.classe = await db.getClasseIntermediaire(filtre );
          this.allGrade = await db.getGrade()
          this.allMatiere = await db.getMatiereGenerale()
          this.getPersonnel();
      },
      methods: {
  
          async deleteAgent(data, etat){
            let exec = await db.deleteAgent(data.CodeAgent, await this.$localForage.getItem("annee") ,  etat)
            this.getPersonnel();
            this.$buefy.dialog.alert({
              title:'Rapport d\'activite',
              message:exec,
              hasIcon:true,
              type: etat == 0 ? 'is-danger':'is-success'
            })
  
          },

          async deleteEnseignant(data, etat){
            let exec = await db.deleteEnseignant(data.CodeEnseignant, await this.$localForage.getItem("annee") ,  etat)
            this.getPersonnel();
            this.$buefy.dialog.alert({
              title:'Rapport d\'activite',
              message:exec,
              hasIcon:true,
              type: etat == 0 ? 'is-danger':'is-success'
            })
  
          },
  
          async getPersonnel() {

            if( this.filtre.bAgent == 1) {
                this.allAgent = await db.getAgent( await this.$localForage.getItem("annee") );
            } else if(this.filtre.bAgent == 2) {
                this.allEnseignant = await db.getEnseignant( await this.$localForage.getItem("annee") );
            }
          
          },
          async editWindow(data) {
              this.update = data
              let rep = await this.$localForage.setItem("update_personnel", this.update)
              
              if(rep){
                let myQuery  ={
                  isAgent: this.filtre.bAgent == 1 ? true : false,
                  isEnseignant: this.filtre.bAgent != 1 ? true : false,
                  isUpdating: true
                }
                console.log(myQuery);

                this.$router.push({path:'/dashboard/profile' , query: myQuery })
              }
              
          },
      },
      computed: {
       
    
      },
      components: { }
  };
  </script>
  
  <style>
  .modal .modal-content {
      max-width: 150vw !important;
      max-height: 120vh !important
  ;
  }
  </style>