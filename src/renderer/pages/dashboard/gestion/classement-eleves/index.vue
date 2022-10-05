<template>
  <div>
    <!-- tab-liste-eleve-view -->
    <div class="container-box">
      <b-loading
        v-model="chargement"
        is-full-page
        :can-cancel="false"
      ></b-loading>
      <p class="text-white px">CLASSEMENT DES ELEVES</p>

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
                Afficher un classement
              </button>
            </div>

            <div class="mt-5">
              <button
                class="btn-connection"
                style="width: 170px; background-color: blue"
                @click="getEleveClassement()"
              >
                Actualiser le classement
              </button>
            </div>

            <div class="mt-5">
              <button
                class="btn-connection"
                style="width: 170px; background-color: orange"
              >
                Imprimer le classement
              </button>
            </div>
          </div>
        </div>

        <div style="height: 85vh">
          <b-table
            :data="allEleveClassement"
            paginated
            type="is-info"
            class="mt-4"
            :mobile-cards="false"
            per-page="11"
          >
            <b-table-column
              field="CodeEleve"
              :subheading="'Total = ' + allEleveClassement.length"
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

            <b-table-column
              field="Moyenne  "
              label="Moy. Trimestrielle"
              v-slot="props"
              centered
            >
              <b-button outlined type="is-link" size="is-small" :label="props.row.Moyenne == null ? '0' : parseFloat(props.row.Moyenne).toFixed(2) "></b-button>
            </b-table-column>

            <b-table-column field="Rang" label="Rang" v-slot="props">
              {{ props.row.Rang == null ? "......" : props.row.Rang }}
            </b-table-column>

            <b-table-column field="status" label="status" v-slot="props">
              {{ props.row.status == null ? "......" : props.row.status }}
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
      chargement: false,
      filtre: {
        CLASSE: {
          IDCLASSE: 0,
          IDCLASSE_GEN: 0,
        },
        Trimestre: 0,
      },
      allEleveClassement: [],
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
  },

  methods: {
    filtreEleve() {
      if (this.filtre.CLASSE.IDCLASSE == 0 || this.filtre.Trimestre == 0) {
        this.$buefy.dialog.alert({
          title: "Erreur, alerte",
          message: `<div>Veuillez selectionner </div> 
                    <ol>
                      <li> une classe </li>
                      <li> un Trimestre </li>
                    </ol>
                    `,
          type: "is-danger",
          hasIcon: true,
        });
      } else {
        this.getEleveClassement();
      }
    },
    async getEleveClassement() {
      this.chargement = true;
      console.log(this.filtre);
      this.allEleveClassement = await db.getClassementEleve({
        Annee: await this.$localForage.getItem("annee"),
        Trimestre: this.filtre.Trimestre,
        IDCLASSE: this.filtre.CLASSE.IDCLASSE,
      });

      this.chargement = false;
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
