<script setup lang="ts">
import { research } from '../content/research'
</script>
<template>
  <section class="research-feature" aria-labelledby="research-feature-title">
    <div><p class="eyebrow">Research <span class="badge">Preprint</span></p><h2 id="research-feature-title">BIM to augmented reality</h2><p>{{ research.summary }}</p><RouterLink class="text-link" to="/research">Read the research <span aria-hidden="true">↗</span></RouterLink></div>
    <div class="workflow-diagram" role="img" aria-label="Research workflow: BIM model, transfer, augmented reality">
      <span class="workflow-step"><b>01</b>Model<small>Revit / BIM</small></span><span class="workflow-connector" aria-hidden="true"></span><span class="workflow-step"><b>02</b>Translate<small>FBX / Unity</small></span><span class="workflow-connector" aria-hidden="true"></span><span class="workflow-step"><b>03</b>Experience<small>Mobile / AR</small></span>
    </div>
  </section>
</template>
