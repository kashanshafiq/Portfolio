<script setup lang="ts">
import PageIntro from '../components/PageIntro.vue'
</script>
<template><div class="shell page-body"><PageIntro eyebrow="404 / Page not found" title="A different route." description="That page is not part of this portfolio. You can return home or explore the project archive."/><div class="hero-actions"><RouterLink class="button primary" to="/">Back home</RouterLink><RouterLink class="text-link" to="/work">Explore work</RouterLink></div></div></template>
