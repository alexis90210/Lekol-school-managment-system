<template>
  <div>
    <!-- tab-classe-view -->
    <div class="container-box">
      <p class="text-white py-3 pb-5">CONFIGURATION DES MATIERES</p>

      <b-tabs type="is-boxed">
        <b-tab-item label="Reference des matieres">
          <div class="onglet-view" style="width: 1200px; height: 90vh !important; ">
            <p class="">Configuration generale des matieres</p>
            <div class="box-content">
              <div class="align-row" style="gap: 20px">
                <div class="mt">
                  <p class="text-white mt">Code de la matiere</p>
                  <input
                    class="input-text"
                    v-model="matiere.code"
                    @input="matiere.code = matiere.code.toUpperCase()"
                  />
                </div>
                <div class="mt">
                  <p class="text-white mt">Nom de la matiere</p>
                  <input
                    v-model="matiere.nom"
                    @input="matiere.nom = matiere.nom.toUpperCase()"
                    class="input-text"
                    style="width: 500px"
                  />
                </div>
                <div style="padding-top:20px">
                  <p class="text-white">Cycle d'enseignement</p>
                  <div class="topleft align-row py-3 border " style="border-radius:5px;">
                <div class="topbar-title-item" v-if="cycle.prescolaire == 1">
                  <abbr title="Cycle Maternel" class="abbr-o">
                    <span class="align-row">
                      <b-switch
                        type="is-info"
                        v-model="matiere.bPrescolaire"
                        native-value="1"
                        id="conf-prescolaire"
                        >PRESCOLAIRE</b-switch
                      >
                    </span>
                  </abbr>
                </div>

                <div class="topbar-title-item" v-if="cycle.primaire == 1">
                  <abbr title="Cycle prescolaire" class="abbr-o">
                    <span class="align-row align-center">
                      <b-switch
                        type="is-info"
                        v-model="matiere.bPrimaire"
                        native-value="2"
                        id="conf-primaire"
                        >PRIMAIRE</b-switch
                      >
                    </span>
                  </abbr>
                </div>

                <div class="topbar-title-item" v-if="cycle.college == 1">
                  <abbr title="Cycle primaire" class="abbr-o">
                    <span class="align-row">
                      <b-switch
                        type="is-info"
                        v-model="matiere.bCollege"
                        native-value="3"
                        id="conf-college"
                        >COLLEGE</b-switch
                      >
                    </span>
                  </abbr>
                </div>

                <div class="topbar-title-item" v-if="cycle.lycee == 1">
                  <abbr title="Cycle College" class="abbr-o">
                    <span class="align-row">
                      <b-switch
                        type="is-info"
                        v-model="matiere.bLycee"
                        native-value="4"
                        id="conf-lycee"
                        >LYCEE</b-switch
                      >
                    </span>
                  </abbr>
                </div>
              </div>
                </div>
                <div class="mt pt-3">
                <button
                  class="btn-connection"
                  id="create-reference-classe"
                  style="width: 150px"
                  @click="saveMatiereGenerale"
                >
                  Valider
                </button>
              </div>
              </div>     
            </div>

            <div style="height: 75vh">
          <b-table
            :data="matiereGenerale"
            paginated
            type="is-info"
            class="mt-4"
            :mobile-cards="false"
            per-page="9"
          >
            <b-table-column
              field="IDMATIERE_GEN"
              searchable
              label="IDMATIERE"
              v-slot="props"
            >
              {{ props.row.IDMATIERE_GEN }}
            </b-table-column>

            <b-table-column
              field="CodeMatiere"
              searchable
              label="CODE MATIERE"
              v-slot="props"
            >
              {{ props.row.CodeMatiere }}
            </b-table-column>

            <b-table-column
              field="NomMatiere"
              searchable
              label="NOM MATIERE"
              width="300px"
              v-slot="props"
            >
              {{ props.row.NomMatiere }}
            </b-table-column>

            <b-table-column
              field="bPrescolaire"
              searchable
              label="PRESCOLAIRE"
              v-slot="props"
            >
              {{ props.row.bPrescolaire == "1"? 'Oui':'Non' }}
            </b-table-column>

            <b-table-column
              field="bPrimaire"
              searchable
              label="PRIMAIRE"
              v-slot="props"
            >
              {{ props.row.bPrimaire == "1"? 'Oui':'Non' }}
            </b-table-column>

            <b-table-column
              field="bCollege"
              searchable
              label="COLLEGE"
              v-slot="props"
            >
              {{ props.row.bCollege == "1"? 'Oui':'Non' }}
            </b-table-column>

            <b-table-column
              field="bLycee"
              searchable
              label="LYCEE"
              v-slot="props"
            >
              {{ props.row.bLycee == "1"? 'Oui':'Non' }}
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
        </b-tab-item>
     
        <b-tab-item label="Matiere par Classe">
          <div class="onglet-view" style="width: 1200px">
            <p class="">Configuration des matieres par classe</p>
            <div class="box-content">
              <div class="align-row" style="gap: 20px">
                <div class="mt">
                  <p class="text-white mt">Reference de la classe</p>
                  <select
                  v-model="matiereClasse.classe"
                    class="select-combo"
                    style="width: 200px"
                  >
                    <option v-for="(e,i) in classeGenerale" :key="i" :value="e">{{ e.CodeClasse}} {{e.NomClasse}}</option>
                  </select>
                </div>
             

                <div class="mt">
                  <p class="text-white mt">Matiere</p>
                  <select
                  v-model="matiereClasse.matiere"
                    class="select-combo"
                    style="width: 200px"
                  >
                    <option v-for="(e,i) in matiereGenerale" :key="i" :value="e">{{ e.CodeMatiere}} {{e.NomMatiere}}</option>
                  </select>
                </div>

                <div class="mt">
                <p class="text-white mt">Nom de la matiere en {{matiereClasse.classe.CodeClasse}} </p>
                <input
                  :value="matiereClasse.matiere.NomMatiere"
                  readonly                  
                  class="input-text"
                  style="width: 500px"
                />
              </div>

              <div class="mt">
                <p class="text-white mt">Coeffcient en {{matiereClasse.classe.CodeClasse}} </p>
                <input                 
                  class="input-text"
                  style="width: 500px"
                  onclick="this.select()"
                  v-model="matiereClasse.Coefficient"
                />
              </div>
              </div>
              
              <div class="is-flex" style="gap: 20px">
                <div class="mt">
                <p class="text-white mt">Note minimale en {{matiereClasse.classe.CodeClasse}} </p>
                <input                 
                  class="input-text"
                  style="width: 500px"
                  onclick="this.select()"
                  v-model="matiereClasse.MoyenneMin"
                />
              </div>
              <div class="mt">
                <p class="text-white mt">Note maximale en {{matiereClasse.classe.CodeClasse}} </p>
                <input                 
                  class="input-text"
                  style="width: 500px"
                  onclick="this.select()"
                  v-model="matiereClasse.MoyenneMax"
                />
              </div>
              <div class="pt-5">
                <button
                  class="btn-connection"
                  style="width: 150px"
                  @click="saveMatiereClasse"
                >
                  Valider
                </button>
              </div>
              </div>             

              
            </div>

            <div style="height: 80vh">
          <b-table
            :data="allMatiereClasse"
            paginated
            type="is-info"
            class="mt-4"
            :mobile-cards="false"
            per-page="8"
          >
            <b-table-column
              field="CodeClasse"
              searchable
              label="CODE CLASSE"
              v-slot="props"
            >
              {{ props.row.CodeClasse }}
            </b-table-column>

            <b-table-column
              field="CodeMatiere"
              searchable
              label="CODE MATIERE"
              v-slot="props"
            >
              {{ props.row.CodeMatiere }}
            </b-table-column>

            <b-table-column
              field="Appelation"
              searchable
              label="NOM MATIERE"
              v-slot="props"
            >
              {{ props.row.Appelation }}
            </b-table-column>

            <b-table-column
              field="MoyenneMin"
              searchable
              label="MOYENNE MIN"
              v-slot="props"
            >
              {{ props.row.MoyenneMin }}
            </b-table-column>

            <b-table-column
              field="MoyenneMax"
              searchable
              label="MOYENNE MAX"
              v-slot="props"
            >
              {{ props.row.MoyenneMax }}
            </b-table-column>
           

            <b-table-column
              field="Coefficient"
              searchable
              label="COEFFICIENT"
              v-slot="props"
            >
              {{ props.row.Coefficient }}
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
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import db from "../../../plugins/model";
export default {
  layout: "dashboard",
  data() {
    return {
      classeGenerale: [],
      cycle: {
        prescolaire: 0,
        primaire: 0,
        college: 0,
        lycee: 0,
      },

      etablissement: {},
 

      matiereGenerale:[],
      matiere:{
        code: '',
        nom: '',
        bPrescolaire: '',
        bPrimaire: '',
        bCollege: '',
        bLycee: ''
      },

      matiereClasse:{
        classe:{
          CodeClasse:'',
          NomClasse:'',
          IDCLASSE_GEN:''
        },
        matiere:{
          CodeMatiere:'',
          NomMatiere:'',
          IDMATIERE_GEN:''
        },
        MoyenneMax:20,
        MoyenneMin:0,
        Coefficient:1,
      },
      allMatiereClasse:[]

    };
  },
  async fetch() {
    this.classeGenerale = await db.getClasseGenerale();
    this.matiereGenerale = await db.getMatiereGenerale();
    this.allMatiereClasse = await db.getMatiereClasse(await this.$localForage.getItem("annee"))

  },

  async mounted() {
    this.etablissement = await db.getEtabInfo();

    this.cycle.prescolaire = this.etablissement.bPreScolaire;
    this.cycle.primaire = this.etablissement.bPrimaire;
    this.cycle.college = this.etablissement.bCollege;
    this.cycle.lycee = this.etablissement.bLycee;
    let AnneeScolaire = await this.$localForage.getItem("annee");
  },

  methods: {
    clearField() {
      this.matiereClasse.classe.IDCLASSE_GEN = '',
         this.matiereClasse.matiere.IDMATIERE_GEN = '',
        this.matiereClasse.matiere.NomMatiere= '',
        this.matiereClasse.Coefficient = 1,
        this.matiereClasse.MoyenneMin = 0,
        this.matiereClasse.MoyenneMax = 20
    },

    async saveMatiereClasse(){
      
      let matiere = {
        IDCLASSE_GEN : this.matiereClasse.classe.IDCLASSE_GEN,
        IDMATIERE_GEN: this.matiereClasse.matiere.IDMATIERE_GEN,
        Appelation: this.matiereClasse.matiere.NomMatiere.toUpperCase(),
        Coefficient: this.matiereClasse.Coefficient,
        MoyenneMin:this.matiereClasse.MoyenneMin,
        MoyenneMax:this.matiereClasse.MoyenneMax,
        Annee: await this.$localForage.getItem("annee")
      }

      let isCreated = await db.createMatiereClasse(matiere)

      if (isCreated) {
        this.$buefy.notification.open({
          message: "Operation reussie",
          type: "is-success",
          position: "is-bottom-right",
          hasIcon: true,
          duration: 10000,
          pauseOnHover: true,
          progressBar: true,
        });

        this.$fetch();
      } else {
        this.$buefy.notification.open({
          message: "Echec de l'operation",
          type: "is-danger",
          position: "is-bottom-right",
          hasIcon: true,
          duration: 10000,
          pauseOnHover: true,
          progressBar: true,
        });
      }
      
    },

    async saveMatiereGenerale() {

      var isStored = await db.createMatiereGenerale({...this.matiere });
      
      this.matiere = {}

      if (isStored) {
        this.$buefy.notification.open({
          message: "Operation reussie",
          type: "is-success",
          position: "is-bottom-right",
          hasIcon: true,
          duration: 10000,
          pauseOnHover: true,
          progressBar: true,
        });

        this.$fetch();
      } else {
        this.$buefy.notification.open({
          message: "Echec de l'operation",
          type: "is-danger",
          position: "is-bottom-right",
          hasIcon: true,
          duration: 10000,
          pauseOnHover: true,
          progressBar: true,
        });
      }
    },
  },
};
</script>

<style></style>
