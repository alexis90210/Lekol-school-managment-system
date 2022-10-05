<template>
  <div>
    <!-- tab-devoirs-view -->
    <div class="container-box" id="tab-devoirs-view">
      <p class="text-white px mb-4">APERCU DU RELEVE DES NOTES</p>
      <b-table :columns="header" :data="data"> </b-table>
    </div>
  </div>
</template>

<script>
import db from "../../../plugins/model";
export default {
  layout: "dashboard",
  data() {
    return {
      header: [
        {
          label:'Matricule',
          field:'Matricule',
          visible:true,
          searchable:true
        },
        {
          label:'Nom & Prenom',
          field:'Nom_Prenom',
          visible:true,
          searchable:true
        },
        {
          label:'Devoir 1',
          field:'DV1',
          visible:true,
          searchable:true
        },
        {
          label:'Devoir 2',
          field:'DV2',
          visible:true,
          searchable:true
        },
        {
          label:'Devoir Dep.',
          field:'DD',
          visible:true,
          searchable:true
        },
        {
          label:'Moy cl.',
          field:'MCL',
          visible:true,
          searchable:true
        },
        {
          label:'Moy comp.',
          field:'MCOMP',
          visible:true,
          searchable:true
        },
        {
          label:'Coef',
          field:'COEF',
          visible:true,
          searchable:true
        },
        {
          label:'Moy gen.',
          field:'MGLE',
          visible:true,
          searchable:true
        },
        {
          label:'Appreciation',
          field:'Appreciation',
          visible:true,
          searchable:true
        },
      ],

      data: [
        {
          Matricule:'Matricule de l\'etudiant',
          Nom_Prenom:'Nom & Prenom de l\'etudiant',
          DV1:'Devoir Numero 1',
          DV2: 'Devoir Numero 2',
          DD: 'Devoir Departemental',
          MCL:'Moyenne de classe',
          MCOMP:'Moyenne de composition',
          COEF:'Coefficient de la matiere',
          MGLE:'Moyenne generale',
          Appreciation:'Appreciation selon la note'
        },
      ],

    };
  },
  async mounted() {
    // this.header = await db.getHeaderDevoir()
  }
};
</script>

<style></style>
