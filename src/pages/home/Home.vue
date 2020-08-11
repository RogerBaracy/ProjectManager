<template>
  <q-page padding>
   <DashBoards></DashBoards>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import DashBoards from 'components/home/Dashboards.vue';
@Component({
  components:{
    DashBoards
  }
})
export default class Home extends Vue {
}
</script>
