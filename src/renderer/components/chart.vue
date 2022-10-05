<template>
  <div>
    <div
      class="align-row spacing-box flex-nowrap mt"
      style="justify-content: space-around; align-items: flex-start; zoom: 120%"
    >
      
      <div id="chartContainer2" class="chart-bull3 chartContainer2">
        <client-only>
          <apexchart
            type="bar"
            height="420px"
            :options="option1"
            :series="series1"
          ></apexchart>
        </client-only>
      </div>

      <div class="chart-bull">
        <div
          id="chartContainer5"
          class="chart-bull2 chartContainer5"
          style="zoom: 110%; padding-top: 10px"
        >
          <client-only>
            <apexchart
              type="bar"
              height="450px"
              :options="option2"
              :series="series2"
            ></apexchart>
          </client-only>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  props:{
    eleveInscris:{
      type:Object,
      require:true
    }, 
    eleveReInscris:{
      type:Object,
      require:true
    } ,
    eleveExamens:{
      type:Object,
      require:true
    }, 
    agent:{
      type:Object,
      require:true
    },
    enseignant:{
      type:Object,
      require:true
    },
    autre:{
      type:Object,
      require:true
    }
  },
  components: { apexchart: VueApexCharts },
  data() {
    return {
      // SERIE 1
      series1: [
        {
          name: "Total",
          data: [this.eleveInscris.Total, this.eleveReInscris.Total, this.eleveExamens.Total, this.agent.Total, this.enseignant.Total],
        },
        {
          name: "Femme/Fille",
          data: [this.eleveInscris.Femme, this.eleveReInscris.Femme, this.eleveExamens.Femme, this.agent.Femme, this.enseignant.Femme],
        },
        {
          name: "Homme/Garcon",
          data:  [this.eleveInscris.Homme, this.eleveReInscris.Homme, this.eleveExamens.Homme, this.agent.Homme, this.enseignant.Homme],
        },
      ],

      option1: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          type: "text",
          categories: [
            "Eleve inscrits",
            "Eleve Re-inscrits",
            "Eleve Examens",
            "Personnel Administratifs",
            "Personnel Enseignant",
          ],
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },

      //  SERIE 2

      series2: [
        {
          data: [this.eleveInscris.Total, this.eleveReInscris.Total, this.eleveExamens.Total, 
          this.agent.Total, this.enseignant.Total , this.autre.cycle, this.autre.matiere, this.autre.classe],
       
        },
      ],
      option2: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
         
          categories: [
            "Eleve Inscrit",
            "Eleve Pre-inscrit",
            "Eleve Examen",
            "Agents",
            "Enseignant",
            "Cycle",
            "Matiere",
            "Classe",
          ],
        },
      },
    };
  },

  async mounted() {},
};
</script>

<style></style>
