<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { BridgeViewer } from '../three/bridgeViewer'
const bridgeUrl = `${import.meta.env.BASE_URL}images/bridge-hero.png`
const stage = ref<HTMLDivElement>()
const ready = ref(false), failed = ref(false)
const mode = ref<'architectural' | 'fea'>('architectural')
const elevation = ref(false)
let viewer: BridgeViewer | undefined
let disposed = false
function setView(value: boolean) { elevation.value = value; viewer?.elevation(value) }
function setMode(newMode: 'architectural' | 'fea') { 
  mode.value = newMode
  viewer?.fea(newMode === 'fea')
}
function reset() { elevation.value = false; viewer?.reset() }
onMounted(async () => {
  try {
    const { createBridgeViewer } = await import('../three/bridgeViewer')
    if (disposed || !stage.value) return
    viewer = createBridgeViewer(stage.value, () => { elevation.value = false }, () => { ready.value = false; failed.value = true }, reset)
    ready.value = true
  } catch { failed.value = true }
})
onBeforeUnmount(() => { disposed = true; viewer?.dispose() })
</script>
<template>
  <figure class="bridge-hero" aria-label="Interactive bridge study">
    <div class="bridge-stage interactive-bridge">
      <div ref="stage" class="bridge-canvas" v-show="ready" />
      <img v-if="!ready" :src="bridgeUrl" alt="Arched steel through-truss bridge with overhead cross-bracing" width="1536" height="1024" fetchpriority="high" />
      <span class="bridge-hint">{{ ready ? 'Drag to orbit · Arrow keys to rotate' : failed ? 'Static view · 3D unavailable on this device' : 'Preparing interactive model…' }}</span>
    </div>
    <template v-if="ready">
      <div class="bridge-toolbar">
        <div role="group" aria-label="Bridge viewpoint" class="bridge-modes">
          <button :aria-pressed="!elevation" @click="setView(false)">Perspective</button>
          <button :aria-pressed="elevation" @click="setView(true)">Elevation</button>
        </div>
        <div class="bridge-modes">
          <button :aria-pressed="mode === 'architectural'" @click="setMode('architectural')">Architectural Model</button>
          <button :aria-pressed="mode === 'fea'" @click="setMode('fea')">FEA Simulation <span aria-hidden="true">🌈</span></button>
          <button aria-label="Reset view" @click="reset">Reset view</button>
        </div>
      </div>
    </template>
  </figure>
</template>
<style scoped>
.interactive-bridge { aspect-ratio: 1.38; padding: 0; background: radial-gradient(ellipse at 50% 60%, #29372e55, transparent 70%); }
.bridge-canvas { position: absolute; inset: 0; }
.bridge-canvas :deep(canvas) { display: block; width: 100%; height: 100%; cursor: grab; touch-action: pan-y; }
.bridge-canvas :deep(canvas:active) { cursor: grabbing; }
.interactive-bridge img { height: 100%; }
.bridge-index,.bridge-hint { position: absolute; left: 14px; color: var(--muted); font: .62rem var(--mono); letter-spacing: .07em; pointer-events: none; }
.bridge-index { top: 14px; }.bridge-hint { bottom: 12px; }
.bridge-toolbar { display:flex; flex-wrap:wrap; justify-content:space-between; gap:6px; border-block:1px solid var(--line); margin-top:12px; padding-block:6px; }
.bridge-modes { display:flex; gap:2px; }
button { font: .66rem var(--mono); padding: 10px 9px; min-height: 40px; background: transparent; border: 1px solid transparent; color:var(--muted); cursor:pointer; }
button:hover,button[aria-pressed="true"] { color:var(--accent); background:#aed0c40d; border-color:var(--line); }
.load-sequence { display:block; color:var(--accent); font-family:var(--mono); font-size:.72rem; margin-bottom:3px; }
.bridge-detail { font-size:.8rem; line-height:1.55; min-height:3.1em; margin-top:8px; color:var(--muted); }
@media(max-width:760px) { .interactive-bridge { aspect-ratio:1.15; } .bridge-toolbar { gap:0; } button { min-height:44px; } }
</style>
