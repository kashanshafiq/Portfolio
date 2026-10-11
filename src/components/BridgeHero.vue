<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { feaPalette } from '../three/feaPalette'
import { createBridgeViewer, type BridgeViewer } from '../three/bridgeViewer'

const bridgeUrl = `${import.meta.env.BASE_URL}images/bridge-hero.png`
const stage = ref<HTMLDivElement>()
const ready = ref(false)
const failed = ref(false)
const mode = ref<'architectural' | 'fea'>('architectural')
const elevation = ref(false)
let viewer: BridgeViewer | undefined
let disposed = false

const archComponents = [
  { label: 'Structural Members', color: '#86a99a' },
  { label: 'Structural Connection', color: '#162d4a' },
  { label: 'Roadway Surface', color: '#0a0a0a' },
  { label: 'Abutment', color: '#f0f3f2' },
]

function setView(value: boolean) {
  elevation.value = value
  viewer?.elevation(value)
}

function setMode(newMode: 'architectural' | 'fea') {
  mode.value = newMode
  viewer?.fea(newMode === 'fea')
}

function reset() {
  elevation.value = false
  viewer?.reset()
}

onMounted(() => {
  try {
    if (disposed || !stage.value) return
    viewer = createBridgeViewer(
      stage.value,
      () => { elevation.value = false },
      () => { ready.value = false; failed.value = true },
      reset
    )
    ready.value = true
  } catch {
    failed.value = true
  }
})

onBeforeUnmount(() => {
  disposed = true
  viewer?.dispose()
})
</script>

<template>
  <figure class="bridge-hero" aria-label="Interactive bridge study">
    <div class="bridge-stage interactive-bridge">
      <div ref="stage" class="bridge-canvas" />
      <img
        v-if="failed"
        :src="bridgeUrl"
        alt="Arched steel through-truss bridge with overhead cross-bracing"
        width="1536"
        height="1024"
      />

      <!-- Architectural Model Legend (Top-Right) -->
      <div
        v-if="ready && mode === 'architectural'"
        class="arch-legend"
        aria-label="Architectural structural components legend"
      >
        <span class="legend-title">COMPONENTS</span>
        <div class="arch-legend-list">
          <div v-for="item in archComponents" :key="item.label" class="arch-legend-item">
            <span class="color-swatch" :style="{ backgroundColor: item.color }" />
            <span class="arch-legend-label">{{ item.label }}</span>
          </div>
        </div>
      </div>

      <!-- FEA Simulation Legend (Top-Right) -->
      <div
        v-if="ready && mode === 'fea'"
        class="fea-legend"
        aria-label="Illustrative contour scale: high red to low blue"
      >
        <span class="fea-legend-title">RELATIVE RESPONSE</span>
        <div class="fea-scale">
          <div class="fea-swatches">
            <i
              v-for="color in [...feaPalette].reverse()"
              :key="color"
              :style="{ backgroundColor: color }"
            />
          </div>
          <div class="fea-labels">
            <span>High</span>
            <span>Low</span>
          </div>
        </div>
        <span class="fea-note">Illustrative contours</span>
      </div>

      <button v-if="ready" class="reset-corner-btn" aria-label="Reset view" @click="reset">Reset view</button>
      <span class="bridge-hint">
        {{ failed ? 'Static view · 3D unavailable on this device' : 'Drag to orbit · Arrow keys to rotate' }}
      </span>
    </div>
    <div v-if="!failed" class="bridge-toolbar">
      <div role="group" aria-label="Bridge viewpoint" class="bridge-modes">
        <button :aria-pressed="!elevation" @click="setView(false)">3D</button>
        <button :aria-pressed="elevation" @click="setView(true)">Elevation</button>
      </div>
      <div class="bridge-modes">
        <button :aria-pressed="mode === 'architectural'" @click="setMode('architectural')">Architectural Model</button>
        <button :aria-pressed="mode === 'fea'" @click="setMode('fea')">FEA Simulation</button>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.interactive-bridge { aspect-ratio: 1.38; padding: 0; background: radial-gradient(ellipse at 50% 60%, #29372e55, transparent 70%); }

.fea-legend,
.arch-legend {
  position: absolute;
  top: 16px;
  right: 16px;
  pointer-events: none;
  color: var(--muted);
  font: .56rem var(--mono);
  background: rgba(20, 26, 25, 0.72);
  backdrop-filter: blur(6px);
  padding: 8px 11px;
  border: 1px solid var(--line);
  border-radius: 2px;
}

.fea-legend-title,
.legend-title {
  display: block;
  letter-spacing: .08em;
  font-weight: 500;
  color: var(--muted);
  margin-bottom: 7px;
}

.arch-legend-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.arch-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-swatch {
  width: 10px;
  height: 10px;
  border-radius: 1px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  flex-shrink: 0;
}

.arch-legend-label {
  font-family: var(--mono);
  font-size: .56rem;
  color: var(--text);
  white-space: nowrap;
}

.fea-scale { display: flex; gap: 7px; margin-top: 8px; }
.fea-swatches { display: flex; flex-direction: column; width: 13px; border: 1px solid var(--line); }
.fea-swatches i { height: 8px; border-bottom: 1px solid #00000018; }
.fea-labels { display: flex; flex-direction: column; justify-content: space-between; }
.fea-note { display: block; margin-top: 7px; font-size: .5rem; }
.bridge-canvas { position: absolute; inset: 0; }
.bridge-canvas :deep(canvas) { display: block; width: 100%; height: 100%; cursor: grab; touch-action: pan-y; }
.bridge-canvas :deep(canvas:active) { cursor: grabbing; }
.interactive-bridge img { height: 100%; }
.reset-corner-btn { position: absolute; right: 14px; bottom: 12px; font: .66rem var(--mono); padding: 6px 11px; min-height: 32px; background: var(--surface); border: 1px solid var(--line); color: var(--muted); cursor: pointer; transition: color 160ms, border-color 160ms, background 160ms; }
.reset-corner-btn:hover { color: var(--accent); background: var(--accent-soft); border-color: var(--line-strong); }
.bridge-hint { position: absolute; left: 14px; bottom: 12px; color: var(--muted); font: .62rem var(--mono); letter-spacing: .07em; pointer-events: none; }
.bridge-toolbar { display:flex; flex-wrap:wrap; justify-content:space-between; gap:6px; border-block:1px solid var(--line); margin-top:12px; padding-block:6px; }
.bridge-modes { display:flex; gap:2px; }
button { font: .66rem var(--mono); padding: 10px 9px; min-height: 40px; background: transparent; border: 1px solid transparent; color:var(--muted); cursor:pointer; }
button:hover,button[aria-pressed="true"] { color:var(--accent); background:var(--accent-selected); border-color:var(--accent); }
.load-sequence { display:block; color:var(--accent); font-family:var(--mono); font-size:.72rem; margin-bottom:3px; }
.bridge-detail { font-size:.8rem; line-height:1.55; min-height:3.1em; margin-top:8px; color:var(--muted); }
@media(max-width:760px) { .interactive-bridge { aspect-ratio:1.15; } .bridge-toolbar { gap:0; } button { min-height:44px; } }
</style>
