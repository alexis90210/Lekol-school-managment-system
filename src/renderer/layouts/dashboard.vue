<template>
  <div style="zoom: 91%" id="main-win">
    <div class="main">
      <div class="topbar color-transparent">
        <div class="topleft align-row" style="zoom: 110%">
          <div class="topbar-title-item">
            <abbr
              title="Configuration des matieres"
              class="abbr-o"
              id="tab-matiere"
              @click="
                $router.push(('/dashboard/configuration/matiere'))
              "
            >
              <span class="align-row">
                <i class="mdi mdi-circle blue active-item-size"></i>
                Matieres</span
              >
            </abbr>
          </div>

          <div class="topbar-title-item">
            <abbr
              title="Configuration des classes"
              class="abbr-o"
              id="tab-classe"
              @click="
                $router.push(('/dashboard/configuration/classe'))
              "
            >
              <span class="align-row">
                <i class="mdi mdi-circle green active-item-size"></i>
                Classes</span
              >
            </abbr>
          </div>

          <div class="topbar-title-item">
            <abbr
              title="Apercu des notes"
              class="abbr-o"
              id="tab-devoirs"
              @click="
                $router.push(('/dashboard/configuration/devoir'))
              "
            >
              <span class="align-row no-wrap">
                <i class="mdi mdi-circle orange active-item-size"></i>
                Devoirs / Notes
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item">
            <abbr
              title="Apercu des notes"
              class="abbr-o"
              id="tab-devoirs"
              @click="
                $router.push(('/dashboard/gestion/classement-eleves'))
              "
            >
              <span class="align-row no-wrap">
                <i class="mdi mdi-circle blue active-item-size"></i>
                Classement / eleves
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item">
            <abbr
              title="Configuration des grades"
              class="abbr-o"
              id="tab-grade"
              @click="
                $router.push(('/dashboard/configuration/grade'))
              "
            >
              <span class="align-row">
                <i class="mdi mdi-circle purple active-item-size"></i>
                Grades
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item">
            <abbr
              title="Configuration des Cycles"
              class="abbr-o"
              id="tab-cycle"
              @click="
                $router.push(('/dashboard/configuration/cycle'))
              "
            >
              <span class="align-row">
                <i
                  class="mdi mdi-circle active-item-size"
                  style="color: cyan"
                ></i>
                Cycles
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item">
            <abbr
              title="Configuration des Frais scolaires"
              class="abbr-o"
              id="tab-cycle"
              @click="
                $router.push('/dashboard/configuration/frais_scolaire')
              "
            >
              <span class="align-row">
                <i
                  class="mdi mdi-circle active-item-size"
                  style="color: green"
                ></i>
                Frais scolaires
              </span>
            </abbr>
          </div>
        </div>

        <div class="topright align-row">
          <div class="topbar-title-item status">
            <p class="status-role">Connect&eacute; en tant que <b>Agent</b></p>
            <p class="status-name" id="tab-profil" @click="$router.push({path:'/dashboard/profile' , query:{isAgent:true , isEnseignant:false}})">
              <i class="mdi mdi-circle green active-item-size"></i>
              <span id="nom-agent" v-if="open">{{ etablissement.user }}</span>
            </p>
          </div>
          <div class="topbar-title-item ">
            <abbr title="" class="abbr-o">
              <span class="align-row show-menu-right" style="margin-right:30px">
                <i
                  class="mdi mdi-account-circle active-item active-item-size"
                  style="font-size: 40px; !important"
                ></i>
              </span>
            </abbr>
            <div>
              <div
                class="is-flex is-flex-direction-column is-justify-content-space-between pt-2"
                style="
                  position: absolute;
                  right: 0;
                  top: -10px;
                  border-left: 1px solid rgba(250, 250, 250, 0.1);
                "
              >
                <abbr title="Reduire">
                  <span @click="reduce()">
                    <b-icon
                      icon="minus"
                      type="is-white"
                      class="mx-2 mt-1"
                      id="icon"
                    ></b-icon>
                  </span>
                </abbr>
                <abbr
                  title="Fermer"
                  style="border-top: 1px solid rgba(250, 250, 250, 0.1)"
                >
                  <span @click="close()">
                    <b-icon
                      icon="close"
                      type="is-danger"
                      class="mt-1 mx-2"
                      id="icon"
                    ></b-icon>
                  </span>
                </abbr>
              </div>
            </div>

            <ul class="contextMenu">
              <li
                id="tab-profil"
                @click="$router.push(('/dashboard/profile'))"
              >
                Mon profil
              </li>
              <li>Annee Scolaire : {{ etablissement.AnneeScolaire }}</li>
              <li class="last-item-menu" @click="$router.push(('/'))">
                Se deconnecter
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="sidebar" style="zoom: 110%">
          <div class="sidebar-top align-column" >
            <!-- <abbr
              class="menu-item tab"
              title="Rechercher un eleve"
              id="tab-search"
              @click="$router.push(('/dashboard/search'))"
            >
              <a href="#" class="no-anchor align-column">
                <i class="mdi mdi-magnify"></i>
              </a>
            </abbr> -->

            <abbr
              class="menu-item tab"
              title="Calendrier"
              @click="$router.push(('/dashboard/timetable'))"
            >
              <a href="#" class="no-anchor">
                <i class="mdi mdi-calendar"></i>
              </a>
            </abbr>

            <abbr
              class="menu-item menu-active"
              title="Acceuil"
              id="tab-home"
              @click="$router.push(('/dashboard'))"
            >
              <a href="#" class="no-anchor">
                <i class="mdi mdi-school"></i>
              </a>
            </abbr>

            <abbr
              class="menu-item tab"
              title="Tous les eleves"
              id="tab-liste-eleve"
              @click="$router.push(('/dashboard/liste/eleve'))"
            >
              <a href="#" class="no-anchor">
                <i class="mdi mdi-account-school"></i>
              </a>
            </abbr>

            <abbr
              class="menu-item tab"
              title="Inscription des eleves"
              id="tab-inscription-eleve"
              @click="$router.push(('/dashboard/creation/eleve'))"
            >
              <a href="#" class="no-anchor">
                <i class="mdi mdi-account-plus"></i>
              </a>
            </abbr>

            <abbr
              class="menu-item tab"
              title="Gestion des notes"
              id="tab-gestion-note"
              @click="$router.push(('/dashboard/gestion/notes'))"
            >
              <a href="#" class="no-anchor">
                <i class="mdi mdi-numeric-10-circle"></i>
              </a>
            </abbr>

            <abbr
              class="menu-item tab"
              title="Finance"
              id="tab-finance"
              @click="$router.push(('/dashboard/frais-scolaire'))"
            >
              <a href="#" class="no-anchor">
                <i class="mdi mdi-currency-fra"></i>
              </a>
            </abbr>

            <abbr
              class="menu-item tab"
              title="Creer un agent"
              id="tab-personnel-admin"
              @click="$router.push(('/dashboard/gestion/agent'))"
            >
              <a href="#" class="no-anchor">
                <i class="mdi mdi-face-agent"></i>
              </a>
            </abbr>

            <abbr
              class="menu-item tab"
              title="Creer un enseignant"
              id="tab-personnel-enseignant"
              @click="$router.push(('/dashboard/gestion/enseignant'))"
            >
              <a href="#" class="no-anchor">
                <i class="mdi mdi-account-multiple"></i>
              </a>
            </abbr>
            
            <abbr
              class="menu-item tab"
              title="Liste du personnel de l'ecole"
              @click="$router.push(('/dashboard/liste/personnel'))"
            >
              <a href="#" class="no-anchor">
                <i class="mdi mdi-shield-crown"></i>
              </a>
            </abbr>

            <!-- <abbr
              class="menu-item tab"
              title="Calendrier"
              @click="$router.push(('/dashboard/timetable'))"
            >
              <a href="#" class="no-anchor">
                <i class="mdi mdi-calendar"></i>
              </a>
            </abbr> -->

            <abbr
              class="menu-item tab"
              title="Plus d'options"
              id="tab-plus-option"
              @click="$router.push(('/dashboard/fonctionnalities'))"
            >
              <a href="#" class="no-anchor">
                <i class="mdi mdi-dots-horizontal"></i>
              </a>
            </abbr>
          </div>

          <div class="sidebar-bottom align-column" style="padding-bottom:115px">
            <abbr
              class="menu-item tab"
              title="Sauvegarde"
              id="tab-sauvegarde"
            >
              <a  href="../../database/zeus.db" class="no-anchor align-column" :download="new Date().toLocaleDateString() +'_sauvegarde.db'">
                <i class="mdi mdi-database-refresh"></i>
              </a>
            </abbr>

            <abbr
              class="menu-item"
              title="Deconnexion"
              @click="logout"
            >
              <a href="#" class="no-anchor align-column">
                <i class="mdi mdi-power"></i>
              </a>
            </abbr>
          </div>
        </div>
        <div class="align-column" id="views">
          <nuxt />
        </div>
      </div>

      <div class="bottombar color-transparent">
        <div class="topleft align-row">
          <div class="topbar-title-item">
            <abbr title="Cycle Maternel" class="abbr-o">
              <span class="align-row">
                <b-switch
                  type="is-info"     
                  v-model="cycle.prescolaire"
                  :true-value="1"
                  :false-value="0"
                  >PRESCOLAIRE</b-switch
                >
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item">
            <abbr title="Cycle prescolaire" class="abbr-o">
              <span class="align-row align-center">
                <b-switch
                  type="is-info"
                  v-model="cycle.primaire"
                  :true-value="1"
                  :false-value="0"
                  >PRIMAIRE</b-switch
                >
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item" v-if="cycle.college == 1">
            <abbr title="Cycle primaire" class="abbr-o">
              <span class="align-row">
                <b-switch
                  type="is-info"
                  v-model="cycle.college"
                  :true-value="1"
                  :false-value="0"
                  >COLLEGE</b-switch
                >
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item">
            <abbr title="Cycle College" class="abbr-o">
              <span class="align-row">
                <b-switch
                  type="is-info"
                  v-model="cycle.lycee"
                  :true-value="1"
                  :false-value="0"                  
                  >LYCEE</b-switch
                >
              </span>
            </abbr>
          </div>
        </div>

        <div class="topright align-row">
          <div class="topbar-title-item">
            <abbr title="Methode de travail" class="abbr-o">
              <span class="align-row">
                <i class="mdi mdi-calendar blue active-item-size"></i>
                ANNEE-SCOLAIRE : {{annee}} - {{annee+1}}
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item">
            <abbr title="Methode de travail" class="abbr-o">
              <span class="align-row">
                <i class="mdi mdi-server-security green active-item-size"></i>
                ESPACE DE TRAVAIL ({{SERVEUR.SERVER}})
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item">
            <abbr title="Methode de travail" class="abbr-o">
              <span class="align-row">
                DATE : {{ new Date().toLocaleDateString()}}
              </span>
            </abbr>
          </div>
        </div>

        <div class="topright align-row">
          <div class="topbar-title-item status">
            <p class="status-role">
              <i class="mdi mdi-earth green active-item-size"></i>
              <span id="ville-ecole"
                >{{ etablissement.Ville }},{{ etablissement.Pays }}</span
              >
            </p>
            <p class="status-name" id="tab-etab" @click="$router.push('/dashboard/etablissement')">
              <i class="mdi mdi-school orange active-item-size"></i>
              <span id="nom-ecole">{{ etablissement.NomEtab ?? "Chargement ..."}}</span>
            </p>
          </div>
          <div class="topbar-title-item show-menu-right align-row align-center">
            <abbr title="" class="abbr-o">
              <Logo :style="'width:30px'" />
            </abbr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
import db from "../plugins/model";
import WindowControl from "../components/windowControl.vue";
const axios = require("axios").default;

("use strict");
const { ipcRenderer } = require("electron");
export default {
  layout: "dashboard",
  components: { Logo, WindowControl },
  data() {
    return {
      current: {
        cycle: 1,
      },
      cycle: {
        prescolaire: 0,
        primaire: 0,
        college: 0,
        lycee: 0,
      },
      SERVEUR:{},
      annee:0,
      etablissement: {},
      open:false
    };
  },
 async  mounted() {
    require("../plugins/contextMenu.js");

    if(!(await this.$localForage.getItem("user"))){
      this.$router.push(('/'))
    }
  },

  async fetch() {
    this.etablissement = await db.getEtabInfo();

    console.log(this.etablissement);

    if (this.etablissement) {
      this.cycle.prescolaire = this.etablissement.bPreScolaire;
      this.cycle.primaire = this.etablissement.bPrimaire;
      this.cycle.college = this.etablissement.bCollege;
      this.cycle.lycee = this.etablissement.bLycee;
      
      let storeUser = await this.$localForage.getItem("user");

      let AnneeScolaire = await this.$localForage.getItem("annee");
      this.annee = parseInt(AnneeScolaire)

      if( storeUser && AnneeScolaire ){
        this.open = true
        this.etablissement.user = storeUser.NomAgent + " " + storeUser.PrenomAgent;
        this.etablissement.AnneeScolaire = parseInt(AnneeScolaire).toString() +
        "-" + (parseInt(AnneeScolaire) + 1).toString();
      } else {
        console.log('no data');
      }
      
    } else {
      this.$buefy.toast.open({
        message: "Etablissement inexistant",
        type: "is-danger",
        position: "is-bottom-right",
        duration: 5000,
      });
    }
    this.ConnexionParams() 
  },
  methods: {
    async ConnexionParams() {
      await axios
      .get("http://localhost/lekol.php")
      .then( res => {
        this.SERVEUR = res.data
      })

    },
    async logout(){
        await this.$localForage.clear

        this.$router.push(('/'))
    },
    
    reduce() {
      console.log("reduce");
      ipcRenderer.send("reduce-window");
    },

    close() {
      this.$buefy.dialog.confirm({
        title: "Assistant logiciel",
        message: `Souhaitez-vous arreter l'application ? <br>
            Tapez <b>Confirmer</b> pour fermer l\'application`,
        confirmText: "Confirmer",
        cancelText: "Revenir",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          ipcRenderer.send("close-window");
        },
      });
    },
  },
};
</script>

<style>

</style>
