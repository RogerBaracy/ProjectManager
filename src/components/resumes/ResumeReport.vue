
<template>
  <div class="q-pa-md">
    <q-table title="Relatório de Resumo" :data="data" :columns="columns" color="primary" row-key="name" separator="horizontal">
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
      <template v-slot:header="props">
        <q-tr style="text-align: left;">
          <q-th v-for="(col, index) in props.cols" :key="index"
          class="text-blue-9"
          >{{col.label}}</q-th>
          <slot name="custom-header"></slot>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr>
          <q-td v-for="(col, index) in props.cols" :key="index">
            <div v-if="col.name === 'Projetos'">
              <div v-for="(project, index) in props.row.projects" v-bind:key="index">
                <span>{{project.name}}</span>                             
              </div>
            </div>
            <div v-if="col.name === 'Horas'">
              <div v-for="(project, index) in props.row.projects" v-bind:key="index">                
                <span>{{project.hours}}</span>                
              </div>
            </div>
            <div v-if="col.name !== 'Projetos' && col.name !== 'Horas'">{{ col.value }}</div>
          </q-td>
        </q-tr>
      </template>     
    </q-table>
  </div>
</template>



<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { exportFile } from "quasar";
// @ts-ignore
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}
@Component
export default class ResumeReport extends Vue {
  private columns = [
    {
      name: "Desenvolvedor",
      label: "Desenvolvedor",
      align: "left",
      // @ts-ignore
      field: row => row.developer,
      sortable: true
    },
    {
      name: "Projetos",
      label: "Projetos",
      align: "left",
      // @ts-ignore
      field: row => row.projects,
      sortable: true
    },
    {
      name: "Horas",
      label: "Horas",
      align: "left",
      // @ts-ignore
      field: row => row.projects,
      sortable: true
    },
    {
      name: "Total",
      label: "Total",
      align: "left",
      // @ts-ignore
      field: row => row.total, 
      sortable: true
    }
  ];
  private data = [
    {
      developer: "Roger",
      projects: [
        {
          name: "Inguru",
          hours: 70
        },
        {
          name: "Knewin Analytics",
          hours: 8
        }
      ],
      total: 78
    },
    {
      developer: "Samy",
      projects: [
        {
          name: "Eneva",
          hours: 70
        },
        {
          name: "Infra",
          hours: 8
        },
        {
          name: "Itau",
          hours: 8
        }
      ],
      total: 86
    },
    {
      developer: "Lucas",
      projects: [
        {
          name: "Secov",
          hours: 50
        },
        {
          name: "Named Entities",
          hours: 30
        }
      ],
      total: 80
    },
    {
      developer: "Arthur",
      projects: [
        {
          name: "Inguru",
          hours: 70
        },
        {
          name: "Colab IO",
          hours: 12
        }
      ],
      total: 82
    },
    {
      developer: "Cristiano",
      projects: [
        {
          name: "Named Entities",
          hours: 70
        },        
      ],
      total: 70
    }
  ];

  private exportTable() {
    // naive encoding to csv format
    // @ts-ignore
    const content = [this.columns.map(col => wrapCsvValue(col.label))]
      .concat(
        this.data.map(row =>
          this.columns
            .map(col =>
              wrapCsvValue(
                typeof col.field === "function"
                  ? col.field(row)
                  // @ts-ignore
                  : row[col.field === void 0 ? col.name : col.field],
                  // @ts-ignore
                col.format
              )
            )
            .join(",")
        )
      )
      .join("\r\n");

    const status = exportFile("table-export.csv", content, "text/csv");

    if (status !== true) {
      this.$q.notify({
        message: "Browser denied file download...",
        color: "negative",
        icon: "warning"
      });
    }
  }
}
</script>