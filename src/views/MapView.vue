<script setup>
// import Plotly from '@/components/Plotly.vue'
import Plotly from 'plotly.js-dist'
import { ref, onMounted } from 'vue'
import { getIndiaMapFigures } from '@/services/map.js'

// data
let data = ref([])
let layout = ref({})
let config = ref({ displaylogo: false })
let indiamap = ref(null)

onMounted(() => {
  getMapFigures()
  newPlot()
  bindings()
})

function getMapFigures() {
  // getUSAMapFigures().then((figures) => {
  //     console.log("figures", figures)
  //     data.value = figures.data;
  //     layout.value = figures.layout
  // })
  let figures = getIndiaMapFigures()
  data.value = figures.data
  layout.value = figures.layout

}

function newPlot() {
  Plotly.newPlot('mapId', data.value, layout.value, config)
}

function bindings() {
  indiamap.value.on('plotly_click', function (data) {
    var pt = (data.points || [])[0]

    if (pt?.location) {
      console.log('plotly_click_location', pt.location)
    }
  })
}
</script>

<template>
  <div class="map">
    <!-- <Plotly :data="data" :layout="layout" :config="config"></Plotly> -->

    <div id="mapId" ref="indiamap"></div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .map {
    padding-top: 100px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }
}
</style>
