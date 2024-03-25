<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { VuePlotly } from "vue3-plotly";
// import { ref, onMounted, watchPostEffect } from "vue";

defineProps({
  data: Array,
  layout: Object,
  config: Object,
});

// let indiamap = ref(null);

// onMounted(() => {
//   bindings();
// });

// function bindings() {
//   indiamap.value.on("plotly_click", function (data) {
//     var pt = (data.points || [])[0];

//     if (pt?.location) {
//       console.log("plotly_click_location", pt.location);
//       id.value = pt.location;
//       stateWise.value = getStateWiseData(id.value)
//     }
//   });
// }

</script>
<template>
  <VuePlotly :data="data" :layout="layout" :config="config" v-if="data.length > 0"></VuePlotly>
</template>
