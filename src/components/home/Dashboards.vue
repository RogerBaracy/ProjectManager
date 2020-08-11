<template>
  <div id="chart">     
     <apexchart  width="500" type="donut" :options="options" :series="series"></apexchart>
     <Artigo></Artigo>
     <ImportTXT></ImportTXT>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import VueApexCharts from 'vue-apexcharts'
import Artigo from "./Artigo.vue"
import ImportTXT from "./ImportTXT.vue"

@Component({
  components: {
    "apexchart": VueApexCharts,
    Artigo,
    ImportTXT
  }
})
export default class Dashboards extends Vue { 
  private options: object = {
    labels: ['InGuru', 'Iqvia', 'MonitorGov', 'Knewin Analytics', 'Entidades Nomeadas']
  };
  private series: Array<number> = [44, 55, 41, 17, 15]
}
</script>