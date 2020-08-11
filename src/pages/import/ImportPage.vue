<template>
  <q-page padding>
    <ImportCSV></ImportCSV>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ImportCSV from 'components/import/ImportCSV.vue'
@Component({
  components: {
    ImportCSV,
  }
})
export default class ImportPage extends Vue {
}
</script>
