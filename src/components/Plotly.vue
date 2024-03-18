<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { VuePlotly } from 'vue3-plotly'

defineProps({
  data: Array,
  layout: Object,
  config: Object,
})

</script>
<template>
  <VuePlotly :data="data" :layout="layout" :config="config" v-if="data.length > 0"></VuePlotly>
</template>
