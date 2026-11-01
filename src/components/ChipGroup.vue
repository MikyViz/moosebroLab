<script setup lang="ts" generic="T extends string | number">
defineProps<{ options: { value: T; label: string; hint?: string }[] }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <div class="chips">
    <button
      v-for="o in options"
      :key="o.value"
      type="button"
      class="chip"
      :aria-pressed="model === o.value"
      @click="model = o.value"
    >
      {{ o.label }}
      <small v-if="o.hint"><bdi>{{ o.hint }}</bdi></small>
    </button>
  </div>
</template>
