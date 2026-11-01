<script setup lang="ts">
import { computed } from 'vue'
import type { Problem } from '../types'
import { answerColumns } from '../lib/generator'

const props = defineProps<{ problem: Problem; buf: string }>()

const n = computed(() => answerColumns(props.problem))
const pad = (x: number) => String(x).padStart(n.value, ' ').split('')
// answer boxes from left to right: k = n-1 ... 0 (k = 0 is the ones digit)
const boxes = computed(() => Array.from({ length: n.value }, (_, i) => n.value - 1 - i))
</script>

<template>
  <div class="problem" dir="ltr">
    <div v-if="problem.fmt === 'line'" class="line">
      <span>{{ problem.a }}</span>
      <span>{{ problem.op }}</span>
      <span>{{ problem.b }}</span>
      <span>=</span>
      <span class="ans act">{{ buf || '\u00a0' }}</span>
    </div>

    <template v-else>
      <div class="col" :style="{ gridTemplateColumns: `40px repeat(${n}, 62px)` }">
        <div class="cell sign"></div>
        <div v-for="(ch, i) in pad(problem.a)" :key="'a' + i" class="cell">{{ ch.trim() }}</div>
        <div class="cell sign">{{ problem.op }}</div>
        <div v-for="(ch, i) in pad(problem.b)" :key="'b' + i" class="cell">{{ ch.trim() }}</div>
        <div class="cell sign"></div>
        <div class="cell rule"></div>
        <div class="cell sign"></div>
        <div v-for="k in boxes" :key="'r' + k" class="cell in" :class="{ act: k === buf.length }">
          {{ buf[k] ?? '' }}
        </div>
      </div>
      <p class="tip" dir="rtl">כותבים מימין לשמאל: קודם אחדות, אחר כך עשרות.</p>
    </template>
  </div>
</template>
