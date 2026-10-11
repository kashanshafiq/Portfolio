<script setup lang="ts">
import type { DiagramKind } from '../types/content'
defineProps<{ kind: DiagramKind; label: string }>()
// Schematic geometry, not analysis results or an image of a completed project.
const point = (x: number, y: number, z: number) => `${80 + x * 68 + y * 38},${275 + y * 19 - z * 46}`
const floors = [0, 1, 2, 3, 4]
</script>
<template>
  <figure class="project-diagram">
    <svg viewBox="0 0 520 350" role="img" :aria-label="label">
      <g class="diagram-grid" stroke="currentColor" stroke-width="0.5"><path v-for="n in 10" :key="`h${n}`" :d="`M 20 ${n*32} H 500`"/><path v-for="n in 15" :key="`v${n}`" :d="`M ${n*32} 20 V 330`"/></g>
      <g v-if="kind === 'structure'" fill="none" stroke="currentColor" stroke-linejoin="round">
        <g v-for="z in floors" :key="z">
          <polygon :points="[point(0,0,z),point(4,0,z),point(4,2,z),point(0,2,z)].join(' ')" class="slab"/>
          <path v-for="x in [0,1,2,3,4]" :key="x" :d="`M ${point(x,0,z)} L ${point(x,2,z)}`" opacity=".45"/>
        </g>
        <g v-for="x in [0,1,2,3,4]" :key="x"><path v-for="y in [0,2]" :key="y" :d="`M ${point(x,y,0)} L ${point(x,y,4)}`" stroke-width="4"/></g>
        <path d="M48 276V89M42 276H54M42 89H54" class="accent-stroke"/><text x="32" y="206" transform="rotate(-90 32 206)" class="diagram-label">STRUCTURAL FRAME</text>
      </g>
      <g v-else-if="kind === 'wall'" stroke="currentColor" fill="none" stroke-linejoin="round">
        <path d="M245 65H478V280H269" class="soil"/><path d="M155 280H245V68H270V280H385V301H155Z" class="concrete" stroke-width="2"/>
        <path d="M254 86V289H369M167 289H247" class="accent-stroke" stroke-width="2"/>
        <path v-for="n in 8" :key="n" :d="`M ${278+n*19} 78 l18 18 m-18 34 l18 18 m-18 34 l18 18 m-18 34 l18 18`" opacity=".23"/>
        <path d="M117 70V280M109 70H126M109 280H126M154 323H385" opacity=".5"/>
        <text x="289" y="53" class="diagram-label">BACKFILL</text><text x="106" y="195" transform="rotate(-90 106 195)" class="diagram-label">RETAINED HEIGHT</text><text x="170" y="345" class="diagram-label">STEM / HEEL / TOE</text>
      </g>
      <g v-else-if="kind === 'water'" fill="none" stroke="currentColor">
        <path d="M32 100L480 30M15 181L500 98M40 290L490 220M93 17L148 330M220 19L270 333M361 21L410 330" stroke-width="10" opacity=".1"/>
        <path d="M78 80L213 111L350 69M213 111L235 209L389 171L446 283M235 209L107 271M235 209L290 300" class="accent-stroke" stroke-width="3"/>
        <circle v-for="(p,i) in [[78,80],[213,111],[350,69],[235,209],[389,171],[446,283],[107,271],[290,300]]" :key="i" :cx="p[0]" :cy="p[1]" r="7" class="node"/>
        <text x="38" y="333" class="diagram-label">CATCHMENT / NETWORK / OUTFALL</text>
      </g>
      <g v-else-if="kind === 'schedule'" stroke="currentColor" fill="none">
        <path d="M75 55V290H460"/><rect v-for="(w,i) in [90,135,100,140,85]" :key="i" :x="90+i*54" :y="75+i*38" :width="w" height="16" class="concrete"/><path d="M90 274C180 275 180 250 249 175S363 111 450 64" class="accent-stroke" stroke-width="3"/><text x="90" y="325" class="diagram-label">SEQUENCE / RESOURCES / PROGRESS</text>
      </g>
      <g v-else-if="kind === 'road'" stroke="currentColor" fill="none">
        <path v-for="n in 7" :key="n" :d="`M20 ${35+n*30} Q190 ${-45+n*30} 260 ${90+n*24} T510 ${100+n*28}`" opacity=".2"/>
        <path d="M30 277C150 280 150 90 255 120S390 270 495 70" stroke-width="24" opacity=".2"/><path d="M30 277C150 280 150 90 255 120S390 270 495 70" class="accent-stroke" stroke-width="2" stroke-dasharray="8 8"/><text x="30" y="333" class="diagram-label">TERRAIN / ALIGNMENT / GEOMETRY</text>
      </g>
      <g v-else stroke="currentColor" fill="none"><path d="M80 65H440V280H80ZM80 110H440M80 165H440M80 220H440M245 65V280M345 65V280"/><path d="M100 137H213M100 192H189M100 247H202M265 137H321M265 192H321M365 247H418" class="accent-stroke" stroke-width="4"/><text x="80" y="325" class="diagram-label">MEMBERS / QUANTITIES / COST</text></g>
    </svg>
    <figcaption class="diagram-caption">Illustrative schematic</figcaption>
  </figure>
</template>
