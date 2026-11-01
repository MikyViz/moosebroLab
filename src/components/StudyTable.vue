<script setup lang="ts">
import { computed, ref } from 'vue'
import { MULT_NUMBERS } from '../lib/generator'
import { TIPS } from '../lib/hints'

const emit = defineEmits<{ (e: 'back'): void; (e: 'train', n: number): void }>()

const n = ref(2)
const hidden = ref<boolean[]>(Array(10).fill(false))
const allHidden = computed(() => hidden.value.every(Boolean))

const toggleAll = () => (hidden.value = Array(10).fill(!allHidden.value))
const toggleRow = (i: number) => (hidden.value[i] = !hidden.value[i])
</script>

<template>
  <div class="top">
    <button class="ghost" type="button" @click="emit('back')">→ תפריט</button>
    <button class="ghost" type="button" @click="toggleAll">
      {{ allHidden ? 'הצג תשובות' : 'הסתר תשובות' }}
    </button>
  </div>

  <div class="chips" style="margin: 12px 0">
    <button
      v-for="k in MULT_NUMBERS"
      :key="k"
      type="button"
      class="chip num"
      :aria-pressed="k === n"
      @click="n = k"
    >
      {{ k }}
    </button>
  </div>

  <section class="sheet tbl">
    <button v-for="i in 10" :key="i" type="button" class="trow" dir="ltr" @click="toggleRow(i - 1)">
      <span>{{ n }} × {{ i }} =</span>
      <b :class="{ hid: hidden[i - 1] }">{{ n * i }}</b>
    </button>
  </section>

  <p class="study-tip">{{ TIPS[n] }}</p>
  <p class="tip" style="margin-bottom: 10px">לחץ על שורה כדי להסתיר או להציג תשובה.</p>
  <button class="go" type="button" @click="emit('train', n)">לאמן את המספר {{ n }}</button>
</template>
