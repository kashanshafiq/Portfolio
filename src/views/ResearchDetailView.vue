<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { researchProjects } from '../content/research'
import PageIntro from '../components/PageIntro.vue'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()
const item = computed(() => researchProjects.find(r => r.slug === route.params.slug))

const copyStatus = ref('')
async function copyCitation() {
  if (!item.value) return
  try {
    await navigator.clipboard.writeText(item.value.citation)
    copyStatus.value = 'Citation copied to clipboard.'
  } catch {
    copyStatus.value = 'Select and copy the citation above.'
  }
}

watchEffect(() => {
  document.title = item.value
    ? `${item.value.shortTitle} — Research Work — Kashan Shafiq`
    : 'Research not found — Kashan Shafiq'
})
</script>

<template>
  <div v-if="item" class="shell page-body research-detail-page">
    <PageIntro
      :eyebrow="`Research Work / ${item.period}`"
      :title="item.shortTitle"
      :description="item.summary"
    />

    <article class="research-main-article">
      <div class="research-meta-header">
        <span class="badge" style="margin-left: 0;">{{ item.venue }}</span>
        <span class="research-period-tag">{{ item.period }}</span>
      </div>

      <h1 class="research-full-title">{{ item.title }}</h1>
      <p class="author-line">{{ item.authors.join(' · ') }}</p>

      <div class="tag-list" style="margin-top: 18px;">
        <span v-for="tool in item.tools" :key="tool" class="tag">{{ tool }}</span>
      </div>

      <div class="two-column" style="margin-top: 48px;">
        <div class="prose">
          <h2>From model to site</h2>
          <p v-for="(pText, idx) in item.overviewText" :key="idx">{{ pText }}</p>
          <p>{{ item.context }}</p>
        </div>

        <aside class="prose research-sidebar-box">
          <h2>Research status</h2>
          <p>
            This manuscript represents preprint academic research developed as a capstone inquiry. Ongoing and future extensions include quantitative positional benchmarking, on-site user evaluations, and the retention of deep BIM parametric data.
          </p>
          <a
            class="button primary"
            style="margin-top: 24px; display: inline-flex;"
            :href="item.doi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read SSRN preprint <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>

      <!-- Deployment methods -->
      <section class="methods-section" style="margin-top: 50px;">
        <h2 class="section-subtitle">Multimodal Deployment Approaches</h2>
        <div class="methods-grid" style="margin-top: 24px;">
          <article v-for="(method, index) in item.methods" :key="method.title">
            <p class="eyebrow">0{{ index + 1 }} / Deployment Approach</p>
            <h3 style="margin-top: 15px;">{{ method.title }}</h3>
            <p>{{ method.detail }}</p>
          </article>
        </div>
      </section>

      <!-- Citation -->
      <section class="citation-box" style="margin-top: 50px;">
        <h2>Citation</h2>
        <p class="citation-text">{{ item.citation }}</p>
        <div class="citation-actions">
          <button class="button" @click="copyCitation">Copy citation</button>
          <span v-if="copyStatus" class="copy-status" role="status">{{ copyStatus }}</span>
        </div>
      </section>

      <!-- Bottom Nav Row -->
      <div class="link-row" style="margin-top: 48px; border-top: 1px solid var(--line); padding-top: 32px;">
        <RouterLink class="text-link" to="/research">
          ← Back to Research Work
        </RouterLink>
        <a class="text-link" :href="item.doi" target="_blank" rel="noopener noreferrer">
          View on SSRN <span aria-hidden="true">↗</span>
        </a>
        <RouterLink class="text-link" to="/#contact">
          Discuss this research <span aria-hidden="true">↗</span>
        </RouterLink>
      </div>
    </article>
  </div>
  <NotFoundView v-else />
</template>

<style scoped>
.research-meta-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.research-period-tag {
  font-family: var(--mono);
  font-size: 0.82rem;
  color: var(--accent);
  letter-spacing: 0.04em;
}

.research-full-title {
  font-size: clamp(1.8rem, 3.2vw, 2.5rem);
  font-weight: 500;
  color: var(--text);
  margin-top: 24px;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.author-line {
  font-family: var(--mono);
  font-size: 0.88rem;
  color: var(--muted);
  margin-top: 16px;
}

.research-sidebar-box {
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 30px;
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.4rem;
  color: var(--text);
  margin-bottom: 8px;
}

.citation-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 18px;
}

.citation-text {
  font-family: var(--mono);
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--text);
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>
