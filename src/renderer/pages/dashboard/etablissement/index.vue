<template>
  <div>
    <div class="container-box" id="tab-finance-view">
      <p class="text-white px">GESTION DE L'ETABLISSEMENT</p>
      <FormEtablissement/>
    </div>
  </div>
</template>

<script>
import FormEtablissement from '../../../components/FormEtablissement.vue';
export default {
    layout: "dashboard",
    components: { FormEtablissement }
};
</script>

<style></style>
