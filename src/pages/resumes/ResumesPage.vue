<template>
  <q-page padding>
    <ResumeReport></ResumeReport>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ResumeReport from "components/resumes/ResumeReport.vue";
@Component({
  components: {
    ResumeReport
  }
})
export default class ResumesPage extends Vue {}
</script>
