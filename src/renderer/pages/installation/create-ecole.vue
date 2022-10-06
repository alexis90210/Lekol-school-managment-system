<template>
    <div
      class="is-flex is-flex-wrap-wrap h100"
      style="
        background-color: #081727;
        gap: 20px;
        padding-top: 10vh;
        padding-bottom: 10vh;
        padding-inline: 40px;
        overflow-y: scroll;
      "
    >
      <b-collapse class="card card2" :open="true" :aria-id="'contentIdForA11y5-'">
        <template #trigger="props">
          <div
            class="card-header"
            role="button"
            :aria-controls="'contentIdForA11y5-'"
            :aria-expanded="props.open"
          >
            <p class="card-header-title has-text-light">
              Creer mon ecole
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>
        <div class="card-content">
          <div class="content has-text-light pt-6">
            <form @submit.prevent="create_ecole">
            <div style="width: 500px">
              
                <div class="mt m-3">
              <p class="text-white mt">Nom de l'ecole</p>
              <input
              v-model="Nom"
                class="input-text"
                @input="Nom = Nom.toUpperCase()"
                required
                style="width: 400px"
              />
            </div>

            <div class="mt m-3">
              <p class="text-white mt">Code de l'ecole</p>
              <input
                v-model="Code"
                @input="Code = Code.toUpperCase()"
                class="input-text"
                required
                style="width: 400px"
              />
            </div>
         
            </div>
          
            <div class="mt-6" style="padding-top: 100px">
              <b-button
                type="is-link"
                expanded
                native-type="submit"
                icon-right="arrow-right"
                rounded
                >Suivant</b-button
              >
  
              <b-button
                type="is-light"
                class="mt-4"
                expanded
                rounded
                icon-left="arrow-left"
                @click="$router.go(-1)"
                >Frais scolaire</b-button
              >
  
              <p class="mt-6 is-size-7">
                Lekol system @2022 <br />
                Systeme de gestion scolaire sur la base du systeme educatif
                congolais
              </p>
            </div>

          </form>
            
          </div>
        </div>
      </b-collapse>

      <b-collapse class="card card2" :open="true" :aria-id="'contentIdForA11y5-'">
        <template #trigger="props">
          <div
            class="card-header"
            role="button"
            :aria-controls="'contentIdForA11y5-'"
            :aria-expanded="props.open"
          >
            <p class="card-header-title has-text-light">
              Identifiant provisoire de connexion
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>
        <div class="card-content">
          <div class="content has-text-light pt-6">
            <div style="width: 500px">
                <div class="mt m-3">
              <p class="text-white mt">Login</p>
              <input
                class="input-text"
                v-model="login"
                required
                style="width: 400px"
              />
            </div>

            <div class="mt m-3">
              <p class="text-white mt">Mot de passe</p>
              <input
                class="input-text"
                v-model="password"
                required
                style="width: 400px"
              />
            </div>

            <p class="has-text-danger p-4">ces identifiants sont temporaires, necessaire pour une premiere connexion .</p>

            </div>
          </div>
        </div>
      </b-collapse>
   
  </div>
  </template>
  
  <script>

import db from '../../plugins/model'
  export default {
    data() {
      return {
        login:'test',
        password:'1234',
        Nom:'',
        Code:''
      };
    },
    methods: {
      reload() {
        window.location.reload();
      },
      async create_ecole() {


        let exec1 = await db.createEcole({
          Nom:this.Nom,
          Code:this.Code
        })

        let exec2  = false

        if ( exec1 ) {
          exec2 = await db.createDemoAgent()
        } else {
          this.$buefy.notification.open({
            message:'Creation de votre ecole a echoue veuillez contacter le developpeur',
            type:'is-danger',
            hasIcon:true,
            duration:10000
          })
        }

        if(exec2) {
          this.$router.push('/installation/ouverture-annee')
        } else {
          this.$buefy.notification.open({
            message:'Creation du compte demo a echoue veuillez contacter le developpeur',
            type:'is-danger',
            hasIcon:true,
            duration:10000
          })
        }

      },
    },
  };
  </script>
  
  <style scoped>
  .h100 {
    width: 100%;
    height: 100vh;
  }
  
  .card2 {
    background-color: rgba(246, 48, 8, 0.01) !important;
  }
  
  .card {
    background-color: #081727;
  }
  </style>
  