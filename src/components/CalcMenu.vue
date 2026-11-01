<script setup lang="ts">
import type { CalcConfig } from '../types'
import ChipGroup from './ChipGroup.vue'

const cfg = defineModel<CalcConfig>({ required: true })
const emit = defineEmits<{ (e: 'start'): void }>()

function set<K extends keyof CalcConfig>(key: K, value: CalcConfig[K]) {
  cfg.value = { ...cfg.value, [key]: value }
}

const levels = [
  { value: 1, label: 'עד 20', hint: '7 + 8' },
  { value: 2, label: 'עד 100, בלי מעבר עשרת', hint: '34 + 25' },
  { value: 3, label: 'עד 100, עם מעבר עשרת', hint: '38 + 27' },
  { value: 4, label: 'הכול ביחד', hint: 'מ-0 עד 100' },
]
const ops = [
  { value: 'add', label: 'חיבור' },
  { value: 'sub', label: 'חיסור' },
  { value: 'mix', label: 'גם וגם' },
]
const formats = [
  { value: 'line', label: 'בשורה' },
  { value: 'col', label: 'בטור' },
  { value: 'mix', label: 'מעורב' },
]
</script>

<template>
  <h1>סופרים עד 100</h1>
  <p class="sub">מחברת לאימון חיבור וחיסור, בשורה ובטור.</p>

  <div class="grp">
    <h2>רמה</h2>
    <ChipGroup :options="levels" :model-value="cfg.level" @update:model-value="(v) => set('level', v as CalcConfig['level'])" />
  </div>
  <div class="grp">
    <h2>מה סופרים</h2>
    <ChipGroup :options="ops" :model-value="cfg.op" @update:model-value="(v) => set('op', v as CalcConfig['op'])" />
  </div>
  <div class="grp">
    <h2>איך סופרים</h2>
    <ChipGroup :options="formats" :model-value="cfg.fmt" @update:model-value="(v) => set('fmt', v as CalcConfig['fmt'])" />
  </div>

  <button class="go" type="button" @click="emit('start')">מתחילים סיבוב</button>
</template>
