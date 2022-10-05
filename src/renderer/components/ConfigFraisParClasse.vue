<template>
  <div>
    <b-loading
        v-model="isLoading"
        is-full-page
        :can-cancel="false"
      ></b-loading>
    <div class="onglet-view" style="width: 1200px;height: 90vh !important; ">

            <p class="">Configuration des Frais par niveau</p>
            <div class="box-content">
              <div class="align-row" style="gap: 20px">
                <div class="mt">
                  <p class="text-white mt">Reference de la classe</p>
                  <select
                    v-model="Frais.classe"
                    class="select-combo"
                    style="width: 500px"
                  >
                    <option
                      v-for="(e, i) in classeGenerale"
                      :key="i"
                      :value="e"
                    >
                      {{ e.CodeClasse }} {{ e.NomClasse }}
                    </option>
                  </select>
                </div>

                <div class="mt">
                    <p class="text-white mt">Montant </p>
                    <input
                      class="input-text"
                    style="width: 200px"
                      v-model="Frais.Montant"
                    />
                  </div>                   
                 

                  <div class="mt">
                    <p class="text-white mt"> </p>
                    <button
                  class="btn-connection"
                  id="create-reference-Frais"
                  style="width: 150px;"
                  @click="saveFraisParClasse"
                  v-if=" copie.length > 0"
                >
                  Creer les frais 
                </button>
                  </div>
    
              </div>

             
            </div>

            <div style="height: 50vh">
          <b-table
            :data="FraisParClasse"
            paginated
            type="is-info"
            class="mt-4"
            :mobile-cards="false"
            per-page="8"
          >

            <b-table-column
              field="CodeFrais"
              searchable
              label="Code Frais"
              v-slot="props"
            >
              {{ props.row.CodeFrais }}
            </b-table-column>

            <b-table-column
              field="NomFrais"
              searchable
              label="Nom Frais"
              v-slot="props"
            >
              {{ props.row.NomFrais }}
            </b-table-column>

            <b-table-column
              field="bOcassionel"
              searchable
              label="Ocassionel"
              v-slot="props"
            >
            {{ props.row.bOcassionel == 1 ? "Oui" : "Non" }}
            </b-table-column>

            

            <b-table-column
              field="Montant"
              searchable
              label="Montant"
              v-slot="props"
            >
            {{ new Intl.NumberFormat().format(props.row.Montant ?? 0 )}}
            </b-table-column>

            <b-table-column
              field="MontantReduction"
              searchable
              label="Montant de Reduction"
              v-slot="props"
            >
            {{ new Intl.NumberFormat().format(props.row.MontantReductio ?? 0 )}}
            </b-table-column>

            <b-table-column
              field="MontantMajoration"
              searchable
              label="Montant de Majoration"
              v-slot="props"
            >
            {{ new Intl.NumberFormat().format(props.row.MontantMajoration ?? 0) }}
            </b-table-column>

            <b-table-column>
              <div style="width: 200px; text-align: right" class="actionBtn">
                <b-button
                  icon-left="delete"
                  type="is-danger"
                  outlined
                  size="is-small"
                  class="mx-2"
                ></b-button>
                <b-button
                  icon-left="book-edit"
                  type="is-info"
                  outlined
                  size="is-small"
                ></b-button>
              </div>
            </b-table-column>
          </b-table>
        </div>
        

          </div>
  </div>
</template>

<script>
import db from '../plugins/model'

export default {
    data(){
        return {
            FraisParClasse:[],
            Frais:{
                Montant:'',
                classe:''
            },
            classeGenerale: [],
            etablissement:{},
            isLoading:false,
            copie:''       
        }
    },
    async fetch() {
    this.classeGenerale = await db.getClasseGenerale();
    this.FraisParClasse = await db.getFraisParClasse();
    this.etablissement = await db.getEtabInfo();

    if(await this.$localForage.getItem("copie")){
        this.copie = await this.$localForage.getItem("copie")
    }
       
 },
    methods:{
        async saveFraisParClasse() {

            this.copie.map( frais => {
                db.createFraisParClasse({...frais , Montant:this.Frais.Montant , ...this.Frais.classe  })
            })

        }
    }
}
</script>

<style>

</style>