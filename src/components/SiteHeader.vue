<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header class="site-header shell" @keydown.esc="open = false">
    <RouterLink class="wordmark" to="/" aria-label="Kashan Shafiq — home">
      Kashan Shafiq / Portfolio
    </RouterLink>
    <button
      class="menu-toggle"
      :aria-expanded="open"
      aria-controls="main-navigation"
      @click="open = !open"
    >
      {{ open ? 'Close' : 'Menu' }} <span aria-hidden="true">{{ open ? '−' : '+' }}</span>
    </button>
    <nav id="main-navigation" aria-label="Main navigation" :class="{ open }">
      <RouterLink to="/experience">Work Experience</RouterLink>
      <RouterLink to="/research">Research Work</RouterLink>
      <RouterLink to="/work">Featured Projects</RouterLink>
      <RouterLink to="/recognition">Honours and Awards</RouterLink>
      <RouterLink to="/community">Volunteering</RouterLink>
      <RouterLink to="/cv">Academics</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
nav a {
  white-space: nowrap;
}

@media (min-width: 961px) and (max-width: 1280px) {
  nav {
    gap: 18px !important;
  }
}
</style>
