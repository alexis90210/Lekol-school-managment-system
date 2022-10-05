<template>
  <div>
    <!-- tab-home-view" -->
    <div class="container-box tab-active" id="tab-home-view">
      <p class="text-white px">STATISTIQUES ANALYTIQUE</p>

      <div class="align-row spacing-box flex-nowrap min-stat-width">
        <div
          class="box has-background-transparent m-1 p-3"
          style="width: 250px; zoom: 127%"
        >
          <p class="text-white mb-2" style="border-bottom: 1px solid blue">
            Eleve inscrits
          </p>
          <div class="align-column gap-3">
            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Total</p>
              <p class="m-0 text-white">{{eleveInscris.Total}}</p>
            </div>

            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Fille (s)</p>
              <p class="m-0 text-white">{{eleveInscris.Femme}}</p>
            </div>

            <div class="align-row flex-between m-0 t-small">
              <p class="m-0 text-white">Gar&ccedil;on (s)</p>
              <p class="m-0 text-white">{{eleveInscris.Homme}}</p>
            </div>
          </div>
        </div>

        <div
          class="box has-background-transparent m-1 p-3"
          style="width: 250px; zoom: 127%"
        >
          <p class="text-white mb-2" style="border-bottom: 1px solid purple">
            Eleve Re-inscrits
          </p>
          <div class="align-column gap-3">
            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Total</p>
              <p class="m-0 text-white">{{ eleveReInscris.Total }}</p>
            </div>

            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Fille (s)</p>
              <p class="m-0 text-white">{{ eleveReInscris.Femme }}</p>
            </div>

            <div class="align-row flex-between m-0 t-small">
              <p class="m-0 text-white">Gar&ccedil;on (s)</p>
              <p class="m-0 text-white">{{ eleveReInscris.Homme }}</p>
            </div>
          </div>
        </div>

        <div
          class="box has-background-transparent m-1 p-3"
          style="width: 250px; zoom: 127%"
        >
          <p class="text-white mb-2" style="border-bottom: 1px solid yellow">
            Eleve Examens
          </p>
          <div class="align-column gap-3">
            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Total</p>
              <p class="m-0 text-white">{{eleveExamens.Total}}</p>
            </div>

            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Fille (s)</p>
              <p class="m-0 text-white">{{eleveExamens.Femme}}</p>
            </div>

            <div class="align-row flex-between m-0 t-small">
              <p class="m-0 text-white">Gar&ccedil;on (s)</p>
              <p class="m-0 text-white">{{eleveExamens.Homme}}</p>
            </div>
          </div>
        </div>

        <div
          class="box has-background-transparent m-1 p-3"
          style="width: 300px; zoom: 130%"
        >
          <p class="text-white mb-2" style="border-bottom: 1px solid green">
            Personnel Administratifs
          </p>
          <div class="align-column gap-3">
            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Total</p>
              <p class="m-0 text-white">{{agent.Total}}</p>
            </div>

            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Homme (s)</p>
              <p class="m-0 text-white">{{agent.Homme}}</p>
            </div>

            <div class="align-row flex-between m-0 t-small">
              <p class="m-0 text-white">Femme (s)</p>
              <p class="m-0 text-white">{{agent.Femme}}</p>
            </div>
          </div>
        </div>

        <div
          class="box has-background-transparent m-1 p-3"
          style="width: 250px; zoom: 127%"
        >
          <p class="text-white mb-2" style="border-bottom: 1px solid orangered">
            Personnel Enseignant
          </p>
          <div class="align-column gap-3">
            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Total</p>
              <p class="m-0 text-white">{{enseignant.Total}}</p>
            </div>
           

            <div class="align-row flex-between m-0 t-small">
              <p class="m-0 text-white">Homme (s)</p>
              <p class="m-0 text-white">{{enseignant.Homme}}</p>
            </div>

            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Femme (s)</p>
              <p class="m-0 text-white">{{enseignant.Femme}}</p>
            </div>
          </div>
        </div>

        <div
          class="box has-background-transparent m-1 p-3"
          style="width: 250px; zoom: 127%"
        >
          <p class="text-white mb-2" style="border-bottom: 1px solid indigo">
            Autres
          </p>
          <div class="align-column gap-3">
            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Cycle (s)</p>
              <p class="m-0 text-white">4</p>
            </div>

            <div class="align-row flex-between t-small">
              <p class="m-0 text-white">Matiere (s)</p>
              <p class="m-0 text-white">{{autre.matiere}}</p>
            </div>

            <div class="align-row flex-between m-0 t-small">
              <p class="m-0 text-white">Classe (s)</p>
              <p class="m-0 text-white">{{autre.classe}}</p>
            </div>
          </div>
        </div>
      </div>
      <p class="text-white px py">STATISTIQUES GRAPHIQUE</p>
      <Chart v-if="canLoad" :eleveInscris="eleveInscris" :eleveReInscris="eleveReInscris" 
      :eleveExamens="eleveExamens" :agent="agent" :enseignant="enseignant" :autre="autre"/>
    </div>
  </div>
</template>

<script>
import db from "../../plugins/model";
import Chart from "../../components/chart.vue";
export default {
  layout: "dashboard",
  components: { Chart },
  data(){
    return {
      canLoad:false,
      eleveInscris:{
        Total:0,
        Femme:0,
        Homme:0
      },

      eleveReInscris:{
        Total:0,
        Femme:0,
        Homme:0
      },

      eleveExamens:{
        Total:0,
        Femme:0,
        Homme:0
      },

      agent:{
        Total:0,
        Femme:0,
        Homme:0
      },
      enseignant:{
        Total:0,
        Femme:0,
        Homme:0
      },

      autre:{
        cycle:0,
        matiere:0,
        classe:0
      }

    }
  },

  async mounted() {

    let etab =  await db.getEtabInfo()

    if(etab.bPreScolaire == 1) {
      this.autre.cycle  +=1
    }

    if(etab.bPrimaire == 1) {
      this.autre.cycle  +=1
    }

    if(etab.bCollege == 1) {
      this.autre.cycle  +=1
    }

    if(etab.bLycee == 1) {
      this.autre.cycle  +=1
    }


    this.autre.classe = await db.getClasseIntermediaire({
      Annee:await this.$localForage.getItem("annee"),
      cycle:0,
      IDCLASSE:0,
      IDCLASSE_GEN:0
    })
    this.autre.classe  = this.autre.classe.length

    this.autre.matiere = await db.getMatiereClasse(await this.$localForage.getItem("annee") , 0)
    this.autre.matiere  = this.autre.matiere.length

    this.eleveInscris = (await db.eleveInscris( await this.$localForage.getItem("annee")))[0]

    this.eleveReInscris =  (await db.eleveReInscris( await this.$localForage.getItem("annee")))[0]

    this.eleveExamens = (await db.eleveExamens( await this.$localForage.getItem("annee")))[0]

    this.agent = (await db.agentStat(await this.$localForage.getItem("annee")))[0]

    this.enseignant =( await db.enseignantStat( await this.$localForage.getItem("annee")))[0]

    console.log( this.eleveInscris );

    this.canLoad = true
  },
};
</script>

<style>
.has-background-transparent {
  background-color: transparent !important;
}
</style>
