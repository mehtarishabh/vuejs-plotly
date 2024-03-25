<script setup>
import Plotly from '@/components/Plotly.vue'
import PlotlyJS from "plotly.js-dist";
import { ref, onMounted, watchPostEffect } from "vue";
import { getIndiaMapFigures, getStateWiseData } from "@/services/map.js";

// data
let data = ref([]);
let layout = ref({});
let config = ref({ displaylogo: false, scrollZoom: false });
let indiamap = ref(null);
let id = ref(-1);
let stateWise = ref([]);

onMounted(() => {
  getMapFigures();
  newPlot();
  bindings();
});

watchPostEffect(() => {
  stateWise.value.length && PlotlyJS.react("stateWiseId", stateWise.value);
});

function getMapFigures() {
  let figures = getIndiaMapFigures();
  data.value = figures.data;
  layout.value = figures.layout;
}

function newPlot() {
  PlotlyJS.newPlot("mapId", data.value, layout.value, config);
  stateWise.value.length && PlotlyJS.newPlot("stateWiseId", stateWise.value);
}

function bindings() {
  indiamap.value.on("plotly_click", function (data) {
    var pt = (data.points || [])[0];

    if (pt?.location) {
      console.log("plotly_click_location", pt.location);
      id.value = pt.location;
      stateWise.value = getStateWiseData(id.value)
    }
  });
}

// const click = (data) => {
//   var pt = (data.points || [])[0];

//     if (pt?.location) {
//       console.log("plotly_click_location", pt.location);
//       id.value = pt.location;
//       stateWise.value = getStateWiseData(id.value)
//     }
// }
</script>

<template>
  <div class="map">
    
    <!-- <Plotly :data="data" :layout="layout" :config="config"></Plotly> -->

    <div id="mapId" ref="indiamap"></div>

    <div
      id="stateWiseId"
      :style="{ width: '40rem' }"
      v-if="stateWise.length"
    ></div>
    <div :style="{ width: '40rem', 'font-weight': 'bold', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }" v-else>
      No records found!
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .map {
    padding-top: 100px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
  }
}
</style>
