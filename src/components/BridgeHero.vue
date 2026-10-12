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
  { label: 'Structural Members', color: '#21A65D' },
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
.interactive-bridge {
  aspect-ratio: 1.45;
  padding: 0;
  background: radial-gradient(ellipse at 50% 60%, rgba(45, 48, 49, 0.55), transparent 70%);
  position: relative;
  overflow: hidden;
}

.fea-legend,
.arch-legend {
  position: absolute;
  top: 14px;
  right: 14px;
  pointer-events: none;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.72rem;
  background: rgba(45, 48, 49, 0.94);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 2px;
  z-index: 2;
}

.fea-legend-title,
.legend-title {
  display: block;
  letter-spacing: 0.08em;
  font-weight: 500;
  font-size: var(--text-badge, 0.75rem);
  font-family: var(--mono);
  color: var(--accent);
  margin-bottom: 8px;
}

.arch-legend-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.arch-legend-item {
  display: flex;
  align-items: center;
  gap: 9px;
}

.color-swatch {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  flex-shrink: 0;
}

.arch-legend-label {
  font-family: var(--mono);
  font-size: var(--text-viewer, 0.8125rem);
  color: var(--text);
  white-space: nowrap;
}

.fea-scale {
  display: flex;
  gap: 9px;
  margin-top: 8px;
}

.fea-swatches {
  display: flex;
  flex-direction: column;
  width: 14px;
  border: 1px solid var(--line);
}

.fea-swatches i {
  height: 9px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.fea-labels {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: var(--text-viewer, 0.8125rem);
  font-family: var(--mono);
  color: var(--text);
}

.fea-note {
  display: block;
  margin-top: 8px;
  font-size: var(--text-badge, 0.75rem);
  font-family: var(--mono);
  color: var(--muted);
}

.bridge-canvas {
  position: absolute;
  inset: 0;
}

.bridge-canvas :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
  cursor: grab;
  touch-action: pan-y;
}

.bridge-canvas :deep(canvas:active) {
  cursor: grabbing;
}

.interactive-bridge img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.reset-corner-btn {
  position: absolute;
  right: 14px;
  bottom: 12px;
  font-family: var(--mono);
  font-size: var(--text-viewer, 0.8125rem);
  padding: 8px 14px;
  min-height: 44px;
  min-width: 44px;
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--text);
  cursor: pointer;
  border-radius: 2px;
  z-index: 2;
  transition: color 160ms, border-color 160ms, background 160ms;
}

.reset-corner-btn:hover {
  color: var(--accent);
  background: var(--surface-raised);
  border-color: var(--accent);
}

.bridge-hint {
  position: absolute;
  left: 14px;
  bottom: 14px;
  color: var(--muted);
  font-family: var(--mono);
  font-size: var(--text-viewer, 0.8125rem);
  letter-spacing: 0.02em;
  pointer-events: none;
  max-width: calc(100% - 130px);
  z-index: 2;
}

.bridge-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-block: 1px solid var(--line);
  margin-top: 14px;
  padding-block: 8px;
}

.bridge-modes {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

button {
  font-family: var(--mono);
  font-size: var(--text-viewer, 0.8125rem);
  padding: 10px 14px;
  min-height: 44px;
  min-width: 44px;
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--muted);
  cursor: pointer;
  border-radius: 2px;
  transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
}

button:hover {
  color: var(--text);
  border-color: var(--accent);
  background: var(--surface-raised);
}

button[aria-pressed="true"] {
  color: var(--text-on-primary);
  background: var(--accent-primary);
  border-color: var(--accent-primary-border);
  font-weight: 500;
}

@media (max-width: 760px) {
  .interactive-bridge {
    aspect-ratio: 1.25;
  }

  .bridge-toolbar {
    gap: 8px;
  }

  .bridge-modes {
    width: 100%;
    justify-content: stretch;
  }

  .bridge-modes button {
    flex: 1;
    min-width: 0;
    text-align: center;
    padding: 10px 8px;
    font-size: 0.8rem;
  }

  .fea-legend,
  .arch-legend {
    top: 10px;
    right: 10px;
    padding: 8px 10px;
    font-size: 0.75rem;
  }

  .reset-corner-btn {
    right: 10px;
    bottom: 10px;
    font-size: 0.78rem;
  }

  .bridge-hint {
    left: 10px;
    bottom: 10px;
    font-size: 0.75rem;
    max-width: calc(100% - 110px);
  }
}
</style>
