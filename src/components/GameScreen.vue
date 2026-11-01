<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import type { Problem, RoundResult } from '../types'
import { useRound } from '../composables/useRound'
import ProblemView from './ProblemView.vue'
import Keypad from './Keypad.vue'

const props = defineProps<{ problems: Problem[] }>()
const emit = defineEmits<{
  (e: 'finish', r: RoundResult): void
  (e: 'exit'): void
}>()

const { cur, buf, dots, message, result, start, press, next } = useRound()
start(props.problems)
watch(result, (r) => {
  if (r) emit('finish', r)
})

function onKey(e: KeyboardEvent) {
  if (/^[0-9]$/.test(e.key)) press(e.key)
  else if (e.key === 'Backspace') press('back')
  else if (e.key === 'Enter') press('enter')
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

</script>

<template>
  <div class="top">
    <button class="ghost" type="button" @click="emit('exit')">→ תפריט</button>
    <div class="dots">
      <span v-for="i in 10" :key="i" class="d" :class="dots[i - 1]"></span>
    </div>
  </div>

  <section class="sheet">
    <ProblemView v-if="cur" :problem="cur" :buf="buf" />
  </section>

  <div class="msg" :class="message?.kind" aria-live="polite">
    <template v-if="message">
      <b>{{ message.title }}</b>
      <span> {{ message.body }}</span>
      <div v-if="message.canSkip">
        <button class="next" type="button" @click="next">הבנתי, ממשיכים</button>
      </div>
    </template>
  </div>

  <Keypad @key="press" />
</template>
