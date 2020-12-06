<template>
  <div>
    <q-form>
      <input ref="file" type="file" label="import csv" v-on:change="loadFile"/>
      <q-btn label="Enviar Dados"  color="primary"></q-btn>
    </q-form>
    <div v-if="rows.length > 0" class="q-pa-md">
      <q-table
        title="Relatório Geral"
        :data="rows"
        :columns="columns"
        row-key="name"
        :pagination.sync="pagination"
        hide-pagination        
        binary-state-sort
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="ID" :props="props">
              <q-badge color="primary" v-text="props.row.id"> </q-badge>
            </q-td>
            <q-td key="Work Item Type" :props="props">
              <q-badge color="primary" v-text="props.row.work_type"> </q-badge>
              <q-popup-edit v-model="props.row.work_type">
                <q-input v-model="props.row.work_type" dense autofocus counter />
              </q-popup-edit>               
            </q-td>
            <q-td key="Area Path" :props="props">
              <q-badge color="primary" v-text="props.row.area"> </q-badge> 
              <q-popup-edit v-model="props.row.area">
                <q-input v-model="props.row.area" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="Title" :props="props">
              <q-badge color="primary" v-text="props.row.title"> </q-badge> 
              <q-popup-edit v-model="props.row.title">
                <q-input v-model="props.row.title" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="Assigned To" :props="props">
              <q-badge color="primary" v-text="props.row.assigned_to"> </q-badge> 
              <q-popup-edit v-model="props.row.assigned_to">
                <q-input v-model="props.row.assigned_to" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="State" :props="props">
              <q-badge color="primary" v-text="props.row.state"> </q-badge> 
              <q-popup-edit v-model="props.row.state">
                <q-input v-model="props.row.state" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="Estimated Work" :props="props">
              <q-badge color="primary" v-text="props.row.estimated_work"> </q-badge> 
              <q-popup-edit v-model="props.row.estimated_work" buttons>
                <q-input min="1" type="number" v-model="props.row.estimated_work" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="Executed Work" :props="props">
              <q-badge color="primary" v-text="props.row.executed_work"> </q-badge> 
              <q-popup-edit v-model="props.row.executed_work" buttons>
                <q-input min="1" type="number" v-model="props.row.executed_work" dense autofocus counter />
              </q-popup-edit>
            </q-td>
          </q-tr>  
        </template>
      </q-table>

      <div class="row justify-center q-mt-md">
        <q-pagination v-model="pagination.page" color="grey-8" :max="pagesNumber" size="sm" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from "vue-property-decorator";
import Papa from "papaparse";
@Component
export default class ImportCSV extends Vue {
  private pagination = {
    sortBy: "desc",
    descending: false,
    page: 1,
    rowsPerPage: 10,
  };
  private columns = [
    { name: "ID", label: "ID", field: "id", align: "left", sortable: true },
    {
      name: "Work Item Type",
      label: "Tipo",
      field: "work_type",
      align: "left",
      sortable: true,
    },
    {
      name: "Area Path",
      label: "Área",
      field: "area",
      align: "left",
      sortable: true,
    },
    {
      name: "Title",
      label: "Título",
      field: "title",
      align: "left",
      sortable: true,
    },
    {
      name: "Assigned To",
      label: "Responsavel",
      field: "assigned_to",
      align: "left",
      sortable: true,
    },
    {
      name: "State",
      label: "Status",
      field: "state",
      align: "left",
      sortable: true,
    },
    {
      name: "Estimated Work",
      label: "Esforço estimado",
      field: "estimated_work",
      align: "left",
      sortable: true,
    },
    {
      name: "Executed Work",
      label: "Esforço executado",
      field: "executed_work",
      align: "left",
      sortable: true,
    },
  ];
  private rows : Array<any> = [];

  private loadFile() {
    // @ts-ignore
    Papa.parse(this.$refs.file.files[0], {
      download: true,
      header: false,
      complete: (results) => {
        results.data.forEach((d, index) => {
          if (index != 0)
            this.rows.push({
              // @ts-ignore
              id: d[0],
              // @ts-ignore
              work_type: d[1],
              // @ts-ignore
              area: d[2],
              // @ts-ignore
              title: d[3],
              // @ts-ignore
              assigned_to: d[4],
              // @ts-ignore
              state: d[5],
              // @ts-ignore
              estimated_work: d[6],
              // @ts-ignore
              executed_work: d[7],
            });
        });        
      },
    });
  }
  get pagesNumber() {
    return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
  }
}
</script>
