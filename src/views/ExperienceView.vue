<script setup lang="ts">
import PageIntro from '../components/PageIntro.vue'
import { experience } from '../content/experience'
</script>
<template><div class="shell page-body"><PageIntro eyebrow="Experience / Professional practice" title="From drawings to real conditions." description="Experience across BIM modelling, construction workflows and site engineering."/><div class="record-list"><article v-for="item in experience" :key="item.organization" class="record"><p class="eyebrow">{{ item.period }}</p><div><h2>{{ item.organization }}</h2><h3>{{ item.role }}</h3><p>{{ item.summary }}</p><details><summary>Responsibilities & learning</summary><ul><li v-for="detail in item.details" :key="detail">{{ detail }}</li></ul></details></div></article></div></div></template>
