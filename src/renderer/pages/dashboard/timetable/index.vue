<template>
  <div>
    <div class="container-box">
      <p class="text-white px">EMPLOIE DU TEMPS</p>
      <client-only>
        <full-calendar
          style="zoom: 125%; position: absolute; right: 0px; width: 250vw"
          :events="fcEvents"
          @dayClick="(day) => openModal(day)"
          @eventClick="(event) => openEvent(event)"
          :selectable="true"
          locale="fr"
        ></full-calendar>
      </client-only>
    </div>

    <div style="position: absolute; top: 180px; left: 100px">
      <div style="border: 1px solid rgba(200, 200, 200, 0.1)" class="p-4">
        <div class="m-3">
          <p class="text-white mt">Classe</p>
          <select class="select-combo" style="width: 400px" required>
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

        <div class="m-3">
              <p class="text-white mt">Date</p>
              <input
                type="date"
                class="input-text"
                style="width: 400px"
                required
              />
            </div>

            <div class="m-3">
          <p class="text-white mt">Enseignant</p>
          <select class="select-combo" style="width: 400px" required>
            <option
              v-for="enseignant in all_enseignant"
              :key="enseignant.ENSEIGNANT"
              :value="enseignant.ENSEIGNANT"
            >
              {{ enseignant.CodeEnseignant }},
              {{ enseignant.NomEnseignant }}
              {{ enseignant.PrenomEnseignant }}
            </option>
          </select>
        </div>

        <button class="btn-connection ml-3" style="width: 170px">
          Voir l'emploi du temps
        </button>
      </div>

      <div style="border: 1px solid rgba(200, 200, 200, 0.1)" class="p-4 mt-5">
        <div class="m-3">
          <p class="text-white mt">Agent</p>
          <select class="select-combo" style="width: 400px" required>
            <option
              v-for="Agent in all_agent"
              :key="Agent.IDAGENT"
              :value="Agent.IDAGENT"
            >
              {{ Agent.CodeAgent }},
              {{ Agent.NomAgent }}
              {{ Agent.PrenomAgent }}
            </option>
          </select>
        </div>

        <button class="btn-connection ml-3" style="width: 170px">
          Voir l'emploi du temps
        </button>
      </div>
    </div>


    <!-- OPEN MODAL TIME TABLE -->

    <b-modal v-model="openTimeTable">
    {{this.day}}
    </b-modal>
  </div>
</template>

<script>
import db from "../../../plugins/model";
export default {
  layout: "dashboard",
  components: { "full-calendar": require("vue-fullcalendar") },
  data() {
    return {
      config: {
        defaultView: "month",
        editable: true,
        eventRender: function (event, element) {
          console.log(event);
          $buefy.dialog.alert({ message: "ok" });
        },
      },
      fcEvents: [
        {
          title: "JEAN MARTHIN",
          start: "2022-09-11",
          end: "2022-09-12",
          cssClass: "has-background-success",
        },
        {
          title: "MARCOS",
          start: "2022-09-12",
          end: "2022-09-12",
          cssClass: "has-background-success",
        },
        {
          title: "JACK",
          start: "2022-09-12",
          end: "2022-09-12",
          cssClass: "has-background-success",
        },
        {
          title: "JUMS",
          start: "2022-09-12",
          end: "2022-09-12",
          cssClass: "has-background-success",
        },
        {
          title: "JEAN MARTHIN",
          start: "2022-09-11",
          end: "2022-09-19",
          cssClass: "has-background-success",
        },
        {
          title: "MARCOS",
          start: "2022-09-19",
          end: "2022-09-19",
          cssClass: "has-background-success",
        },
        {
          title: "JACK",
          start: "2022-09-19",
          end: "2022-09-19",
          cssClass: "has-background-success",
        },
        {
          title: "JUMS",
          start: "2022-09-19",
          end: "2022-09-19",
          cssClass: "has-background-success",
        },
      ],
      classeIntermediaire: [],
      all_enseignant: [],
      all_agent: [],
      openTimeTable: false,
      day:null
    };
  },
  async fetch() {
    this.classeIntermediaire = await db.getClasseIntermediaire();
    this.all_enseignant = await db.getEnseignant();
    this.all_agent = await db.getAgent();
  },

  methods:{
    openModal(day) {
      this.day = day
      this.openTimeTable = true
    },
    openEvent(event){
      this.day = event
      this.openTimeTable = true
    }
  }
};
</script>

<style>
.comp-full-calendar {
  background-color: transparent !important;
  color: white;
}
div.today {
  background-color: transparent !important;
  border: 1px solid green;
}

div.day-events {
  padding-top: -30px;
}

p.more-link {
  color:blue !important
}
div.header-center {
  position:absolute;
  top:-30px;
  left:15vw;
  width: 50vw;
  height: 20px !important;

}
span.next-month,
span.prev-month {
  font-size:50px
}
</style>


