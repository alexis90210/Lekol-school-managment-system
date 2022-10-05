<template>
  <div>
    <form @submit.prevent="savingEnseignantProcess">
      <!-- tab-inscription-Enseignant-view -->
      <div class="container-box">
        <p class="text-white">
          {{
            !update ? "CREATION DES ENSEIGNANTS" : "MISE A JOUR D'UN ENSEIGNANT"
          }}
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

        <p class="text-white is-size-7">INFORMATION DE L'ENSEIGNANT</p>
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
                v-model="Enseignant.NomEnseignant"
                @input="
                  Enseignant.NomEnseignant =
                    Enseignant.NomEnseignant.toUpperCase()
                "
                class="input-text"
                required
                style="width: 400px"
              />
            </div>

            <div class="m-3">
              <p class="text-white mt">Prenom</p>
              <input
                v-model="Enseignant.PrenomEnseignant"
                required
                @input="
                  Enseignant.PrenomEnseignant
                    ? (Enseignant.PrenomEnseignant =
                        Enseignant.PrenomEnseignant[0].toUpperCase() +
                        Enseignant.PrenomEnseignant.slice(1))
                    : ''
                "
                class="input-text"
                style="width: 400px"
              />
            </div>

            <div class="m-3 pt-5 is-flex">
              <div class="px-3">
                <b-switch
                  v-model="Enseignant.bHomme"
                  true-value="1"
                  false-value="0"
                  type="is-success"
                  >M. Monsieur</b-switch
                >
                <b-switch
                  v-model="Enseignant.bHomme"
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
                v-model="Enseignant.LieuNaissance"
                required
                @input="
                  Enseignant.LieuNaissance
                    ? (Enseignant.LieuNaissance =
                        Enseignant.LieuNaissance[0].toUpperCase() +
                        Enseignant.LieuNaissance.slice(1))
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
                v-model="Enseignant.DateNaissance"
              />
            </div>

            <div class="m-3">
              <p class="text-white mt">Classe</p>
              <select
                v-model="Enseignant.IDCLASSE"
                class="select-combo"
                style="width: 400px"
                required
              >
                <option
                  v-for="classe in classeIntermediaire"
                  :key="classe.IDCLASSE"
                  :value="classe.IDCLASSE"
                >
                  {{ classe.CodeClasseIntermediaire }}
                  {{ classe.NomNom }}
                </option>
              </select>
            </div>
          </div>
          <div class="is-flex">
            <div class="mt m-3">
              <p class="text-white mt">Mobile</p>
              <input
                v-model="Enseignant.MobileEnseignant"
                @input="
                  Enseignant.MobileEnseignant =
                    Enseignant.MobileEnseignant.toUpperCase()
                "
                class="input-text"
                required
                style="width: 400px"
              />
            </div>
            <div class="mt m-3">
              <p class="text-white mt">Adresse</p>
              <input
                v-model="Enseignant.AdresseEnseignant"
                @input="
                  Enseignant.AdresseEnseignant =
                    Enseignant.AdresseEnseignant.toUpperCase()
                "
                class="input-text"
                required
                style="width: 400px"
              />
            </div>

            <div class="mt m-3">
              <p class="text-white mt">Matiere</p>
              <select
                v-model="Enseignant.IDMATIERE_GEN"
                class="select-combo"
                style="width: 400px"
                required
              >
                <option
                  v-for="matiere in matiereGenerale"
                  :key="matiere.IDMATIERE_GEN"
                  :value="matiere.IDMATIERE_GEN"
                >
                  {{ matiere.CodeMatiere }}
                  {{ matiere.NomMatiere }}
                </option>
              </select>
            </div>
          </div>
        </fieldset>

        <p class="text-white is-size-7 mt-6">
          IDENTIFIANT DE CONNEXION DE L'ENSEIGNANT
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
            <div class="m-3" v-if="update">
              <p class="text-white mt">Login</p>
              <input
                v-model="Enseignant.LoginEnseignant"
                required
                readonly
                class="input-text"
                style="width: 400px"
              />
            </div>

            <div class="m-3">
              <p class="text-white mt">Password</p>
              <input
                v-model="Enseignant.PasswordEnseignant"
                required
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
          id="preview-photo-Enseignant"
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

      <div class="submit-box-enseignant" v-if="canMakeInscription">
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
      matiereGenerale: [],
      file: null,
      Enseignant: {
        bHomme: "",
        NomEnseignant: "",
        PrenomEnseignant: "",
        DateNaissance: "",
        LieuNaissance: "",
        MobileEnseignant: "",
        AdresseEnseignant: "",
        LoginEnseignant: "",
        PasswordEnseignant: "",
        IDMATIERE_GEN: "",
        IDCLASSE: "",
        Photo: "",
      },
      etablissement: {},
      classeIntermediaire: [],
      canMakeInscription: false,
      current: {
        cycle: 0,
      },
      cycle: {
        prescolaire: 0,
        primaire: 0,
        college: 0,
        lycee: 0,
      },
    };
  },
  async mounted() {
    this.matiereGenerale = await db.getMatiereGenerale();
    this.etablissement = await db.getEtabInfo();

    this.cycle.prescolaire = this.etablissement.bPreScolaire;
    this.cycle.primaire = this.etablissement.bPrimaire;
    this.cycle.college = this.etablissement.bCollege;
    this.cycle.lycee = this.etablissement.bLycee;

    /// COMMING FROM UPDATE PANEL

    if (this.update) {
      this.current.cycle = (
        await db.getClasseIntermediaire({
          cycle: 0,
          IDCLASSE: this.update.IDCLASSE,
          Annee: await this.$localForage.getItem("annee"),
        })
      )[0].IDCYCLE;
      
      this.canMakeInscription = true

      this.Enseignant = {
        ...this.update,
        PHOTO: this.update.Photo,
      };

      this.classeIntermediaire = await db.getClasseIntermediaire({
        cycle: this.current.cycle,
        IDCLASSE: 0,
        Annee: await this.$localForage.getItem("annee"),
      });

     

      this.Enseignant.Photo
        ? (document.getElementById("preview-photo-Enseignant").src =
            "data:image/png;base64, " + this.Enseignant.Photo)
        : "";
    }
  },
  methods: {
    async loadClasse() {
      if (await this.$localForage.getItem("annee")) {
        this.classeIntermediaire = await db.getClasseIntermediaire({
          cycle: this.current.cycle,
          IDCLASSE: 0,
          Annee: await this.$localForage.getItem("annee"),
        });
      }

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
    clearField() {
      this.Enseignant = {};
      this.removeFile();
    },

    async pullEnseignant(payload) {
      if (this.Enseignant.bHomme) {
        if (!this.update) {
          let numero = await db.getMatricule(
            await this.$localForage.getItem("annee"),
            2
          );

          let ordre = (parseInt(numero) + 1).toString().padStart(4, "0");
          let Annee = await this.$localForage.getItem("annee");
          Annee = Annee.toString().slice(2);
          let CodeEcole = this.etablissement.CodeEtab;

          let data = {
            ...payload,
            CodeEnseignant: CodeEcole + Annee + ordre + "E",
            LoginEnseignant: CodeEcole + Annee + ordre + "E",
            Annee: await this.$localForage.getItem("annee"),
            update: {
              newNum: parseInt(numero) + 1,
              action: parseInt(numero) == 0 ? "I" : "U",
              Annee: await this.$localForage.getItem("annee"),
            },
          };
          console.log(data);
          let exec = await db.createEnseignant(data);

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
          // UPDATE Enseignant
          let exec = await db.updateEnseignant({
            ...payload,
            Annee: await this.$localForage.getItem("annee"),
          });
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

    async savingEnseignantProcess() {
      if (this.file) {
        var Photo;

        imageToBase64(URL.createObjectURL(this.file))
          .then((response) => {
            Photo = response;
            let payload = {
              ...this.Enseignant,
              Photo: Photo,
            };

            this.pullEnseignant(payload);
          })
          .catch((error) => {
            let payload = {
              ...this.Enseignant,
              Photo: "",
            };
            this.pullEnseignant(payload);
          });
      } else {
        let payload = {
          ...this.Enseignant,
          Photo: "",
        };
        this.pullEnseignant(payload);
      }
    },

    pickPhoto(e) {
      console.log(e);
      document.getElementById("preview-photo-Enseignant").src =
        URL.createObjectURL(this.file);
    },
    async removeFile() {
      const image = require("../assets/icon.png");
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "placeholder.jpg", { type: blob.type });
      document.getElementById("preview-photo-Enseignant").src =
        URL.createObjectURL(file);
    },
  },
};
</script>

<style>
.submit-box-enseignant {
  position: absolute;
  left: 100px;
  bottom: 170px;
}
</style>
