<template>
  <div class="gradient setMaxHeight">
    <WindowControl/>
    <br><br><br><br>
   <div class="columns is-centered mt-6 pt-6">
    <div class="column is-two-fifths apply-transparence">
      <div>
      <div class="logo-box">
        <Logo :style="style"/>
      </div>
      <p class="has-text-light is-size-5 has-text-centered pb-4 has-text-bold">
        {{etablissement.NomEtab.toUpperCase()}}
      </p>

      <div class="p-3 mx-6">
        <form @submit.prevent="checkEcole">
          <b-field :label="$t('ann_sco')" label-position="inside">
            <b-select v-model="user.annee" icon="calendar-check" expanded>
              <option v-for="(annee ,i) in annee_scolaire" :key="i" :value="annee.debut">{{annee.debut}}-{{annee.fin}}</option>
            </b-select>
          </b-field>

          <b-field :label="$t('login')" class="mt-4" label-position="inside">
            <b-input v-model="user.login" icon="account"></b-input>
          </b-field>

          <b-field
            :label="$t('mdp')"
            class="mt-4"
            label-position="inside"
            v-if="user.annee && user.login"
          >
            <b-input
              type="Password"
              v-model="user.password"
              icon="key"
              :password-reveal="false"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('server')"
            class="mt-4"
            label-position="inside"
            v-if="advanced"
          >
            <b-input v-model="user.server" icon="access-point"></b-input>
          </b-field>

          <b-field class="mt-5" label-position="inside">
            <b-button
              native-type="submit"
              icon-right="lock"
              :label="$t('se_conn')"
              type="is-success"
            ></b-button>
          </b-field>
        </form>
      </div>

      <!-- <div
        class="px-6 has-text-dark border-0 avanced-fixed apply-transparence p-2 mt-4"
      >
        <b-switch v-model="advanced" type="is-success" class="has-text-light" style="zoom: 85%">{{
          $t("con_av")
        }}</b-switch>
      </div> -->
    </div>
    </div>
   </div>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
("use strict");
const { ipcRenderer } = require("electron");
import db from "../plugins/model";
import WindowControl from "../components/windowControl.vue";

export default {
  data() {
    return {
      style: "width:80px",
      advanced: false,
      hide:false,
      user: {
        annee: "",
        login: "",
        password: "",
        server: "",
      },
      etablissement:{
        NomEtab:''
      },

      annee_scolaire:[]
    };
  },

  async mounted() {
    this.etablissement = await db.getEtabInfo()
    this.annee_scolaire = await db.allAnnee()

    if(!this.etablissement) {
      this.$router.push('/installation')
    }

    if(this.annee_scolaire.length == 0) {
      this.$router.push('/installation')
    }
   
  },
  methods: {

    async checkEcole(){
      this.etablissement = await db.getEtabInfo()

    if( this.etablissement ) {
      this.login(this.etablissement)
    } else {
      this.$buefy.toast.open({
        message: 'Etablissement inexistant',
        type:'is-danger',
        position:'is-bottom-right',
        duration:5000,
      })
    }
    },
    async login(etab) {

      let isAuth = await db.auth(this.user.login, this.user.password);

      console.log(isAuth);

      if (isAuth) {

        await this.$localForage.setItem('user', isAuth)

        await this.$localForage.setItem('connected', true)

        await this.$localForage.setItem('annee', this.user.annee)

        await this.$localForage.setItem('etab', this.etablissement)

        this.hide = true

        ipcRenderer.send("go-fullscreen", {
          auth: "Ok! Welcome " + this.user.login,
        });


          this.$router.push("/dashboard");
     
      } else {
        this.$buefy.notification.open({
          message: 'Erreur Identifiants incorrects',
          type: "is-danger",
          position: "is-top-right",
          hasIcon: true,
          duration: 10000,
          pauseOnHover: true,
          progressBar: true,
        });
      }
    },
  },
  computed: {
    computedStyle() {},
  },
  components: { Logo, WindowControl },
};
</script>

<style>
  .select select {
    background-color: transparent !important;
    color: white !important;
    border: 1px solid #081727 !important;
  }

  .label{
    color:white
  }

  .gradient {
    background: #6e1313;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #1c1c5f, #6e1313);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #1c1c5f, #6e1313); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  .apply-transparence {
    background-color: rgba(0, 0, 0, .2);
    border-radius: 10px;
  }
  </style>
