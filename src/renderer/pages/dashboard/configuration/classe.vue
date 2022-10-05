<template>
  <div>
    <!-- tab-classe-view -->
    <div class="container-box">
      <p class="text-white py-3 pb-5">CONFIGURATION DES CLASSES</p>

      <b-tabs type="is-boxed">
        <b-tab-item label="Reference des classes">
          <!-- onglet-reference-view -->
          <div class="onglet-view" style="width: 1200px;height: 90vh !important; ">
            <p class="">Configuration generale des classes</p>
            <div class="box-content">
              <div class="align-row" style="gap: 20px">
                <div class="mt">
                  <p class="text-white mt">Code de la classe</p>
                  <input
                    id="CodeClasse"
                    class="input-text"
                    v-model="classe.code"
                  />
                </div>
                <div class="mt">
                  <p class="text-white mt">Nom de la classe</p>
                  <input
                    v-model="classe.nom"
                    id="NomClasse"
                    class="input-text"
                    style="width: 500px"
                  />
                </div>

                <div class="mt is-flex pt-5">
                  <div class="topbar-title-item" v-if="cycle.prescolaire == 1">
                  <abbr title="Cycle Maternel" class="abbr-o">
                    <span class="align-row">
                      <b-radio
                        type="is-info"
                        v-model="selected.cycle"
                        native-value="1"
                        id="conf-prescolaire"
                        >PRESCOLAIRE</b-radio
                      >
                    </span>
                  </abbr>
                </div>

                <div class="topbar-title-item" v-if="cycle.primaire == 1">
                  <abbr title="Cycle prescolaire" class="abbr-o">
                    <span class="align-row align-center">
                      <b-radio
                        type="is-info"
                        v-model="selected.cycle"
                        native-value="2"
                        id="conf-primaire"
                        >PRIMAIRE</b-radio
                      >
                    </span>
                  </abbr>
                </div>

                <div class="topbar-title-item" v-if="cycle.college == 1">
                  <abbr title="Cycle primaire" class="abbr-o">
                    <span class="align-row">
                      <b-radio
                        type="is-info"
                        v-model="selected.cycle"
                        native-value="3"
                        id="conf-college"
                        >COLLEGE</b-radio
                      >
                    </span>
                  </abbr>
                </div>

                <div class="topbar-title-item" v-if="cycle.lycee == 1">
                  <abbr title="Cycle College" class="abbr-o">
                    <span class="align-row">
                      <b-radio
                        type="is-info"
                        v-model="selected.cycle"
                        native-value="4"
                        id="conf-lycee"
                        >LYCEE</b-radio
                      >
                    </span>
                  </abbr>
                </div>
                </div>
              </div>

              <div class="topleft align-row py-3">
                
                <div class="is-flex">
                <div class="mt pt-4 pl-2">
                <b-switch
                  type="is-info"
                  id="bClasseExamen"
                  true-value="1"
                  false-value="0"
                  v-model="classe.bExamen"
                  >Classe d'examen</b-switch
                >
              </div>

              <div class="pl-5">
                <button
                  class="btn-connection"
                  id="create-reference-classe"
                  style="width: 150px;"
                  @click="saveClasseGnerale"
                >
                  Valider
                </button>
              </div>
              </div>
              </div>
             
            </div>

            <div style="height: 50vh">
          <b-table
            :data="classeGenerale"
            paginated
            type="is-info"
            class="mt-4"
            :mobile-cards="false"
            per-page="8"
          >
            <b-table-column
              field="IDCLASSE_GEN"
              searchable
              label="ID"
              v-slot="props"
            >
              {{ props.row.IDCLASSE_GEN }}
            </b-table-column>

            <b-table-column
              field="CodeClasse"
              searchable
              label="CODE CLASSE"
              v-slot="props"
            >
              {{ props.row.CodeClasse }}
            </b-table-column>

            <b-table-column
              field="NomClasse"
              searchable
              label="NOM CLASSE"
              v-slot="props"
            >
              {{ props.row.NomClasse }}
            </b-table-column>

            <b-table-column
              field="bExamen"
              searchable
              label="EXAMEN"
              v-slot="props"
            >
            {{ props.row.bExamen == 1 ? "Oui" : "Non" }}
            </b-table-column>

            <b-table-column
              field="IDCYCLE"
              searchable
              label="CYCLE"
              v-slot="props"
            >
            <div v-if="props.row.IDCYCLE == '1'">Prescolaire</div>
            <div v-if="props.row.IDCYCLE == '2'">Primaire</div>
            <div v-if="props.row.IDCYCLE == '3'">College</div>
            <div v-if="props.row.IDCYCLE == '4'">Lycee</div>
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
        <b-tab-item label="Classe d'examens">
          <!-- onglet-classe-examen-view -->
          <div class="onglet-view">
            <p class="">Liste des classes d'examens uniquements</p>

            <div style="height: 67vh">
          <b-table
            :data="classeGeneraleExamen"
            paginated
            type="is-info"
            class="mt-4"
            :mobile-cards="false"
            per-page="9"
          >
            <b-table-column
              field="IDCLASSE_GEN"
              searchable
              label="ID"
              v-slot="props"
            >
              {{ props.row.IDCLASSE_GEN }}
            </b-table-column>

            <b-table-column
              field="CodeClasse"
              searchable
              label="CODE CLASSE"
              v-slot="props"
            >
              {{ props.row.CodeClasse }}
            </b-table-column>

            <b-table-column
              field="NomClasse"
              searchable
              label="NOM CLASSE"
              v-slot="props"
            >
              {{ props.row.NomClasse }}
            </b-table-column>

            <b-table-column
              field="bExamen"
              searchable
              label="EXAMEN"
              v-slot="props"
            >
            {{ props.row.bExamen == 1 ? "Oui" : "Non" }}
            </b-table-column>

            <b-table-column
              field="IDCYCLE"
              searchable
              label="CYCLE"
              v-slot="props"
            >
            <div v-if="props.row.IDCYCLE == '1'">Prescolaire</div>
            <div v-if="props.row.IDCYCLE == '2'">Primaire</div>
            <div v-if="props.row.IDCYCLE == '3'">College</div>
            <div v-if="props.row.IDCYCLE == '4'">Lycee</div>
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
        <b-tab-item label="Classe intermediaire">
          <!-- onglet-classe-intermediaire-view -->
          <div class="onglet-view" style="width: 1200px;height: 91.5vh !important;">
            <p class="">Configuration des classes intermediaires</p>
            <div class="box-content">
              <div class="align-row" style="gap: 20px">
                <div class="mt">
                  <p class="text-white mt">Reference de la classe</p>
                  <select
                    v-model="intermediaire.classe"
                    class="select-combo"
                    style="width: 200px"
                  >
                    <option
                      v-for="(e, i) in classeGenerale"
                      :key="i"
                      :value="e"
                    >
                      {{ e.CodeClasse }} {{ e.NomClasse }}
                    </option>
                  </select>
                </div>
                <div class="mt">
                  <p class="text-white mt">Separateur</p>
                  <select
                    v-model="intermediaire.separateur"
                    class="select-combo"
                    style="width: 200px"
                  >
                    <option value="/" selected>/</option>
                    <option value=":" selected>:</option>
                    <option value="-" selected>-</option>
                    <option value="|" selected>|</option>
                  </select>
                </div>

                <div class="mt">
                  <p class="text-white mt">Numero</p>
                  <select
                    v-model="intermediaire.numero"
                    class="select-combo"
                    style="width: 200px"
                  >
                    <option v-for="i in 40" :value="i" :key="i" selected>
                      {{ i }}
                    </option>
                  </select>
                </div>

                <div class="mt">
                  <p class="text-white mt">Vague</p>
                  <select
                    v-model="intermediaire.vague"
                    class="select-combo"
                    style="width: 200px"
                  >
                    <option value="" selected>Non pris en charge</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>
                <div class="is-flex pt-3">
              <div class="mt">
                <p class="text-white mt">Nom de la classe</p>
                <input
                  :value="
                    intermediaire.classe.CodeClasse +
                    '' +
                    intermediaire.separateur +
                    '' +
                    intermediaire.numero +
                    '' +
                    intermediaire.vague
                  "
                  id="NomClasse-intermediaire"
                  readonly
                  class="input-text"
                  style="width: 500px"
                />
              </div>

              <div class="mt m-3 pt-3">
                <button
                  class="btn-connection"
                  id="create-classe-intermediaire"
                  style="width: 150px"
                  @click="saveClasseIntermediaire"
                >
                  Valider
                </button>
              </div>
             </div>
              </div>

             
            </div>

            <div style="height: 47vh">
          <b-table
            :data="classeIntermediaire"
            paginated
            type="is-info"
            class="mt-4"
            :mobile-cards="false"
            per-page="9"
          >
            <b-table-column
              field="IDCLASSE"
              searchable
              label="ID"
              v-slot="props"
            >
              {{ props.row.IDCLASSE }}
            </b-table-column>

            <b-table-column
              field="CodeClasseIntermediaire"
              searchable
              label="CODE CLASSE"
              v-slot="props"
            >
              {{ props.row.CodeClasseIntermediaire }}
            </b-table-column>

            <b-table-column
              field="CodeClasse"
              searchable
              label="REFERENCE CLASSE"
              v-slot="props"
            >
              {{ props.row.CodeClasse }}
            </b-table-column>

            <b-table-column
              field="NomClasse"
              searchable
              label="NOM CLASSE"
              v-slot="props"
            >
            {{ props.row.NomClasse }}
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
// import "../../../plugins/fullscreen.js";

export default {
  layout: "dashboard",
  data() {
    return {
      classeGenerale: [],
      classe: {
        code: "",
        nom: "",
        bExamen: 0,
      },
      cycle: {
        prescolaire: 0,
        primaire: 0,
        college: 0,
        lycee: 0,
      },
      selected: {
        cycle: 0,
      },
      etablissement: {},
      classeGeneraleExamen: [],
      intermediaire: {
        classe: {
          CodeClasse: "",
        },
        separateur: "",
        numero: "",
        vague: "",
      },

      classeIntermediaire: [],
    };
  },
  async fetch() {
    this.classeGenerale = await db.getClasseGenerale();
    this.classeGeneraleExamen = await db.getClasseGenerale(true);
    this.classeIntermediaire = await db.getClasseIntermediaire({
      cycle:0 , IDCLASSE:0,  Annee:await this.$localForage.getItem("annee")
    });
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

    async saveClasseIntermediaire() {
      let CodeClasse =
        this.intermediaire.classe.CodeClasse +
        "" +
        this.intermediaire.separateur +
        "" +
        this.intermediaire.numero +
        "" +
        this.intermediaire.vague;
      let classe = {
        CodeClasse: CodeClasse,
        IDCLASSE_GEN: this.intermediaire.classe.IDCLASSE_GEN,
        Annee:await this.$localForage.getItem("annee")
      };

      let isCreated = await db.createClasseIntermediaire(classe);

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

    async saveClasseGnerale() {
      var isStored = await db.createClasseGenerale({
        ...this.classe,
        IDCYCLE: this.selected.cycle,
      });

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
