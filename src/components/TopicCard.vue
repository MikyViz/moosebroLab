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
    <button class="card-header" type="button" :aria-expanded="expanded" @click="expanded = !expanded">
      <span class="card-icon">{{ props.topic.icon }}</span>
      <h3>{{ props.topic.title }}</h3>
      <span class="arrow" :class="{ rotated: expanded }">▼</span>
    </button>

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
  width: 100%;
  padding: 16px;
  border: 0;
  margin: 0;
  text-align: left;
  font: inherit;
  background: transparent;
  color: inherit;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
}

.card-header:hover {
  background: var(--surface-1);
}

.card-header:focus-visible {
  outline: 2px solid var(--text-accent);
  outline-offset: -2px;
}

.card-icon {
  font-size: 1.5rem;
}

.card-header h3 {
  flex: 1;
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.35;
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
  gap: 12px;
  padding: 12px 0;
  align-items: flex-start;
  flex-wrap: wrap;
}

.point-label {
  font-weight: 600;
  color: var(--text-accent);
  min-width: 112px;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
}

.point-text {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
  flex: 1;
  min-width: 0;
}

.code-block {
  background: var(--surface-1);
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 12px 16px;
  border-radius: 8px;
  line-height: 1.45;
  font-size: 0.85rem;
  font-family: var(--font-mono);
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
  background: color-mix(in srgb, var(--bg-accent) 30%, var(--surface-2));
  border-left: 4px solid var(--text-accent);
  padding: 12px 14px;
  border-radius: 4px;
  margin-top: 12px;
  font-style: italic;
  color: var(--text-primary);
  line-height: 1.55;
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
  max-height: 1400px;
}

@media (max-width: 640px) {
  .card-header {
    padding: 12px;
    gap: 8px;
  }

  .card-icon {
    font-size: 1.25rem;
  }

  .card-header h3 {
    font-size: 0.98rem;
  }

  .card-body {
    padding: 0 12px 12px;
  }

  .point {
    gap: 10px;
    padding: 10px 0;
  }

  .point-label {
    min-width: 100px;
    font-size: 0.86rem;
  }

  .point-text {
    font-size: 0.9rem;
  }

  .code-block {
    padding: 10px 12px;
    font-size: 0.78rem;
  }
}

@media (max-width: 480px) {
  .point {
    flex-direction: column;
    gap: 6px;
  }

  .point-label {
    min-width: 0;
  }
}
</style>
