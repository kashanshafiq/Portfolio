<script setup lang="ts">
import BridgeHero from '../components/BridgeHero.vue'
import ProjectDiagram from '../components/ProjectDiagram.vue'
import ResearchFeature from '../components/ResearchFeature.vue'
import { profile, approach } from '../content/profile'
import { projects } from '../content/projects'
const featured = projects[0]!
</script>
<template>
  <div class="shell">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy"><p class="eyebrow">Civil Engineer</p><h1 id="hero-title">KASHAN<br>SHAFIQ</h1><p class="hero-description">{{ profile.introduction }}</p><div class="hero-actions"><RouterLink class="button primary" to="/work">Explore my work <span aria-hidden="true">↗</span></RouterLink><RouterLink class="text-link" to="/about">About me</RouterLink></div></div>
      <BridgeHero />
    </section>
    <div class="discipline-strip" aria-label="Areas of practice"><span>Structures</span><span>Digital modelling</span><span>Applied research</span><i aria-hidden="true"></i></div>
    <section class="selected-work" aria-labelledby="selected-work-title">
      <div class="section-side"><h2 id="selected-work-title">Selected<br>work<span class="accent">.</span></h2><p>Problems, methods,<br>and what I learned.</p><RouterLink class="text-link" to="/work">View all work <span aria-hidden="true">↗</span></RouterLink></div>
      <RouterLink class="featured-visual" :to="`/projects/${featured.slug}`" aria-label="View structural design case study"><ProjectDiagram kind="structure" label="Illustrative axonometric structural frame schematic" /></RouterLink>
      <div class="featured-info"><h3>{{ featured.title }}</h3><dl class="metadata"><div><dt>Method</dt><dd>ETABS + SAFE</dd></div><div><dt>Type</dt><dd>Academic project</dd></div></dl><RouterLink class="text-link" :to="`/projects/${featured.slug}`">Open case study <span aria-hidden="true">↗</span></RouterLink></div>
    </section>
    <div class="secondary-projects"><RouterLink v-for="project in projects.slice(1,3)" :key="project.slug" :to="`/projects/${project.slug}`" class="mini-project"><ProjectDiagram :kind="project.diagram" :label="`${project.title} illustrative schematic`"/><div><h3>{{ project.title }} <span aria-hidden="true">↗</span></h3><p>{{ project.summary }}</p></div></RouterLink></div>
  </div>
  <section class="approach-band" aria-labelledby="approach-title"><div class="shell"><p id="approach-title" class="eyebrow">How I approach a problem <span class="short-rule" aria-hidden="true"></span></p><div class="approach-grid"><div v-for="item in approach" :key="item.title"><h2>{{ item.title }}</h2><p>{{ item.text }}</p></div></div></div></section>
  <div class="shell"><ResearchFeature /><section class="background-links" aria-label="More about Kashan"><RouterLink to="/about"><span class="eyebrow">Academic foundation</span><h3>COMSATS Wah <span aria-hidden="true">↗</span></h3><p>BS Civil Engineering · 2022–2026</p></RouterLink><RouterLink to="/experience"><span class="eyebrow">Professional practice</span><h3>Scan-to-BIM <span aria-hidden="true">↗</span></h3><p>Junior BIM Modeler · Archnetix</p></RouterLink><RouterLink to="/community"><span class="eyebrow">Beyond engineering</span><h3>People & learning <span aria-hidden="true">↗</span></h3><p>Leadership, service and sharing knowledge.</p></RouterLink></section></div>
</template>
