<template>
    <div>
      <form @submit.prevent="savingAgentProcess">
        <!-- tab-inscription-Agent-view -->
        <div class="container-box" id="tab-inscription-Agent-view">
          <p class="text-white" v-if="profile">
            {{ "COMPTE UTILISATEUR " }}
          </p>
          <p class="text-white" v-else>
            {{ !update ? "CREATION DES AGENTS" : "MISE A JOUR D'UN AGENT" }}
          </p>
    
          <p class="text-white is-size-7">INFORMATION DE L'AGENT</p>
          <fieldset
            class="mt-3"
            style="
              border: 1px solid rgba(247, 238, 238, 0.113);
              border-radius: 5px;
              width: 70vw;
            "
          >
            <div class="is-flex is-flex-direction-row">
              <div class="mt m-3">
                <p class="text-white mt">Nom</p>
                <input
                  v-model="Agent.NomAgent"
                  @input="Agent.NomAgent = Agent.NomAgent.toUpperCase()"
                  class="input-text"
                  required
                  style="width: 400px"
                />
              </div>
  
              <div class="m-3">
                <p class="text-white mt">Prenom</p>
                <input
                  v-model="Agent.PrenomAgent"
                  required
                  @input="
                    Agent.PrenomAgent
                      ? (Agent.PrenomAgent =
                          Agent.PrenomAgent[0].toUpperCase() +
                          Agent.PrenomAgent.slice(1))
                      : ''
                  "
                  class="input-text"
                  style="width: 400px"
                />
              </div>
  
              <div class="m-3 pt-5 is-flex">
                <div class="px-3">
                  <b-switch
                    v-model="Agent.bHomme"
                    true-value="1"
                    false-value="0"
                    type="is-success"
                    >M. Monsieur</b-switch
                  >
                  <b-switch
                    v-model="Agent.bHomme"
                    true-value="0"
                    false-value="1"
                    type="is-success"
                    >Madame / Mdle</b-switch
                  >
                </div>
  
               
              </div>
            </div>
  
            <div class="is-flex is-flex-direction-row">
              <div class="mt m-3">
                <p class="text-white mt">Lieu de Naissance</p>
                <input
                  class="input-text"
                  style="width: 400px"
                  v-model="Agent.LieuNaissance"
                  required
                  @input="
                    Agent.LieuNaissance
                      ? (Agent.LieuNaissance =
                          Agent.LieuNaissance[0].toUpperCase() +
                          Agent.LieuNaissance.slice(1))
                      : ''
                  "
                />
              </div>
  
              <div class="m-3">
                <p class="text-white mt">Date de Naissance</p>
                <input
                  type="date"
                  class="input-text"
                  style="width: 400px"
                  required
                  v-model="Agent.DateNaissance"
                />
              </div>
  
              <div class="m-3">
                <p class="text-white mt">Grade</p>
                <select
                  v-model="Agent.IDGRADE"
                  class="select-combo"
                  style="width: 400px"
                  required
                >
                  <option
                    v-for="grade in gradeGenerale"
                    :key="grade.IDGRADE"
                    :value="grade.IDGRADE"
                  >
                    {{ grade.CodeGrade }}
                    {{ grade.NomGrade }}
                  </option>
                </select>
              </div>
            </div>
            <div class="is-flex">
                <div class="mt m-3">
                <p class="text-white mt">Mobile</p>
                <input
                  v-model="Agent.MobileAgent"
                  @input="Agent.MobileAgent = Agent.MobileAgent.toUpperCase()"
                  class="input-text"
                  required
                  style="width: 400px"
                />
              </div>
              <div class="mt m-3">
                <p class="text-white mt">Adresse</p>
                <input
                  v-model="Agent.AdresseAgent"
                  @input="Agent.AdresseAgent = Agent.AdresseAgent.toUpperCase()"
                  class="input-text"
                  required
                  style="width: 400px"
                />
              </div>
            </div>
          </fieldset>

          <p class="text-white is-size-7 mt-6">IDENTIFIANT DE CONNEXION DE L'AGENT</p>
          <fieldset
            class="mt-3"
            style="
              border: 1px solid rgba(247, 238, 238, 0.113);
              border-radius: 5px;
              width: 70vw;
            "
          >
            <div class="is-flex is-flex-direction-row">
              <div class="mt m-3" v-if="update">
                <p class="text-white mt">Login</p>
                <input
                  v-model="Agent.LoginAgent"
                  class="input-text"
                  readonly
                  style="width: 400px"
                />
              </div>
  
              <div class="m-3">
                <p class="text-white mt">Password</p>
                <input
                  v-model="Agent.PasswordAgent"
                  required
                  class="input-text"
                  style="width: 400px"
                />
              </div>
  
              
            </div>
  
        
          </fieldset>
  
        </div>
  
        <div style="position: absolute;
    right: 20px;
    top: 130px;
    border: 1px solid rgba(247, 238, 238, 0.113);
    border-radius: 5px;
    width: 200px;
    height: auto;">
          <img
            src="../assets/icon.png"
            id="preview-photo-Agent"
            alt=""
            srcset=""
            class="p-2"
            @dblclick="removeFile"
          />
          <div
            class="p-1 mb-1"
            style="border-top: 1px solid rgba(247, 238, 238, 0.113)"
          >
            <b-field class="file">
              <b-upload
                v-model="file"
                expanded
                accept=".png ,.jpeg , .jpg"
                ref="photo"
                @input="pickPhoto"
              >
                <abbr title="Choisir une photo" style="width: 100%">
                  <a class="button is-info p-0 is-fullwidth">
                    <span class="p-0">Photo</span>
                  </a>
                </abbr>
              </b-upload>
            </b-field>
          </div>
        </div>
  
        <div class="submit-box-agent">
          <b-button
            label="VALIDER"
            type="is-success"
            icon-left="content-save"
            native-type="submit"
            expanded
          ></b-button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import db from "../plugins/model";
  import imageToBase64 from "image-to-base64/browser";
  export default {
    props: {
      update: {
        type: Object,
        require: false,
      },
      profile:{
        type:Boolean
      }
    },
    data() {
      return {
        gradeGenerale:[],
        file: null,
         Agent: {
          bHomme: "",
          NomAgent: "",
          PrenomAgent: "",
          DateNaissance: "",
          LieuNaissance: "",
          MobileAgent:'',
          AdresseAgent:'',
          LoginAgent:'',
          PasswordAgent:'',
          IDGRADE: "",
          Photo: "",
        },
        etablissement: {},
      };
    },
    async mounted() {
      this.gradeGenerale = await db.getGrade()
      this.etablissement = await db.getEtabInfo();
  
      /// COMMING FROM UPDATE PANEL
  
      if (this.update) {
        this.Agent = {
          ...this.update,
          PHOTO: this.update.Photo,
        };
  
        console.log(this.Agent);
  
        this.Agent.Photo
          ? (document.getElementById("preview-photo-Agent").src =
              "data:image/png;base64, " + this.Agent.Photo)
          : "";
      }
    },
    methods: {
      clearField() {
        this.Agent = {};
        this.removeFile();
      },
  
      async pullAgent(payload) {
        if (
          this.Agent.bHomme 
        ) {
          if (!this.update) {
            let numero = await db.getMatricule(await this.$localForage.getItem("annee"), 2);
  
            let ordre = (parseInt(numero) + 1).toString().padStart(4, "0");
            let Annee = await this.$localForage.getItem("annee");
            Annee = Annee.toString().slice(2);
            let CodeEcole = this.etablissement.CodeEtab;
  
            let data = {
              ...payload,
              CodeAgent: CodeEcole + Annee + ordre + 'A',
              LoginAgent: CodeEcole + Annee + ordre + 'A',   
              Annee: await this.$localForage.getItem("annee"),           
              update: {
                newNum: parseInt(numero) + 1,
                action: parseInt(numero) == 0 ? "I" : "U",
                Annee: await this.$localForage.getItem("annee"),
              },
            };
            console.log(data);
            let exec = await db.createAgent(data);
  
            if (exec) {
              this.$buefy.notification.open({
                message: "Incription reussie",
                type: "is-success",
                position: "is-bottom-right",
                hasIcon: true,
                duration: 10000,
                pauseOnHover: true,
                progressBar: true,
              });
            } else {
              this.$buefy.notification.open({
                message: "Echec d'inscription",
                type: "is-danger",
                position: "is-top-right",
                hasIcon: true,
                duration: 10000,
                pauseOnHover: true,
                progressBar: true,
              });
            }  
            // clearing field
            this.clearField();
  
          } else {

            // UPDATE Agent
            let exec = await db.updateAgent({...payload, Annee: await this.$localForage.getItem("annee")});
            if (exec) {
              console.log(payload);
              
              if(  payload.LoginAgent == (await this.$localForage.getItem("annee")).LoginAgent ) {
               this.$buefy.dialog.confirm({
                title:'Instructions...',
                message:'Veuillez vous re-connecter pour prendre en compte les nouvelles informations',
                type:'is-link',
                hasIcon:true,
                confirmText:'Se reconnecter ?',
                cancelText:'Plus tard',
                onConfirm:() => {
                  this.$router.push('/')
                }
               })
              }

              this.$buefy.notification.open({
                message: "Mise a jour reussie",
                type: "is-success",
                position: "is-bottom-right",
                hasIcon: true,
                duration: 10000,
                pauseOnHover: true,
                progressBar: true,
              });
            } else {
              this.$buefy.notification.open({
                message: "Echec mise a jour",
                type: "is-danger",
                position: "is-top-right",
                hasIcon: true,
                duration: 10000,
                pauseOnHover: true,
                progressBar: true,
              });
            }
          }
          
        } else {
          this.$buefy.notification.open({
            message: "Veuillez cochez les cases",
            type: "is-danger",
            position: "is-top-right",
            hasIcon: true,
            duration: 10000,
            pauseOnHover: true,
            progressBar: true,
          });
        }
      },
  
      async savingAgentProcess() {
        if (this.file) {
          var Photo;
  
          imageToBase64(URL.createObjectURL(this.file))
            .then((response) => {
              Photo = response;
              let payload = {
                ...this.Agent,
                Photo: Photo,
              };
  
              this.pullAgent(payload);
            })
            .catch((error) => {
              let payload = {
                ...this.Agent,
                Photo: "",
              };
              this.pullAgent(payload);
            });
        } else {
          let payload = {
            ...this.Agent,
            Photo: "",
          };
          this.pullAgent(payload);
        }
      },
  

      pickPhoto(e) {
        console.log(e);
        document.getElementById("preview-photo-Agent").src = URL.createObjectURL(
          this.file
        );
      },
      async removeFile() {
        const image = require("../assets/icon.png");
        const response = await fetch(image);
        const blob = await response.blob();
        const file = new File([blob], "placeholder.jpg", { type: blob.type });
        document.getElementById("preview-photo-Agent").src =
          URL.createObjectURL(file);
      },
    },
  };
  </script>
  
  <style>
 
  .submit-box-agent {
    position: absolute;
    left: 100px;
    bottom: 170px;
  }
  </style>
  