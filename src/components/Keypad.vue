<script setup lang="ts">
const emit = defineEmits<{ (e: 'key', k: string): void }>()
const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
</script>

<template>
  <!-- numbers keep the familiar LTR layout even in an RTL page -->
  <div class="pad" dir="ltr">
    <button v-for="d in digits" :key="d" type="button" @click="emit('key', d)">{{ d }}</button>
    <button type="button" aria-label="מחק" @click="emit('key', 'back')">⌫</button>
    <button type="button" @click="emit('key', '0')">0</button>
    <button type="button" class="enter" aria-label="בדיקה" @click="emit('key', 'enter')">✓</button>
  </div>
</template>
