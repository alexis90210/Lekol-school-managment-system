<template>
  <div id="window-control" class="is-flex is-flex-direction-row is-justify-content-space-between  px-4">
<div class="pt-1">
    <!-- <Logo :style="'width:35px'"/> -->
</div>

<div class="is-flex is-flex-direction-row is-justify-content-space-between pt-2" >
    <span @click="reduce()">
    <b-icon icon="minus" type="is-white" class="mx-2" id="icon"></b-icon></span>
    <span  @click="close()">
    <b-icon icon="close" type="is-white" class="mx-2" id="icon"></b-icon>
</span>
</div>
  </div>
</template>

<script>
("use strict");
const { ipcRenderer } = require("electron");
import Logo from './Logo.vue';
export default {
    components: { Logo },
    methods:{
        reduce() {
            console.log('reduce');
            ipcRenderer.send('reduce-window')
        },
        close() {
            this.$buefy.dialog.confirm({
            title:'Assistant logiciel',
            message:`Souhaitez-vous arreter l'application ? <br>
            Tapez <b>Confirmer</b> pour fermer l\'application`,
            confirmText:'Confirmer',
            cancelText:'Revenir',
            type:'is-danger',
            hasIcon:true,
            onConfirm:() => {
              ipcRenderer.send('close-window')
            }
          })
        },
    }
}
</script>

<style>
#window-control {
    position: fixed;
    width: 100%;
    height: 40px;
    background-color: rgba(0, 0, 0, .2);
    top: 0;
    z-index:100
}
#icon:hover,
#icon:hover {
    cursor: pointer;
}
</style>