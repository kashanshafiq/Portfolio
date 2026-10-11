<script setup lang="ts">
import { computed, ref } from 'vue'
import PageIntro from '../components/PageIntro.vue'
import ProjectDiagram from '../components/ProjectDiagram.vue'
import { projects } from '../content/projects'
const category = ref('All')
const search = ref('')
const categories = ['All', 'Structures', 'Water', 'Planning', 'Transportation']
const filtered = computed(() => projects.filter(p => (category.value === 'All' || p.category === category.value) && `${p.title} ${p.summary} ${p.tools.join(' ')}`.toLowerCase().includes(search.value.trim().toLowerCase())))
function reset() { category.value = 'All'; search.value = '' }
</script>
<template><div class="shell page-body"><PageIntro eyebrow="Work / Project archive" title="Ideas, put to work." description="A collection of academic engineering projects: the problem, the method, and what the process revealed."/><div class="filter-bar"><div class="filter-group" aria-label="Filter projects by discipline"><button v-for="item in categories" :key="item" class="filter-button" :aria-pressed="category===item" @click="category=item">{{ item }}</button></div><label class="search-field"><span class="sr-only">Search projects</span><input v-model="search" type="search" placeholder="Search projects or tools" /></label></div><p class="result-count" aria-live="polite">{{ filtered.length }} {{ filtered.length===1 ? 'project' : 'projects' }}</p><div v-if="filtered.length" class="project-grid"><RouterLink v-for="project in filtered" :key="project.slug" :to="`/projects/${project.slug}`" class="project-card"><ProjectDiagram :kind="project.diagram" :label="`${project.title} illustrative schematic`"/><p class="eyebrow">{{ project.category }} / {{ project.tools.join(' + ') }}</p><h2>{{ project.title }}</h2><p>{{ project.summary }}</p><span class="card-link">View case study <span aria-hidden="true">↗</span></span></RouterLink></div><div v-else class="empty-state"><h2>No matching projects.</h2><p>Try another discipline, project title or tool.</p><button class="button" @click="reset">Clear filters</button></div><div class="link-row"><RouterLink class="text-link" to="/experience">Professional experience <span aria-hidden="true">↗</span></RouterLink><RouterLink class="text-link" to="/research">Research & preprints <span aria-hidden="true">↗</span></RouterLink></div></div></template>
