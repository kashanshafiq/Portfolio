<script setup lang="ts">
import PageIntro from '../components/PageIntro.vue'
import { community } from '../content/recognition'
</script>
<template><div class="shell page-body"><PageIntro eyebrow="Volunteering / Community & Leadership" title="Engineering begins with people." description="Learning from others, sharing what I know, and contributing beyond the classroom."/><div class="record-list"><article v-for="(item,index) in community" :key="item.title" class="record"><p class="eyebrow">0{{ index+1 }} / Contribution</p><div><h2>{{ item.title }}</h2><p style="margin-top:16px">{{ item.detail }}</p></div></article></div></div></template>
