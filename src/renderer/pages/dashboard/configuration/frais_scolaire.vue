<template>
  <div>

  <div class="container-box" >
   
      <p class="text-white px">CONFIGURATION DES FRAIS SCOLAIRES</p>
    
    <b-tabs type="is-boxed" class="px-3 mt-6" >
      <b-tab-item label="Frais scolaire generaux">
        <ConfigFraisGeneraux/>
      </b-tab-item>
      <b-tab-item label="Frais scolaire par niveau ( classe )">
        <ConfigFraisParClasse/>
      </b-tab-item>
    </b-tabs>
  </div>

  
  </div>
</template>

<script>
import ConfigFraisParClasse from "../../../components/ConfigFraisParClasse.vue";
import ConfigFraisGeneraux from "../../../components/ConfigFraisGeneraux.vue";
export default {
    layout: "dashboard",
    data() {
        return {};
    },
    components: { ConfigFraisParClasse, ConfigFraisGeneraux }
};
</script>

<style></style>
