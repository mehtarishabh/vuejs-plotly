<template>
  <div class="about">
    <!-- <Plotly :data="data" :layout="layout" :config="config" :indiamap="indiamap"></Plotly> -->

    <div id="divId" ref="indiamap"></div>
  </div>
</template>

<script setup>
// imports
// import Plotly from '@/components/Plotly.vue'
import Plotly from 'plotly.js-dist'
import { ref, onMounted } from 'vue'
import { getIndiaMapFigures } from '@/utils/d3.js'

// data
let data = ref([])
let layout = ref({})
let config = ref({ displaylogo: false })
let indiamap = ref(null)

onMounted(() => {
  // getUSAMapFigures().then((figures) => {
  //     console.log("figures", figures)
  //     data.value = figures.data;
  //     layout.value = figures.layout
  //     // newPlot()
  // })
  let figures = getIndiaMapFigures()
  data.value = figures.data
  layout.value = figures.layout

  Plotly.newPlot('divId', data.value, layout.value, config)
  indiamap.value.on('plotly_click', function (data) {
    console.log('plotly_click', data)
    var pt = (data.points || [])[0]

    if (pt?.location) {
      console.log('plotly_click_location', pt.location)
    }
  })
})

// const normal_click = (event) => {
//   console.log("click 2", event);
//   var pt = (event.points || [])[0]

//   if(pt?.location) {
//     console.log("plotly_click_location", pt.location);
//   }
// }

const plotly_click = (data) => {
  console.log('plotly_click', data)
  var pt = (data.points || [])[0]

  if (pt?.location) {
    console.log('plotly_click_location', pt.location)
  }
}

// function newPlot() {
//   Plotly.newPlot(this.divId, data, layout, config);
//   this.$ref.container.on('plotly_click', clickFxn);
// }
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    padding-top: 100px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }
}
</style>
