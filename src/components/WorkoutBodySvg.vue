<script setup lang="ts">
import { computed } from 'vue'

type BodyView = 'front' | 'back'

const props = defineProps<{
  bodyView: BodyView
  activeRegions: string[]
}>()

const regions = computed(() => new Set(props.activeRegions))
const isActive = (id: string) => regions.value.has(id)
</script>

<template>
  <svg v-show="bodyView === 'front'" viewBox="0 0 300 620" width="100%" class="body-svg" aria-label="Вид спереди">
    <circle class="base" cx="150" cy="55" r="32" />
    <rect class="base" x="138" y="82" width="24" height="26" rx="4" />
    <path class="base" d="M75,108 Q150,95 225,108 L215,270 Q150,285 85,270 Z" />
    <rect class="base" x="60" y="112" width="34" height="150" rx="16" />
    <rect class="base" x="206" y="112" width="34" height="150" rx="16" />
    <rect class="base" x="112" y="290" width="34" height="150" rx="10" />
    <rect class="base" x="154" y="290" width="34" height="150" rx="10" />
    <rect class="base" x="118" y="450" width="24" height="120" rx="8" />
    <rect class="base" x="158" y="450" width="24" height="120" rx="8" />

    <rect class="region" :class="{ on: isActive('f-frontDelts-l') }" x="72" y="112" width="30" height="30" rx="10" />
    <rect class="region" :class="{ on: isActive('f-frontDelts-r') }" x="198" y="112" width="30" height="30" rx="10" />
    <rect class="region" :class="{ on: isActive('f-chest') }" x="102" y="120" width="96" height="55" rx="10" />
    <rect class="region" :class="{ on: isActive('f-triceps-l') }" x="63" y="150" width="26" height="60" rx="10" />
    <rect class="region" :class="{ on: isActive('f-triceps-r') }" x="211" y="150" width="26" height="60" rx="10" />
    <rect class="region" :class="{ on: isActive('f-abs') }" x="122" y="182" width="56" height="80" rx="8" />
    <rect class="region" :class="{ on: isActive('f-obliques-l') }" x="100" y="190" width="20" height="65" rx="8" />
    <rect class="region" :class="{ on: isActive('f-obliques-r') }" x="180" y="190" width="20" height="65" rx="8" />
    <rect class="region" :class="{ on: isActive('f-quads-l') }" x="115" y="295" width="28" height="120" rx="10" />
    <rect class="region" :class="{ on: isActive('f-quads-r') }" x="157" y="295" width="28" height="120" rx="10" />
    <rect class="region" :class="{ on: isActive('f-adductors-l') }" x="144" y="300" width="8" height="100" rx="4" />
    <rect class="region" :class="{ on: isActive('f-adductors-r') }" x="152" y="300" width="8" height="100" rx="4" />
    <rect class="region" :class="{ on: isActive('f-calves-l') }" x="120" y="455" width="20" height="105" rx="8" />
    <rect class="region" :class="{ on: isActive('f-calves-r') }" x="160" y="455" width="20" height="105" rx="8" />
  </svg>

  <svg v-show="bodyView === 'back'" viewBox="0 0 300 620" width="100%" class="body-svg" aria-label="Вид сзади">
    <circle class="base" cx="150" cy="55" r="32" />
    <rect class="base" x="138" y="82" width="24" height="26" rx="4" />
    <path class="base" d="M75,108 Q150,95 225,108 L215,270 Q150,285 85,270 Z" />
    <rect class="base" x="60" y="112" width="34" height="150" rx="16" />
    <rect class="base" x="206" y="112" width="34" height="150" rx="16" />
    <rect class="base" x="112" y="290" width="34" height="150" rx="10" />
    <rect class="base" x="154" y="290" width="34" height="150" rx="10" />
    <rect class="base" x="118" y="450" width="24" height="120" rx="8" />
    <rect class="base" x="158" y="450" width="24" height="120" rx="8" />

    <path class="region" :class="{ on: isActive('b-traps') }" d="M120,108 L180,108 L165,150 L135,150 Z" />
    <rect class="region" :class="{ on: isActive('b-rearDelts-l') }" x="72" y="112" width="30" height="30" rx="10" />
    <rect class="region" :class="{ on: isActive('b-rearDelts-r') }" x="198" y="112" width="30" height="30" rx="10" />
    <path class="region" :class="{ on: isActive('b-lats-l') }" d="M92,140 L135,150 L128,225 L88,205 Z" />
    <path class="region" :class="{ on: isActive('b-lats-r') }" d="M208,140 L165,150 L172,225 L212,205 Z" />
    <rect class="region" :class="{ on: isActive('b-lowerback') }" x="128" y="225" width="44" height="45" rx="8" />
    <ellipse class="region" :class="{ on: isActive('b-glutes-l') }" cx="130" cy="300" rx="24" ry="28" />
    <ellipse class="region" :class="{ on: isActive('b-glutes-r') }" cx="170" cy="300" rx="24" ry="28" />
    <rect class="region" :class="{ on: isActive('b-hams-l') }" x="115" y="335" width="28" height="80" rx="10" />
    <rect class="region" :class="{ on: isActive('b-hams-r') }" x="157" y="335" width="28" height="80" rx="10" />
    <rect class="region" :class="{ on: isActive('b-calves-l') }" x="120" y="455" width="20" height="105" rx="8" />
    <rect class="region" :class="{ on: isActive('b-calves-r') }" x="160" y="455" width="20" height="105" rx="8" />
  </svg>
</template>

<style scoped>
.body-svg {
  max-width: 260px;
  margin: 0 auto;
  display: block;
}

.base {
  fill: color-mix(in srgb, var(--surface-1) 85%, #1f2937);
}

.region {
  fill: color-mix(in srgb, var(--surface-2) 75%, #334155);
  stroke: color-mix(in srgb, var(--text-secondary) 30%, transparent);
  stroke-width: 1;
  transition: fill 0.25s ease;
}

.region.on {
  fill: var(--text-accent);
}
</style>
