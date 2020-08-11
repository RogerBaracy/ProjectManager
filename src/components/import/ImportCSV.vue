<template>
  <div>
    <q-form>
      <input ref="file" type="file" label="import csv" />
      <q-btn label="Carregar Dados" v-on:click="loadFile"></q-btn>
    </q-form>
    <div v-if="rows.length > 0" class="q-pa-md">      
      <vue-good-table
        v-bind:columns="columns"
        v-bind:rows="rows"
        v-bind:fixed-header="true"
        v-bind:line-numbers="true"
        v-bind:search-options="{
          enabled: true
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from "vue-property-decorator";
import Papa from "papaparse";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
@Component({
  components: {
    VueGoodTable,
  },
})
export default class ImportCSV extends Vue {  
  private columns = [
    { name: "ID", label: "ID", field: "id" },
    {
      name: "Work Item Type",
      label: "Tipo",
      field: "work_type"      
    },
    {
      name: "Area Path",
      label: "Área",
      field: "area"      
    },
    {
      name: "Title",
      label: "Título",
      field: "title",     
    },
    {
      name: "Assigned To",
      label: "Guerreiro",
      field: "assigned_to"
    },
    {
      name: "State",
      label: "Status",
      field: "state"
    },
    {
      name: "Estimated Work",
      label: "Esforço estimado",
      field: "estimated_work"
    },
    {
      name: "Executed Work",
      label: "Esforço executado",
      field: "executed_work"
    },
  ];
  private rows = [];
  
  private loadFile() {
    var cols: Array<any> = [];
    var lines: Array<any> = [];
    // @ts-ignore
    Papa.parse(this.$refs.file.files[0], {
      download: true,
      header: false,
      complete: (results) => {
        results.data.map((data, index) => {
          if (index != 0)
            lines.push({
              // @ts-ignore
              id: data[0],
              // @ts-ignore
              work_type: data[1],
              // @ts-ignore
              area: data[2],
              // @ts-ignore
              title: data[3],
              // @ts-ignore
              assigned_to: data[4],
              // @ts-ignore
              state: data[5],
              // @ts-ignore
              estimated_work: data[6],
              // @ts-ignore
              executed_work: data[7],
            });
        });
      },
    });
    // @ts-ignore
    this.rows = lines;
  }
}
</script>
