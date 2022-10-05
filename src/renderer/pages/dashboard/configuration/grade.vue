<template>
  <div>
    <!-- tab-grade-view -->
    <div class="container-box" id="tab-grade-view">
      <p class="text-white px">CONFIGURATION DES GRADES</p>
      <div class="onglet-view" style="width: 1200px; height: 100vh !important;">
            <p class="">Configuration generale des grades / fonctions</p>
            <div class="box-content">
              <div class="align-row" style="gap: 20px">
                <div class="mt">
                  <p class="text-white mt">Code grade </p>
                  <input
                    class="input-text"
                    v-model="grade.CodeGrade"
                    @input="grade.CodeGrade = grade.CodeGrade.toUpperCase()"
                  />
                </div>
                <div class="mt">
                  <p class="text-white mt">Nom de la grade</p>
                  <input
                    v-model="grade.NomGrade"
                    @input="grade.NomGrade = grade.NomGrade.toUpperCase()"
                    class="input-text"
                    style="width: 500px"
                  />
                </div>

                <div class="mt pt-3">
                <button
                  class="btn-connection"
                  style="width: 150px"
                  @click="savegradeGenerale"
                >
                  Valider
                </button>
              </div>
                
              </div>
            </div>

            <div style="height: 67vh">
          <b-table
            :data="gradeGenerale"
            paginated
            type="is-info"
            class="mt-4"
            :mobile-cards="false"
            per-page="11"
          >
            <b-table-column
              field="IDGRADE"
              searchable
              label="ID"
              v-slot="props"
            >
              {{ props.row.IDGRADE }}
            </b-table-column>

            <b-table-column
              field="CodeGrade"
              searchable
              label="CODE GRADE"
              v-slot="props"
            >
              {{ props.row.CodeGrade }}
            </b-table-column>

            <b-table-column
              field="NomGrade"
              searchable
              label="NOM GRADE"
              v-slot="props"
            >
              {{ props.row.NomGrade }}
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
  </div>
</template>

<script>
  import db from '../../../plugins/model'
export default {
  layout: "dashboard",
  data() {
    return {
      grade:{
        CodeGrade:'',
        NomGrade:''
      },
      gradeGenerale:[]
    }
  },
  async fetch() {
    this.gradeGenerale = await db.getGrade()
  },
  methods:{
    async savegradeGenerale() {

var isStored = await db.createGrade({...this.grade });
this.grade = {}

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
  }
};
</script>

<style></style>
