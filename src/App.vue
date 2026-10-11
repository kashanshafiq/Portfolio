<script setup lang="ts">
import { nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
const route = useRoute()
function skipToContent() {
  const main = document.querySelector<HTMLElement>('#main-content')
  main?.focus({ preventScroll: true })
  main?.scrollIntoView()
}
watch(() => route.fullPath, async () => {
  await nextTick()
  document.querySelector<HTMLElement>('#main-content')?.focus({ preventScroll: true })
})
</script>

<template>
  <a class="skip-link" href="#main-content" @click.prevent="skipToContent">Skip to content</a>
  <SiteHeader />
  <main id="main-content" tabindex="-1"><RouterView /></main>
  <SiteFooter />
</template>
