<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { VuePlotly } from 'vue3-plotly'
import { onMounted, ref } from 'vue'

defineProps({
  data: Array,
  layout: Object,
  config: Object,
})

let indiamap = ref(null)

const plotly_click = (data) => {
  console.log("plotly_click", data);
  var pt = (data.points || [])[0]

  if(pt?.location) {
    console.log("plotly_click_location", pt.location);
  }
}

onMounted(() => {
  indiamap.value.on('plotly_click', function (data) {
    console.log('plotly_click', data)
    var pt = (data.points || [])[0]

    if (pt?.location) {
      console.log('plotly_click_location', pt.location)
    }
  })
})

</script>
<template>
  <VuePlotly :data="data" :layout="layout" :config="config" v-if="data.length > 0" ref="indiamap"></VuePlotly>
</template>
