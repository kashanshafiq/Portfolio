<script setup lang="ts">
import { computed, ref } from 'vue'
import PageIntro from '../components/PageIntro.vue'
import ProjectDiagram from '../components/ProjectDiagram.vue'
import { projects } from '../content/projects'

const search = ref('')

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return projects
  return projects.filter(p =>
    `${p.title} ${p.summary} ${p.tools.join(' ')} ${p.category}`.toLowerCase().includes(q)
  )
})

function reset() {
  search.value = ''
}
</script>

<template>
  <div class="shell page-body">
    <PageIntro
      eyebrow="Featured Projects / Engineering Case Studies"
      title="Ideas, put to work."
      description="Selected engineering projects across structural design, building quantity estimation, and construction planning: the design problem, the computational method, and the technical outcomes."
    />

    <div class="projects-toolbar">
      <label class="search-field search-full">
        <span class="sr-only">Search projects</span>
        <input
          v-model="search"
          type="search"
          placeholder="Search projects by title, code or software tool (e.g. ETABS, ACI, Excel, Primavera)..."
        />
      </label>
    </div>

    <p class="result-count" aria-live="polite">
      {{ filtered.length }} {{ filtered.length === 1 ? 'project' : 'projects' }}
    </p>

    <div v-if="filtered.length" class="project-grid">
      <RouterLink
        v-for="project in filtered"
        :key="project.slug"
        :to="`/projects/${project.slug}`"
        class="project-card"
      >
        <ProjectDiagram :kind="project.diagram" :label="`${project.title} illustrative schematic`" />
        <p class="eyebrow">{{ project.category }} / {{ project.tools.join(' · ') }}</p>
        <h2>{{ project.title }}</h2>
        <p>{{ project.summary }}</p>
        <span class="card-link">View case study <span aria-hidden="true">↗</span></span>
      </RouterLink>
    </div>

    <div v-else class="empty-state">
      <h2>No matching projects.</h2>
      <p>Try searching for another keyword, software tool, or design standard.</p>
      <button class="button" @click="reset">Clear search</button>
    </div>

    <div class="link-row" style="margin-top: 40px;">
      <RouterLink class="text-link" to="/experience">
        Work Experience <span aria-hidden="true">↗</span>
      </RouterLink>
      <RouterLink class="text-link" to="/research">
        Research Work <span aria-hidden="true">↗</span>
      </RouterLink>
      <RouterLink class="text-link" to="/#contact">
        Discuss a project <span aria-hidden="true">↗</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.projects-toolbar {
  margin-top: 36px;
  margin-bottom: 20px;
}

.search-full {
  display: block;
  width: 100%;
}

.search-full input {
  width: 100%;
  background: var(--surface-input);
  border: 1px solid var(--line);
  color: var(--text);
  padding: 12px 18px;
  min-height: 44px;
  border-radius: 2px;
  font-size: 16px;
  font-family: inherit;
  transition: border-color 160ms ease;
}

.search-full input:focus {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  border-color: var(--accent);
}

.search-full input::placeholder {
  color: rgba(181, 195, 191, 0.6);
}
</style>
