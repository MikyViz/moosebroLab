<script setup lang="ts">
import { computed } from 'vue'
import type { Problem } from '../types'

const props = defineProps<{ stars: number; firstTry: number; missed: Problem[] }>()
defineEmits<{ (e: 'again'): void; (e: 'menu'): void }>()

const text = computed(
  () =>
    [
      'בוא ננסה עוד סיבוב, יהיה יותר טוב!',
      'התחלה טובה!',
      'יופי, כמעט בלי טעויות!',
      'מושלם! אלוף החשבון!',
    ][props.stars],
)
</script>

<template>
  <div class="res">
    <h1>הסיבוב נגמר</h1>
    <div class="stars" :aria-label="`${stars} מתוך 3 כוכבים`">
      {{ '★'.repeat(stars) + '☆'.repeat(3 - stars) }}
    </div>
    <p class="sub">נכון בניסיון הראשון: {{ firstTry }} מתוך 10. {{ text }}</p>

    <div v-if="missed.length" class="miss">
      <b>עוד נתאמן על:</b>
      <div v-for="(q, i) in missed" :key="i" dir="ltr">{{ q.a }} {{ q.op }} {{ q.b }} = {{ q.ans }}</div>
    </div>

    <div class="row">
      <button class="go alt" type="button" @click="$emit('menu')">לתפריט</button>
      <button class="go" type="button" @click="$emit('again')">עוד סיבוב</button>
    </div>
  </div>
</template>
