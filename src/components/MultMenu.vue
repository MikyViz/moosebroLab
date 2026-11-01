<script setup lang="ts">
import { MULT_NUMBERS } from '../lib/generator'

const selected = defineModel<number[]>({ required: true })
const emit = defineEmits<{ (e: 'study'): void; (e: 'start'): void }>()

function toggle(n: number) {
  const s = selected.value
  if (s.includes(n)) {
    if (s.length > 1) selected.value = s.filter((x) => x !== n) // keep at least one
  } else {
    selected.value = [...s, n]
  }
}
</script>

<template>
  <h1>לוח הכפל</h1>
  <p class="sub">קודם לומדים מספר, אחר כך מתאמנים עליו.</p>

  <div class="grp">
    <h2>אילו מספרים מתאמנים</h2>
    <div class="chips">
      <button
        v-for="n in MULT_NUMBERS"
        :key="n"
        type="button"
        class="chip num"
        :aria-pressed="selected.includes(n)"
        @click="toggle(n)"
      >
        {{ n }}
      </button>
    </div>
    <div style="margin-top: 10px">
      <button class="ghost" type="button" @click="selected = [...MULT_NUMBERS]">בחר הכול</button>
    </div>
  </div>

  <div class="row">
    <button class="go alt" type="button" @click="emit('study')">ללמוד</button>
    <button class="go" type="button" @click="emit('start')">אימון</button>
  </div>
</template>
