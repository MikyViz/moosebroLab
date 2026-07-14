<script setup lang="ts">
import { ref } from 'vue'

type TopicCard = {
  title: string
  icon: string
  color: string
  points: Array<{
    label: string
    text: string
  }>
  code?: string
  complexity?: string
  takeaway?: string
}

const props = defineProps<{
  topic: TopicCard
}>()

const expanded = ref(false)
</script>

<template>
  <article class="card" :style="{ borderLeftColor: props.topic.color }">
    <div class="card-header" @click="expanded = !expanded">
      <span class="card-icon">{{ props.topic.icon }}</span>
      <h3>{{ props.topic.title }}</h3>
      <span class="arrow" :class="{ rotated: expanded }">▼</span>
    </div>

    <Transition name="expand">
      <div v-if="expanded" class="card-body">
        <div v-for="point in props.topic.points" :key="point.label" class="point">
          <span class="point-label">{{ point.label }}</span>
          <span class="point-text">{{ point.text }}</span>
        </div>

        <pre v-if="props.topic.code" class="code-block"><code>{{ props.topic.code }}</code></pre>

        <div v-if="props.topic.complexity" class="complexity">
          <span class="badge">⏱ {{ props.topic.complexity }}</span>
        </div>

        <div v-if="props.topic.takeaway" class="takeaway">💡 {{ props.topic.takeaway }}</div>
      </div>
    </Transition>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid var(--border);
  border-left: 4px solid var(--text-accent);
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface-2);
  box-shadow: var(--shadow-sm);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  user-select: none;
}

.card-icon {
  font-size: 1.5rem;
}

.card-header h3 {
  flex: 1;
  margin: 0;
  font-size: 1.05rem;
}

.arrow {
  font-size: 0.8rem;
  color: var(--text-muted);
  transition: transform 0.2s;
}

.arrow.rotated {
  transform: rotate(180deg);
}

.card-body {
  padding: 0 16px 16px;
  border-top: 1px solid var(--border);
}

.point {
  display: flex;
  gap: 8px;
  padding: 8px 0;
  flex-wrap: wrap;
}

.point-label {
  font-weight: 700;
  color: var(--text-accent);
  min-width: 140px;
}

.point-text {
  color: var(--text-secondary);
  line-height: 1.5;
}

.code-block {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  overflow-x: auto;
  margin: 8px 0;
}

.complexity {
  margin: 8px 0;
}

.badge {
  display: inline-block;
  background: var(--surface-1);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.takeaway {
  background: color-mix(in srgb, var(--bg-accent) 45%, var(--surface-2));
  border-left: 3px solid var(--text-accent);
  padding: 10px 14px;
  border-radius: 4px;
  margin-top: 8px;
  font-style: italic;
  color: var(--text-primary);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 800px;
}
</style>
