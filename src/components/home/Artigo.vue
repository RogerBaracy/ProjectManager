<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 250px">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <div v-for="(a, index) in artigosLocal" v-bind:key="index">
            <q-tab v-bind:name="a.titulo" v-bind:label="a.titulo" />
          </div>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel v-for="(a, index) in artigosLocal" v-bind:key="index" v-bind:name="a.titulo">
            <div class="text-h4 q-mb-md">{{a.titulo}}</div>
            <p>{{a.conteudo}}</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script >
import { artigo1 } from "./artigo1";
import { artigo2 } from "./artigo2";
import { artigo3 } from "./artigo3";
import { artigo4 } from "./artigo4";
import { artigo5 } from "./artigo5";
export default {
  name: "Artigo",
  data() {
    return {
      artigosLocal: [artigo1, artigo2, artigo3, artigo4, artigo5],
      tab: artigo1.titulo,
      splitterModel: 20,
    };
  },
};
</script>