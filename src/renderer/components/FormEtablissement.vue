<template>
  <div class="pt-5">
    <b-tabs type="is-boxed">
      <b-tab-item label="Information de l'etablissement">
        <form @submit.prevent="savingEtablissementProcess">
          <div class="container-box">
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
                    v-model="Etablissement.NomEtab"
                    @input="
                      Etablissement.NomEtab =
                        Etablissement.NomEtab.toUpperCase()
                    "
                    class="input-text"
                    required
                    style="width: 400px"
                  />
                </div>

                <div class="m-3">
                  <p class="text-white mt">Responsable</p>
                  <input
                    v-model="Etablissement.Responsable"
                    required
                    @input="
                      Etablissement.Responsable
                        ? (Etablissement.Responsable =
                            Etablissement.Responsable[0].toUpperCase() +
                            Etablissement.Responsable.slice(1))
                        : ''
                    "
                    class="input-text"
                    style="width: 400px"
                  />
                </div>
              </div>

              <div class="is-flex is-flex-direction-row">
                <div class="mt m-3">
                  <p class="text-white mt">Mobile</p>
                  <input
                    class="input-text"
                    style="width: 400px"
                    v-model="Etablissement.Mobile"
                    required
                  />
                </div>

                <div class="m-3">
                  <p class="text-white mt">Ville</p>
                  <input
                    class="input-text"
                    style="width: 400px"
                    required
                    v-model="Etablissement.Ville"
                  />
                </div>

                <div class="m-3">
                  <p class="text-white mt">Pays</p>
                  <input
                    class="input-text"
                    style="width: 400px"
                    required
                    v-model="Etablissement.Pays"
                  />
                </div>
              </div>
              <div class="is-flex">
                <div class="mt m-3">
                  <p class="text-white mt">Adresse</p>
                  <input
                    v-model="Etablissement.Adresse"
                    @input="
                      Etablissement.Adresse =
                        Etablissement.Adresse.toUpperCase()
                    "
                    class="input-text"
                    required
                    style="width: 400px"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset
              class="mt-3"
              style="
                border: 1px solid rgba(247, 238, 238, 0.113);
                border-radius: 5px;
                width: 70vw;
              "
            >
              <div class="is-flex is-flex-direction-row">
                <div class="m-3">
                  <p class="text-white mt">CodeEtab</p>
                  <input
                    v-model="Etablissement.CodeEtab"
                    required
                    readonly
                    class="input-text"
                    style="width: 400px"
                  />
                </div>
              </div>
            </fieldset>
          </div>

          <div
            style="
              position: absolute;
              right: 20px;
              top: 130px;
              border: 1px solid rgba(247, 238, 238, 0.113);
              border-radius: 5px;
              width: 200px;
              height: auto;
            "
          >
            <img
              src="../assets/icon.png"
              id="preview-Logo-Etablissement"
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
                  ref="Logo"
                  @input="pickLogo"
                >
                  <abbr title="Choisir une Logo" style="width: 100%">
                    <a class="button is-info p-0 is-fullwidth">
                      <span class="p-0">Logo</span>
                    </a>
                  </abbr>
                </b-upload>
              </b-field>
            </div>
          </div>

          <div class="submit-box-Etablissement">
            <b-button
              label="VALIDER"
              type="is-success"
              icon-left="content-save"
              native-type="submit"
              expanded
            ></b-button>
          </div>
        </form>
      </b-tab-item>
      <b-tab-item label="Administrer les annees scolaires">
        <fieldset
          class="mt-3"
          style="
            border: 1px solid rgba(247, 238, 238, 0.113);
            border-radius: 5px;
            width: 70vw;
          "
        >
          <div class="is-flex is-flex-direction-column">
            <div class="m-3">
             
              <p class="mt-4 has-text-light">
                Apres cloture , vous ne pourrez plus effectuer les operations
                suivantes :
              </p>
              <ul class="mt-3 has-text-light">
                <li>
                  <i class="mdi mdi-arrow-right blue"></i> Inscription des
                  eleves
                </li>
                <li>
                  <i class="mdi mdi-arrow-right blue"></i> Inscription des
                  agents
                </li>
                <li>
                  <i class="mdi mdi-arrow-right blue"></i> Inscription des
                  enseignants
                </li>
                <li>
                  <i class="mdi mdi-arrow-right blue"></i> creation des classes
                  intermediaires
                </li>
                <li>
                  <i class="mdi mdi-arrow-right blue"></i> edition et gestion
                  des notes
                </li>
                <li>
                  <i class="mdi mdi-arrow-right blue"></i> encaissement des
                  frais scolaires
                </li>
              </ul>

              <div class="mt-6">
                <b-button
                  type="is-info"
                  @click="$router.push('/dashboard/etablissement/annee-scolaire')"
                  icon-left="content-save-cog"
                  >J'Administre</b-button
                >
              </div>

            
            </div>
          </div>
        </fieldset>
      </b-tab-item>
    </b-tabs>
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
  },
  data() {
    return {
      matiereGenerale: [],
      file: null,
      bFermer: false,
      Etablissement: {
        NomEtab: "",
        Responsable: "",
        Annee: "",
        Mobile: "",
        Ville: "",
        Pays: "",
        Adresse: "",
        bFermer: 0,
      },
    };
  },

  async mounted() {

    this.Etablissement = await db.getEtabInfo();

    let annee = parseInt(await this.$localForage.getItem("annee"))

    this.bFermer = ( await db.anneeScolaire( annee ) ).bCloture;

    this.Etablissement.Photo
      ? (document.getElementById("preview-Logo-Etablissement").src =
          "data:image/png;base64, " + this.Etablissement.Photo)
      : "";
  },
  methods: {
    async clotureAnnee(bool) {
        let annee = parseInt(await this.$localForage.getItem("annee"))
        let message  = bool ? "Voulez-vous cloturer l'annee " + annee + "-" + (annee+1) + " ?" : "Voulez-vous de-cloturer l'annee " + annee + "-" + (annee+1) + " ?"
        let feedback  = bool ? "Cloturer l'annee " + annee + "-" + (annee+1) + " reussie !" 
        : "De-cloturer l'annee " + annee + "-" + (annee+1) + " reussie !"
    
        this.$buefy.dialog.alert({
            title:'Cloture de l\'annee scolaire',
            message:message,
            type: bool ? "is-danger" : "is-info",
            hasIcon:true,
            onConfirm:async () => {
                let exec = await db.clotureEtablissement(annee , this.bFermer);
                if (exec) {
                    this.$buefy.dialog.alert({
                    message: feedback,
                    type: "is-success",
                    hasIcon: true
                    });
                } else {
                    this.$buefy.dialog.alert({
                    message: "Echec de l'operation",
                    type: "is-danger",
                    hasIcon: true
                    });
                }   
            }
        })
    },

    async pullEtablissement(payload) {

      let exec = await db.updateEtablissement(payload);

      if (exec) {
        this.$buefy.notification.open({
          message: "mise a jour reussie",
          type: "is-success",
          position: "is-bottom-right",
          hasIcon: true,
          duration: 10000,
          pauseOnHover: true,
          progressBar: true,
        });
      } else {
        this.$buefy.notification.open({
          message: "Echec d'la mise a jour",
          type: "is-danger",
          position: "is-top-right",
          hasIcon: true,
          duration: 10000,
          pauseOnHover: true,
          progressBar: true,
        });
      }
    },

    async savingEtablissementProcess() {
      if (this.file) {
        var Logo;

        imageToBase64(URL.createObjectURL(this.file))
          .then((response) => {
            Logo = response;
            let payload = {
              ...this.Etablissement,
              Logo: Logo,
            };

            this.pullEtablissement(payload);
          })
          .catch((error) => {
            let payload = {
              ...this.Etablissement,
              Logo: "",
            };
            this.pullEtablissement(payload);
          });
      } else {
        let payload = {
          ...this.Etablissement,
          Logo: "",
        };
        this.pullEtablissement(payload);
      }
    },

    pickLogo(e) {
      console.log(e);
      document.getElementById("preview-Logo-Etablissement").src =
        URL.createObjectURL(this.file);
    },
    async removeFile() {
      const image = require("../assets/icon.png");
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "placeholder.jpg", { type: blob.type });
      document.getElementById("preview-Logo-Etablissement").src =
        URL.createObjectURL(file);
    },
  },
};
</script>

<style>
.submit-box-Etablissement {
  position: absolute;
  left: 200px;
  bottom: 170px;
}
</style>
