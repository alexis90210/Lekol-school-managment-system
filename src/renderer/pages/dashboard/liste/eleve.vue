<template>
  <div>
    <!-- tab-liste-eleve-view -->
    <div class="container-box">
      <b-loading v-model="chargement" is-full-page :can-cancel="false"></b-loading>
      <p class="text-white px">LISTE DES ELEVES</p>

      <div class="onglet-view" style="width: 1200px; height: 102vh !important; ">
        <p class="">Tous les niveaux confondus</p>
        <div class="box-content">
          <div class="align-row" style="gap: 20px">
            
            <div class="mt" v-if="filtre.bExamen == 1">
              <p class="text-white mt">Classe examens</p>
              <select
                v-model="filtre.IDCLASSE_GEN"
                @input="filtre.IDCLASSE = ''"
                class="select-combo"
                style="width: 200px"
              >
                <option value="">Tous</option>
                <option v-for="(e, i) in classeExamen" :key="i" :value="e.IDCLASSE_GEN">
                  {{ e.CodeClasse }} {{ e.NomClasse }}
                </option>
              </select>
            </div>
            <div class="mt" v-if="filtre.bExamen != 1">
              <p class="text-white mt">Classe Intermediaire</p>
              <select
                v-model="filtre.IDCLASSE"
                @input="filtre.IDCLASSE_GEN = ''"
                class="select-combo"
                style="width: 200px"
              >
                <option value="">Tous</option>
                <option v-for="(e, i) in classe" :key="i" :value="e.IDCLASSE">
                  {{ e.CodeClasseIntermediaire }} {{ e.NomClasse }}
                </option>
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
                <option value="1">Gar&ccedil;on</option>
                <option value="0">Fille</option>
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

            <div class="mt">
              <p class="text-white mt">Eleve</p>
              <select
                v-model="filtre.bExamen"
                class="select-combo"
                
                style="width: 150px"
              >                
                <option value="0">Intermdiaire uniquement</option>
                <option value="1">En classe d'examen uniquement</option>
                <option value="">Tous Confondu</option>
              </select>
            </div>


            <div class="mt">
              <p class="text-white mt">Recherche</p>
              <input
                class="input-text"
                style="width: 400px"
                v-model="filtre.key"
              />
            </div>
            <div class="mt-5">
              <button
                class="btn-connection"
                style="width: 150px"
                @click="getEleve()"
              >
                Valider
              </button>
            </div>

            <div class="mt-5">
              <button
                class="btn-connection"
                style="width: 150px;background-color:blue;"
                @click="getEleve()"
              >
                Actualiser la liste
              </button>
            </div>

          </div>
        </div>

        <div style="height: 85vh">
          <b-table
            :data="computedEleve"
            paginated
            type="is-info"
            class="mt-4"
            :mobile-cards="false"
            per-page="11"
          >
            <b-table-column
              field="CodeEleve"
              searchable
              label="MATRICULE"
              :subheading="'TOTAL : ' + computedEleve.length"
              v-slot="props"
            >
              {{ props.row.CodeEleve }}
            </b-table-column>

            <b-table-column
              field="NomEleve"
              searchable
              label="NOM(S)"
              v-slot="props"
            >
              {{ props.row.NomEleve }}
            </b-table-column>

            <b-table-column
              field="PrenomEleve"
              searchable
              label="PRENOM(S)"
              v-slot="props"
            >
              {{ props.row.PrenomEleve }}
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
            
            <b-table-column
              field="CodeClasseIntermediaire"
              searchable
              label="CLASSE"              
              v-slot="props"
            >
              {{ props.row.CodeClasseIntermediaire }}
            </b-table-column> 

            <b-table-column field="bHomme" label="SEXE" v-slot="props">
              {{ props.row.bHomme == "1" ? "Garcon" : "Fille" }}
            </b-table-column>

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
            </b-table-column>

            <b-table-column v-slot="props">
              <div style="width: 200px; text-align: right" class="actionBtn">
                <b-button
                  icon-left="delete"
                  v-if="props.row.bEtat == 1"
                  type="is-danger"
                  @click="deleteEleve(props.row, 0)"
                  outlined
                  size="is-small"
                  class="mx-2"
                ></b-button>
                <b-button
                  icon-left="restore"
                  v-if="props.row.bEtat == 0"
                  type="is-success"
                  @click="deleteEleve(props.row, 1)"
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

    <b-modal v-model="eleve.edit">
      <Eleve :update="update" @refresh="getEleve()"/>
    </b-modal>
  </div>
</template>

<script>
("use strict");
const { ipcRenderer } = require("electron");
import db from "../../../plugins/model";
import Eleve from "../modification/eleve.vue";
export default {
    layout: "dashboard",
    data() {
        return {
            classe: [],
            classeExamen: [],
            eleve: {
                edit: false
            },
            chargement:false,
            filtre: {
                genre: "",
                IDCLASSE: "",
                IDCLASSE_GEN:"",
                key: "",
                etat:1,
                bExamen: 0
            },
            allEleve: [],
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


        this.classeExamen = await db.getClasseGenerale(true)
        this.getEleve();
    },
    methods: {

        async deleteEleve(data, etat){
          let exec = await db.deleteEleve(data.CodeEleve, await this.$localForage.getItem("annee") ,  etat)
          this.getEleve();
          this.$buefy.dialog.alert({
            title:'Rapport d\'activite',
            message:exec,
            hasIcon:true,
            type: etat == 0 ? 'is-danger':'is-success'
          })

        },

        async getEleve() {
          this.chargement = true
            this.allEleve = (await db.allEleve({...this.filtre, bEtat:this.filtre.etat , Annee:await this.$localForage.getItem("annee")}));
            console.log(this.allEleve);
            this.chargement = false
        },
        editWindow(data) {
            this.update = data
            this.eleve.edit = true
        },
    },
    computed: {
        computedEleve() {
            if (this.filtre.key != "") {
                return this.allEleve.filter((row) => {
                    const nomClasse = row.NomEleve.toString().toLowerCase();
                    const NomPrenom = row.PrenomEleve.toString().toLowerCase();
                    const key = this.filtre.key.toString().toLowerCase();
                    return nomClasse.includes(key) || NomPrenom.includes(key);
                });
            }
            else {
                return this.allEleve;
            }
        },
    },
    components: { Eleve }
};
</script>

<style>
.modal .modal-content {
    max-width: 150vw !important;
    max-height: 120vh !important
;
}
</style>