<script setup lang="ts">
import { computed, ref } from 'vue'
import PageIntro from '../components/PageIntro.vue'
import { recognition } from '../content/recognition'
const selected = ref('All')
const filters = ['All','Award','Scholarship','Course','CPD']
const entries = computed(() => recognition.filter(x => selected.value==='All' || x.type===selected.value))
</script>
<template><div class="shell page-body"><PageIntro eyebrow="Recognition / Continued learning" title="A foundation, kept growing." description="Selected academic distinctions, technical learning and professional development."/><div class="filter-group" aria-label="Filter recognition"><button v-for="item in filters" :key="item" class="filter-button" :aria-pressed="selected===item" @click="selected=item">{{ item }}</button></div><p class="result-count" aria-live="polite" style="margin-top:20px">{{ entries.length }} entries</p><div class="record-list"><article v-for="item in entries" :key="item.title" class="record"><p class="eyebrow">{{ item.type }}</p><div><h2>{{ item.title }}</h2><p style="margin-top:15px">{{ item.detail }}</p></div></article></div></div></template>
