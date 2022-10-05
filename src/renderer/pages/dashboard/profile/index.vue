<template>
  <div>

    <!-- FOR AGENT  -->
    <div class="container-box"  v-if="isAgent === true">
    
    <b-tabs type="is-boxed" class="px-3" v-if="open">
      <b-tab-item label="Definition / Modification de compte">
        <FormAgent :profile="true" :update="data"/>
      </b-tab-item>
      <b-tab-item label="Autorisations"></b-tab-item>
      <b-tab-item label="Caisse"></b-tab-item>
      <b-tab-item label="Remuneration"></b-tab-item>
      <b-tab-item label="Prime"></b-tab-item>
      <b-tab-item label="Heure de travail mensuel"></b-tab-item>
    </b-tabs>
  </div>

  <!-- FOR ENSEIGNANT  -->
  <div class="container-box"  v-if="isEnseignant === true">
    
    <b-tabs type="is-boxed" class="px-3" v-if="open">
      <b-tab-item label="Definition / Modification de compte">
        <FormEnseignant :update="data"/>
      </b-tab-item>
      <b-tab-item label="Remuneration"></b-tab-item>
      <b-tab-item label="Prime"></b-tab-item>
      <b-tab-item label="Heure de travail mensuel"></b-tab-item>
    </b-tabs>
  </div>

  
  </div>
</template>

<script>
import FormAgent from '../../../components/FormAgent.vue';
import FormEnseignant from '../../../components/FormEnseignant.vue';
export default {
    layout: "dashboard",
    data(){
      return {
        data:{},
        open:false,
        isAgent:false,
        isEnseignant:false

      }
    },
    async mounted(){

      let isUpdating = this.$route.query.isUpdating
     
      if( !isUpdating ) {
        if(await this.$localForage.getItem("user")){
          this.data = await this.$localForage.getItem("user")
          this.open = true
        } else {
          this.$router.go(-1)
        }
      } else {
          
          this.isEnseignant = this.$route.query.isEnseignant  === 'true'
          this.isAgent = this.$route.query.isAgent   === 'true'
          this.data =  await this.$localForage.getItem("update_personnel") 

          this.open = true

          console.log(this.isAgent);
          console.log(this.isEnseignant);
          

         
      }
      
    },
    components: { FormAgent, FormEnseignant }
};
</script>

<style></style>
