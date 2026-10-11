<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { experience } from '../content/experience'
import PageIntro from '../components/PageIntro.vue'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()
const item = computed(() => experience.find(e => e.slug === route.params.slug))

const currentIndex = computed(() => experience.findIndex(e => e.slug === route.params.slug))
const prevExperience = computed(() => (currentIndex.value > 0 ? experience[currentIndex.value - 1] : null))
const nextExperience = computed(() => (currentIndex.value >= 0 && currentIndex.value < experience.length - 1 ? experience[currentIndex.value + 1] : null))

watchEffect(() => {
  document.title = item.value
    ? `${item.value.role} · ${item.value.organization} — Kashan Shafiq`
    : 'Experience not found — Kashan Shafiq'
})
</script>

<template>
  <div v-if="item" class="shell page-body">
    <PageIntro
      :eyebrow="`Experience / ${item.domain}`"
      :title="item.role"
      :description="`${item.organization} · ${item.period} · ${item.location}`"
    />

    <div class="two-column">
      <article class="prose">
        <h2>Context & Overview</h2>
        <p>{{ item.context }}</p>

        <h2>Responsibilities & Workflow</h2>
        <ul>
          <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
        </ul>

        <h2>Key Achievements & Impact</h2>
        <ul>
          <li v-for="achievement in item.achievements" :key="achievement">{{ achievement }}</li>
        </ul>

        <h2>Technical & Professional Takeaways</h2>
        <ul>
          <li v-for="learning in item.learnings" :key="learning">{{ learning }}</li>
        </ul>
      </article>

      <aside class="detail-visual">
        <div class="experience-sidebar-card">
          <p class="eyebrow">Professional Summary</p>
          <h3 class="sidebar-title">{{ item.organization }}</h3>
          <p class="sidebar-role">{{ item.role }}</p>

          <dl class="metadata">
            <div>
              <dt>Period</dt>
              <dd>{{ item.period }}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{{ item.location }}</dd>
            </div>
            <div>
              <dt>Domain</dt>
              <dd>{{ item.domain }}</dd>
            </div>
          </dl>

          <div class="tools-section">
            <p class="eyebrow tools-heading">Tools & Competencies</p>
            <div class="tag-list">
              <span v-for="tool in item.tools" :key="tool" class="tag">{{ tool }}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <div class="link-row experience-nav-row">
      <RouterLink class="text-link" to="/experience">
        ← Back to all experience
      </RouterLink>
      <RouterLink
        v-if="prevExperience"
        class="text-link"
        :to="`/experience/${prevExperience.slug}`"
      >
        ← {{ prevExperience.organization }} ({{ prevExperience.role }})
      </RouterLink>
      <RouterLink
        v-if="nextExperience"
        class="text-link"
        :to="`/experience/${nextExperience.slug}`"
      >
        {{ nextExperience.organization }} ({{ nextExperience.role }}) →
      </RouterLink>
      <RouterLink class="text-link" to="/#contact">
        Discuss this work <span aria-hidden="true">↗</span>
      </RouterLink>
    </div>
  </div>
  <NotFoundView v-else />
</template>

<style scoped>
.experience-sidebar-card {
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 28px;
  border-radius: 2px;
}

.sidebar-title {
  font-size: 1.6rem;
  margin-top: 12px;
  color: var(--text);
}

.sidebar-role {
  color: var(--accent);
  font-size: 1.05rem;
  margin-top: 4px;
  margin-bottom: 20px;
}

.tools-section {
  margin-top: 24px;
}

.tools-heading {
  margin-bottom: 12px;
}

.experience-nav-row {
  border-top: 1px solid var(--line);
  margin-top: 40px;
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: space-between;
}
</style>
