<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../content/projects'
import PageIntro from '../components/PageIntro.vue'
import ProjectDiagram from '../components/ProjectDiagram.vue'
import NotFoundView from './NotFoundView.vue'
const route = useRoute()
const project = computed(() => projects.find(p => p.slug === route.params.slug))
watchEffect(() => { document.title = `${project.value?.title || 'Project not found'} — Kashan Shafiq` })
</script>
<template><div v-if="project" class="shell page-body"><PageIntro :eyebrow="`Work / ${project.category}`" :title="project.title" :description="project.summary"/><div class="two-column"><article class="prose"><h2>The problem</h2><p>{{ project.context }}</p><h2>Method & scope</h2><ul><li v-for="item in project.scope" :key="item">{{ item }}</li></ul><h2>The outcome</h2><p>{{ project.outcome }}</p><h2>Contribution</h2><p>{{ project.contribution }}</p></article><aside class="detail-visual"><ProjectDiagram :kind="project.diagram" :label="`${project.title} illustrative schematic`"/><dl class="metadata"><div><dt>Tools</dt><dd>{{ project.tools.join(' · ') }}</dd></div><div><dt>Context</dt><dd>Academic project</dd></div><div><dt>Discipline</dt><dd>{{ project.category }}</dd></div></dl><p class="note">The diagram is a schematic illustration. It does not display calculated results from this project.</p></aside></div><div class="link-row"><RouterLink class="text-link" to="/work">Back to all work <span aria-hidden="true">↗</span></RouterLink><RouterLink class="text-link" to="/contact">Discuss this project <span aria-hidden="true">↗</span></RouterLink></div></div><NotFoundView v-else /></template>
