<template>
  <div>
    <form @submit.prevent="savingEleveProcess">
      <!-- tab-inscription-eleve-view -->
      <div class="container-box" id="tab-inscription-eleve-view">
        <p class="text-white">
          {{ !update ? "INSCRIPTIONS DES ELEVES" : "MISE A JOUR DE L'ELEVE" }}
        </p>

        <div class="topleft align-row my-5">
          <div class="topbar-title-item" v-if="cycle.prescolaire == 1">
            <abbr title="Cycle Maternel" class="abbr-o">
              <span class="align-row">
                <b-radio
                  type="is-info"
                  @input="loadClasse"
                  v-model="current.cycle"
                  native-value="1"
                  id="conf-prescolaire"
                  >PRESCOLAIRE</b-radio
                >
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item" v-if="cycle.primaire == 1">
            <abbr title="Cycle prescolaire" class="abbr-o">
              <span class="align-row align-center">
                <b-radio
                  type="is-info"
                  @input="loadClasse"
                  v-model="current.cycle"
                  native-value="2"
                  id="conf-primaire"
                  >PRIMAIRE</b-radio
                >
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item" v-if="cycle.college == 1">
            <abbr title="Cycle primaire" class="abbr-o">
              <span class="align-row">
                <b-radio
                  type="is-info"
                  @input="loadClasse"
                  v-model="current.cycle"
                  native-value="3"
                  id="conf-college"
                  >COLLEGE</b-radio
                >
              </span>
            </abbr>
          </div>

          <div class="topbar-title-item" v-if="cycle.lycee == 1">
            <abbr title="Cycle College" class="abbr-o">
              <span class="align-row">
                <b-radio
                  type="is-info"
                  @input="loadClasse"
                  v-model="current.cycle"
                  native-value="4"
                  id="conf-lycee"
                  >LYCEE</b-radio
                >
              </span>
            </abbr>
          </div>
        </div>

        <p class="text-white is-size-7">INFORMATION DE L'ELEVE</p>
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
                v-model="eleve.NomEleve"
                @input="eleve.NomEleve = eleve.NomEleve.toUpperCase()"
                class="input-text"
                required
                style="width: 400px"
              />
            </div>

            <div class="m-3">
              <p class="text-white mt">Prenom</p>
              <input
                v-model="eleve.PrenomEleve"
                required
                @input="
                  eleve.PrenomEleve
                    ? (eleve.PrenomEleve =
                        eleve.PrenomEleve[0].toUpperCase() +
                        eleve.PrenomEleve.slice(1))
                    : ''
                "
                class="input-text"
                style="width: 400px"
              />
            </div>

            <div class="m-3 pt-5 is-flex">
              <div class="px-3">
                <b-switch
                  v-model="eleve.bHomme"
                  true-value="0"
                  false-value="1"
                  type="is-success"
                  >Fille</b-switch
                >
                <b-switch
                  v-model="eleve.bHomme"
                  true-value="1"
                  false-value="0"
                  type="is-success"
                  >Gar&ccedil;on</b-switch
                >
              </div>

              <div
                class="px-3"
                style="border-left: 1px solid rgba(247, 238, 238, 0.113)"
              >
                <b-switch
                  v-model="eleve.bNouveau"
                  true-value="1"
                  false-value="0"
                  type="is-success"
                  >Nouveau</b-switch
                >
                <b-switch
                  v-model="eleve.bNouveau"
                  true-value="0"
                  false-value="1"
                  type="is-success"
                  >Redoublant</b-switch
                >
              </div>
              <div
                class="px-3"
                style="border-left: 1px solid rgba(247, 238, 238, 0.113)"
              >
                <b-switch
                  v-model="eleve.bInscription"
                  true-value="1"
                  false-value="0"
                  type="is-success"
                  >Inscription</b-switch
                >
                <b-switch
                  v-model="eleve.bInscription"
                  true-value="0"
                  false-value="1"
                  type="is-success"
                  >ReInscription</b-switch
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
                v-model="eleve.LieuNaissance"
                required
                @input="
                  eleve.LieuNaissance
                    ? (eleve.LieuNaissance =
                        eleve.LieuNaissance[0].toUpperCase() +
                        eleve.LieuNaissance.slice(1))
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
                v-model="eleve.DateNaissance"
              />
            </div>

            <div class="m-3">
              <p class="text-white mt">Classe</p>
              <select
                v-model="Intermediaire"
                class="select-combo"
                style="width: 400px"
                required
                :disabled="current.cycle == 0 ? true : false"
              >
                <option
                  v-for="Intermediaire in classeIntermediaire"
                  :key="Intermediaire.IDCLASSE"
                  :value="Intermediaire"
                >
                  {{ Intermediaire.CodeClasseIntermediaire }}
                  {{ Intermediaire.NomClasse }}
                </option>
              </select>
            </div>
          </div>
        </fieldset>

        <div class="is-flex is-flex-direction-row mt-5" style="gap: 5vw">
          <div>
            <p class="text-white mt-4 is-size-7">
              APTITUDE PHYSIQUE DE L'ELEVE
            </p>
            <fieldset
              class="mt-3"
              style="
                border: 1px solid rgba(247, 238, 238, 0.113);
                border-radius: 5px;
                width: 30vw;
              "
            >
              <div class="is-flex is-flex-direction-column">
                <div
                  class="p-3"
                  style="border-left: 1px solid rgba(247, 238, 238, 0.113)"
                >
                  <b-switch
                    v-model="eleve.bEPS"
                    true-value="1"
                    false-value="0"
                    type="is-success"
                    class="pr-5"
                    >EPS (Apte)</b-switch
                  >
                  <b-switch
                    v-model="eleve.bEPS"
                    true-value="0"
                    false-value="1"
                    type="is-success"
                    >EPS (Inapte)</b-switch
                  >
                </div>
              </div>
            </fieldset>
          </div>
          <div class="ml-4">
            <p class="text-white mt-4 is-size-7">
              INFORMATION DES PARENTS DE L'ELEVE
            </p>
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
                  <p class="text-white mt">Nom & Prenom du Pere</p>
                  <input
                    class="input-text"
                    style="width: 400px"
                    v-model="eleve.NomPere"
                    @input="eleve.NomPere = eleve.NomPere.toUpperCase()"
                  />
                </div>

                <div class="m-3">
                  <p class="text-white mt">Mobile du Pere</p>
                  <input
                    class="input-text"
                    style="width: 400px"
                    v-model="eleve.MobilePere"
                  />
                </div>
                <div class="m-3" style="padding-top: 40px">
                  <b-switch
                    v-model="whoisTuteur"
                    true-value="1"
                    false-value="0"
                    @input="setTuteur"
                    type="is-success"
                    class="pr-5"
                  >
                    Tuteur
                  </b-switch>
                </div>
              </div>

              <div class="is-flex is-flex-direction-row">
                <div class="m-3">
                  <p class="text-white mt">Nom & Prenom de la Mere</p>
                  <input
                    class="input-text"
                    style="width: 400px"
                    v-model="eleve.NomMere"
                    @input="eleve.NomMere = eleve.NomMere.toUpperCase()"
                  />
                </div>

                <div class="m-3">
                  <p class="text-white mt">Mobile de la Mere</p>
                  <input
                    class="input-text"
                    style="width: 400px"
                    v-model="eleve.MobileMere"
                  />
                </div>
                <div class="m-3" style="padding-top: 40px">
                  <b-switch
                    v-model="whoisTuteur"
                    true-value="2"
                    false-value="0"
                    @input="setTuteur"
                    type="is-success"
                    class="pr-5"
                  >
                    Tuteur
                  </b-switch>
                </div>
              </div>

              <div class="is-flex is-flex-direction-row">
                <div class="m-3">
                  <p class="text-white mt">Nom & Prenom du Tuteur</p>
                  <input
                    class="input-text"
                    style="width: 400px"
                    v-model="eleve.NomTuteur"
                    @input="eleve.NomTuteur = eleve.NomTuteur.toUpperCase()"
                  />
                </div>

                <div class="m-3">
                  <p class="text-white mt">Mobile du Tuteur</p>
                  <input
                    class="input-text"
                    style="width: 400px"
                    v-model="eleve.MobileTuteur"
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div class="profile-box">
        <img
          src="../assets/icon.png"
          id="preview-photo-eleve"
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

      <div class="submit-box" v-if="canMakeInscription">
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
  },
  data() {
    return {
      file: null,
      whoisTuteur: "",
      classeIntermediaire: [],
      Intermediaire: {},
      current: {
        cycle: 0,
      },
      cycle: {
        prescolaire: 0,
        primaire: 0,
        college: 0,
        lycee: 0,
      },
      eleve: {
        bHomme: "",
        bNouveau: "",
        bInscription: "",
        bEPS: "",

        NomEleve: "",
        PrenomEleve: "",
        DateNaissance: "",
        LieuNaissance: "",
        IDCLASSE: "",
        Photo: "",
        NomPere: "",
        NomMere: "",
        NomTuteur: "",
        MobileEleve: "",
        MobilePere: "",
        MobileMere: "",
        MobileTuteur: "",
        CodeEleve: "",
      },
      etablissement: {},
      canMakeInscription: false,
    };
  },
  async mounted() {
    this.etablissement = await db.getEtabInfo();

    this.cycle.prescolaire = this.etablissement.bPreScolaire;
    this.cycle.primaire = this.etablissement.bPrimaire;
    this.cycle.college = this.etablissement.bCollege;
    this.cycle.lycee = this.etablissement.bLycee;

    /// COMMING FROM UPDATE PANEL

    if (this.update) {
      console.log("we for update");
      this.current.cycle = this.update.IDCYCLE;
      this.loadClasse();
      this.eleve = {
        ...this.update,
        PHOTO: this.update.Photo,
      };
      this.Intermediaire = this.update.Intermediaire;

      console.log(this.eleve);

      this.eleve.Photo
        ? (document.getElementById("preview-photo-eleve").src =
            "data:image/png;base64, " + this.eleve.Photo)
        : "";
    }
  },
  methods: {
    clearField() {
      this.Intermediaire = {};
      this.eleve = {};
      this.current = {};
      this.removeFile();
    },

    async pullEleve(payload) {
      if (
        this.eleve.bEPS ||
        this.eleve.bHomme ||
        this.eleve.bNouveau ||
        this.eleve.bInscription
      ) {
        if (!this.update) {
          let numero = await db.getMatricule(await this.$localForage.getItem("annee"), 1);

          let ordre = (parseInt(numero) + 1).toString().padStart(4, "0");
          let Annee = await this.$localForage.getItem("annee");
          Annee = Annee.toString().slice(2);
          let CodeEcole = this.etablissement.CodeEtab;

          let data = {
            ...payload,
            CodeEleve: CodeEcole + Annee + ordre,
            Annee: await this.$localForage.getItem("annee"),
            update: {
              CodeClasse: this.Intermediaire.CodeClasse,
              newNum: parseInt(numero) + 1,
              action: parseInt(numero) == 0 ? "I" : "U",
              Annee: await this.$localForage.getItem("annee"),
            },
          };
          console.log(data);
          let exec = await db.createEleve(data);

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
          // UPDATE ELEVE
          let exec = await db.updateEleve({...payload, Annee: await this.$localForage.getItem("annee")});
          if (exec) {
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

    async savingEleveProcess() {
      if (this.file) {
        var Photo;

        imageToBase64(URL.createObjectURL(this.file))
          .then((response) => {
            Photo = response;
            let payload = {
              ...this.eleve,
              IDCLASSE: this.Intermediaire.IDCLASSE,
              Photo: Photo,
            };

            this.pullEleve(payload);
          })
          .catch((error) => {
            let payload = {
              ...this.eleve,
              IDCLASSE: this.Intermediaire.IDCLASSE,
              Photo: "",
            };
            this.pullEleve(payload);
          });
      } else {
        let payload = {
          ...this.eleve,
          IDCLASSE: this.Intermediaire.IDCLASSE,
          Photo: "",
        };
        this.pullEleve(payload);
      }
    },

    setTuteur() {
      switch (this.whoisTuteur) {
        case "1":
          {
            this.eleve.NomTuteur = this.eleve.NomPere;
            this.eleve.MobileTuteur = this.eleve.MobilePere;
          }
          break;
        case "2":
          {
            this.eleve.NomTuteur = this.eleve.NomMere;
            this.eleve.MobileTuteur = this.eleve.MobileMere;
          }
          break;
        default:
          break;
      }
    },
    async loadClasse() {
      let filtre = {
        cycle:this.current.cycle,
        Annee:await this.$localForage.getItem("annee"),
        IDCLASSE:0,
        bExamen:''
      }
      this.classeIntermediaire = await db.getClasseIntermediaire(filtre );

      if (this.classeIntermediaire.length == 0) {
        this.canMakeInscription = false;
        var cycle;
        switch (this.current.cycle) {
          case "1":
            cycle = "prescolaire".toUpperCase();
            break;
          case "2":
            cycle = "primaire".toUpperCase();
            break;
          case "3":
            cycle = "college".toUpperCase();
            break;
          case "4":
            cycle = "lycee".toUpperCase();
            break;

          default:
            cycle = "NOT DEFINED";
            break;
        }
        this.$buefy.notification.open({
          message: "Aucune classe trouve dans le cycle : " + cycle,
          type: "is-danger",
          position: "is-top-right",
          hasIcon: true,
          duration: 10000,
          pauseOnHover: true,
          progressBar: true,
        });
      } else {
        this.canMakeInscription = true;
      }
    },

    pickPhoto(e) {
      console.log(e);
      document.getElementById("preview-photo-eleve").src = URL.createObjectURL(
        this.file
      );
    },
    async removeFile() {
      const image = require("../assets/icon.png");
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "placeholder.jpg", { type: blob.type });
      document.getElementById("preview-photo-eleve").src =
        URL.createObjectURL(file);
    },
  },
};
</script>

<style>
.profile-box {
  position: absolute;
  right: 20px;
  top: 180px;
  border: 1px solid rgba(247, 238, 238, 0.113);
  border-radius: 5px;
  width: 200px;
  height: auto;
}

.submit-box {
  position: absolute;
  left: 100px;
  bottom: 70px;
}
</style>
