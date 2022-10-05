<template>
  <div class="modal-show" v-if="canLoad">
    <b-tabs type="is-boxed" class="px-3">
      <b-tab-item label="Information de l'eleve">
        <FormEleve :update="data" @refresh="$emit('refresh')"/>
      </b-tab-item>
      <b-tab-item label="Gestion des frais scolaires"></b-tab-item>
      <b-tab-item label="Etat de paiement"></b-tab-item>
    </b-tabs>
    
  </div>
</template>

<script>
import FormEleve from '../../../components/FormEleve.vue';
import db from '../../../plugins/model'
export default {
    layout:'modal',
    props:{
      update:{
        type:Object,
        require:true
      }
    },
    data() {
      return {
          data:{},
          canLoad:false
      }
    },

    async mounted() {

      let filtre = {
        cycle: 0,
        Annee:await this.$localForage.getItem("annee"),
        IDCLASSE:this.update.IDCLASSE,
        bExamen:''
      }
      let res = await db.getClasseIntermediaire(filtre );

      res = res[0]
      console.log( res );

      this.data = {
        ...this.update,
       IDCYCLE: res.IDCYCLE ,
        Intermediaire:res
      }
      
      console.log(this.data);

      this.canLoad = true

    },
    components: { FormEleve }
}
</script>

<style>
.modal-show {
    width: 100%;
    height: 120vh;
    background-color: #0e1317 !important;
    padding-top: 30px;
    zoom: 96%;
}
</style>