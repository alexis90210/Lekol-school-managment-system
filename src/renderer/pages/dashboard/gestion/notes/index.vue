<template>
  <div>
    <!-- tab-liste-eleve-view -->
    <div class="container-box">
      <b-loading
        v-model="chargement"
        is-full-page
        :can-cancel="false"
      ></b-loading>
      <p class="text-white px">RENSEIGNEMENT DES NOTES DES ELEVES</p>

      <div class="onglet-view" style="width: 1200px; height: 102vh !important">
        <p class="">Tous les niveaux confondus</p>
        <div class="box-content">
          <div class="align-row" style="gap: 20px">
            <div class="mt">
              <p class="text-white mt">Classe</p>
              <select
                v-model="filtre.CLASSE"
                class="select-combo"
                style="width: 250px"
              >
                <option v-for="(e, i) in classe" :key="i" :value="e">
                  {{ e.CodeClasseIntermediaire }} {{ e.NomClasse }}
                </option>
              </select>
            </div>

            <div class="mt">
              <p class="text-white mt">Matiere</p>
              <select
                v-model="filtre.IDMATIERE"
                class="select-combo"
                style="width: 250px"
              >
                <option v-for="(m, i) in matiere" :key="i" :value="m.IDMATIERE_CLASSE">
                  {{ m.Appelation }}
                </option>
              </select>
            </div>

            <div class="mt">
              <p class="text-white mt">Trimestre</p>
              <select
                v-model="filtre.Trimestre"
                class="select-combo"
                style="width: 150px"
              >
                <option value="1">1er Trimestre</option>
                <option value="2">2eme Trimestre</option>
                <option value="3">3eme Trimestre</option>
              </select>
            </div>

            <div class="mt-5">
              <button
                class="btn-connection"
                style="width: 170px"
                @click="filtreEleve"
              >
                Afficher les eleves
              </button>
            </div>

            <div class="mt-5">
              <button
                class="btn-connection"
                style="width: 170px; background-color: blue"
                @click="getEleve()"
              >
                Actualiser la liste
              </button>
            </div>

            <div class="mt-5">
              <button
                class="btn-connection"
                style="width: 170px; background-color: orange"
              >
                Imprimer la liste
              </button>
            </div>
          </div>
        </div>

        <div style="height: 85vh">
          <b-table
            :data="allEleveNote"
            paginated
            type="is-info"
            class="mt-4"
            :mobile-cards="false"
            per-page="11"
          >
            <b-table-column
              field="CodeEleve"
              :subheading="'Total = ' + allEleveNote.length"
              searchable
              label="MATRICULE"
              width="100px"
              v-slot="props"
            >
              {{ props.row.CodeEleve }}
            </b-table-column>

            <b-table-column
              field="NomEleve"
              searchable
              label="NOM(S)"
              width="250px"
              v-slot="props"
            >
              {{ props.row.NomEleve }}
            </b-table-column>

            <b-table-column
              field="PrenomEleve"
              searchable
              label="PRENOM(S)"
              width="250px"
              v-slot="props"
            >
              {{ props.row.PrenomEleve }}
            </b-table-column>

            <b-table-column field="DV1" label="Devoir 1" v-slot="props">
              <!-- {{ props.row.DV1 == null ? 0 : props.row.DV1 }} -->
              <b-tooltip
                type="is-light"
                :triggers="['click']"
                :auto-close="['outside', 'escape']"
              >
                <template v-slot:content>
                  <b-input
                    type="number"
                    class="m-1"
                    :min="0" :max="20"
                    @keyup.native.enter="
                      emitClose(
                        $event,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                    onclick="this.select()"
                    :value="props.row.DV1 == null ? '0' : props.row.DV1"
                  ></b-input>
                  <b-button
                    label="Absence justifiee"
                    @click="
                      etatNote(
                        1,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                    class="m-1"
                    size="is-small"
                    type="is-success"
                    outlined
                  ></b-button>
                  <b-button
                    @click="
                      etatNote(
                        2,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                    label="Absence non justifiee"
                    class="m-1"
                    size="is-small"
                    type="is-danger"
                    outlined
                  ></b-button>
                </template>
                <b-button
                  size="is-small"
                  :label="props.row.DV1 == null ? '0' : props.row.DV1"
                  type="is-link"
                  style="color: white !important"
                  outlined
                />
              </b-tooltip>
            </b-table-column>

            <b-table-column field="DV2" label="Devoir 2" v-slot="props">
              <!-- {{ props.row.DV2  == null ? 0 : props.row.DV2}} -->
              <b-tooltip
                type="is-light"
                :triggers="['click']"
                :auto-close="['outside', 'escape']"
              >
                <template v-slot:content>
                  <b-input
                    type="number"
                    class="m-1"
                    :min="0" :max="20"
                    :value="props.row.DV2 == null ? '0' : props.row.DV2"
                    @keyup.native.enter="
                      emitClose(
                        $event,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                    onclick="this.select()"
                  ></b-input>
                  <b-button
                    label="Absence justifiee"
                    class="m-1"
                    size="is-small"
                    type="is-success"
                    @click="
                      etatNote(
                        1,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                    outlined
                  ></b-button>
                  <b-button
                    label="Absence non justifiee"
                    class="m-1"
                    size="is-small"
                    type="is-danger"
                    @click="
                      etatNote(
                        2,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                    outlined
                  ></b-button>
                </template>
                <b-button
                  size="is-small"
                  :label="props.row.DV2 == null ? '0' : props.row.DV2"
                  type="is-link"
                  style="color: white !important"
                  outlined
                />
              </b-tooltip>
            </b-table-column>

            <b-table-column field="DD" label="Devoir Dep." v-slot="props">
              <b-tooltip
                type="is-light"
                :triggers="['click']"
                :auto-close="['outside', 'escape']"
              >
                <template v-slot:content>
                  <b-input
                    type="number"
                    class="m-1"
                    :min="0" :max="20"
                    :value="props.row.DD == null ? '0' : props.row.DD"
                    @keyup.native.enter="
                      emitClose(
                        $event,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                    onclick="this.select()"
                  ></b-input>
                  <b-button
                    label="Absence justifiee"
                    class="m-1"
                    size="is-small"
                    type="is-success"
                    @click="
                      etatNote(
                        1,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                    outlined
                  ></b-button>
                  <b-button
                    label="Absence non justifiee"
                    class="m-1"
                    size="is-small"
                    type="is-danger"
                    @click="
                      etatNote(
                        2,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                    outlined
                  ></b-button>
                </template>
                <b-button
                  size="is-small"
                  :label="props.row.DD == null ? '0' : props.row.DD"
                  type="is-link"
                  style="color: white !important"
                  outlined
                />
              </b-tooltip>
            </b-table-column>

            <b-table-column field="MCL" label="Moy. Cl." v-slot="props">
              {{ props.row.MCL == null ? 0 : props.row.MCL }}
            </b-table-column>

            <b-table-column field="MCOMP  " label="Moy. Comp." v-slot="props">
              <!-- {{ props.row.MCOMP  == null ? 0 : props.row.MCOMP  }} -->
              <b-tooltip
                type="is-light"
                :triggers="['click']"
                :auto-close="['outside', 'escape']"
              >
                <template v-slot:content>
                  <b-input
                    type="number"
                    class="m-1"
                    :min="0" :max="20"
                    :value="props.row.MCOMP == null ? '0' : props.row.MCOMP"
                    @keyup.native.enter="
                      emitClose(
                        $event,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                    onclick="this.select()"
                  ></b-input>
                  <b-button
                    label="Absence justifiee"
                    class="m-1"
                    size="is-small"
                    type="is-success"
                    outlined
                    @click="
                      etatNote(
                        1,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                  ></b-button>
                  <b-button
                    label="Absence non justifiee"
                    class="m-1"
                    size="is-small"
                    type="is-danger"
                    outlined
                    @click="
                      etatNote(
                        2,
                        props.column.$options.propsData.field,
                        props.row
                      )
                    "
                  ></b-button>
                </template>
                <b-button
                  size="is-small"
                  :label="props.row.MCOMP == null ? '0' : props.row.MCOMP"
                  type="is-link"
                  style="color: white !important"
                  outlined
                />
              </b-tooltip>
            </b-table-column>

            <b-table-column field="Coefficient  " label="Coeff." v-slot="props">
              {{ props.row.Coefficient == null ? 0 : props.row.Coefficient }}
            </b-table-column>

            <b-table-column field="MGLE  " label="Moy. Gen." v-slot="props">
              {{ props.row.MGLE == null ? 0 : props.row.MGLE }}
            </b-table-column>

            <b-table-column
              field="Appreciation"
              label="Appreciation"
              v-slot="props"
            >
              {{
                props.row.Appreciation == null
                  ? "......"
                  : props.row.Appreciation
              }}
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
import db from "../../../../plugins/model";
export default {
  layout: "dashboard",
  data() {
    return {
      classe: [],
      matiere: [],
      chargement: false,
      filtre: {
        CLASSE: {
          IDCLASSE: 0,
          IDCLASSE_GEN: 0,
        },
        Trimestre: 0,
        IDMATIERE: 0,
      },
      allEleveNote: [],
    };
  },

  async mounted() {
    let filter = {
      cycle: 0,
      Annee: await this.$localForage.getItem("annee"),
      IDCLASSE: 0,
      IDCLASSE_GEN: 0, // this.filtre.CLASSE.IDCLASSE_GEN,
      bExamen: 0,
    };

    this.classe = await db.getClasseIntermediaire(filter);
    this.matiere = await db.getMatiereClasse(
      await this.$localForage.getItem("annee"),
      this.filtre.CLASSE.IDCLASSE
    );

  },

  methods: {
    filtreEleve() {
      if (
        this.filtre.IDMATIERE == 0 ||
        this.filtre.CLASSE.IDCLASSE == 0 ||
        this.filtre.Trimestre == 0
      ) {
        this.$buefy.dialog.alert({
          title: "Erreur, alerte",
          message: `<div>Veuillez selectionner </div> 
                  <ol>
                    <li> une classe </li>
                    <li> une matiere </li>
                    <li> un Trimestre </li>
                  </ol>
                  `,
          type: "is-danger",
          hasIcon: true,
        });
      } else {
        this.getEleve();
      }
    },
    async getEleve() {
      this.chargement = true;
      console.log(this.filtre);
      this.allEleveNote = await db.getEleveNote({
        Annee: await this.$localForage.getItem("annee"),
        IDCLASSE: this.filtre.CLASSE.IDCLASSE,
        IDMATIERE: this.filtre.IDMATIERE,
        Trimestre: this.filtre.Trimestre
      });
      this.chargement = false;
    },

    etatNote(etat, devoir, row) {
      this.$buefy.snackbar.open("etat note : " + etat);
      console.log(devoir);
    },

    async emitClose($event, devoir, row) {
      this.$buefy.snackbar.open("Enregistrement en cours...");
      console.log(devoir);
      var DV1 = row.DV1 ?? 0,
          DV2 = row.DV2 ?? 0,
          DD = row.DD ?? 0,
          MCL = row.MCL ?? 0,
          MCOMP = row.MCOMP ?? 0,
          MGLE = row.MGLE ?? 0,
          Appreciation = row.Appreciation ?? "Faible";

        if (devoir == "DV1") {
          DV1 = $event.srcElement._value;
        }

        if (devoir == "DV2") {
          DV2 = $event.srcElement._value;
        }

        if (devoir == "DD") {
          DD = $event.srcElement._value;
        }

        if (devoir.trim() == "MCOMP") {
          MCOMP = $event.srcElement._value;
        }

        MCL = (parseFloat(DV1) + parseFloat(DV2)  + parseFloat(DD)) / 3

        let note = (MCL + parseFloat(MCOMP))/2 

        if(row.Coefficient != null) {
          MGLE = note * parseFloat(row.Coefficient)

          if( note < 10) {
            Appreciation = 'Faible'
          }  else if ( note >= 10 &&  note < 12) {
            Appreciation = 'Passable'
          }  else if ( note >= 12 &&  note < 14) {
            Appreciation = 'Assez-Bien'
          } else if ( note >= 14 &&  note < 17) {
            Appreciation = 'Bien'
          } else if ( note >= 17 &&  note <= 20) {
            Appreciation = 'Excellent'
          }
        }



      if (row.IDMATIERE == null || row.IDMATIERE == undefined) {
               await db.addNote({
          CodeEleve: row.CodeEleve,
          Annee: row.Annee,
          IDMATIERE: this.filtre.IDMATIERE,
          Trimestre: this.filtre.Trimestre,
          DV1: DV1,
          DV2: DV2,
          DD: DD,
          MCL: MCL,
          MCOMP: MCOMP,
          MGLE: MGLE,
          Appreciation: Appreciation,
          bjustifiee: 1,
        });

       
      } else {
        
        await db.updateNote({
          CodeEleve: row.CodeEleve,
          Annee: row.Annee,
          IDMATIERE: this.filtre.IDMATIERE,
          Trimestre: this.filtre.Trimestre,
          DV1: DV1,
          DV2: DV2,
          DD: DD,
          MCL: MCL,
          MCOMP: MCOMP,
          MGLE: MGLE,
          Appreciation: Appreciation,
          bjustifiee: 1,
        })
      }

      this.getEleve() 
    },
  },
  computed: {},
};
</script>

<style>
.modal .modal-content {
  max-width: 150vw !important;
  max-height: 120vh !important
;
}
</style>
