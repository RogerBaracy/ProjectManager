<template>
  <div>
    <input type="file" accept="text/plain" v-on:change="openFile" />
    <br />
    <p>{{texto}}</p>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Model, Watch } from "vue-property-decorator";

@Component
export default class ImportTXT extends Vue {
  private texto = "";
  // @ts-ignore
  openFile(event) {
    let input = event.target;

    let reader = new FileReader();
   
    reader.onload =  () => {
     let text = reader.result;
     console.log(text)  
     // @ts-ignore
     this.texto = text    
    };
    // @ts-ignore
    reader.readAsText(input.files[0]);

    
  }
}
</script>
