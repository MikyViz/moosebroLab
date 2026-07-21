<script setup lang="ts">
import { computed, ref } from 'vue'
import { philosophyCategories, philosophyTopics, type PhilosophyCategory } from '../data/philosophyTopics'

const activeCategory = ref<PhilosophyCategory>('Все')

const topics = computed(() => {
  if (activeCategory.value === 'Все') {
    return philosophyTopics
  }
  return philosophyTopics.filter((topic) => topic.category === activeCategory.value)
})
</script>

<template>
  <main class="study-wrap">
    <h1 class="study-main-title">Философия</h1>
    <p class="study-subtitle page-subtitle">Конспекты, практики и ментальные модели для ясного мышления.</p>

    <div class="study-tabs centered">
      <button
        v-for="category in philosophyCategories"
        :key="category"
        class="study-tab"
        :class="{ active: activeCategory === category }"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div class="cards">
      <article v-for="topic in topics" :key="topic.id" class="topic-card study-card">
        <h3 class="card-title">{{ topic.title }}</h3>

        <div v-for="point in topic.points" :key="`${topic.id}-${point.label}`" class="point-row">
          <span class="point-label">{{ point.label }}</span>
          <span class="point-text">{{ point.text }}</span>
        </div>

        <p v-if="topic.takeaway" class="takeaway">{{ topic.takeaway }}</p>
      </article>
    </div>
  </main>
</template>

<style scoped>
.page-subtitle {
  max-width: 760px;
  margin: 0.4rem auto 1.25rem;
  text-align: center;
  line-height: 1.55;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.topic-card {
  margin-bottom: 0;
}

.card-title {
  margin: 0 0 0.65rem;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.point-row {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 0.6rem;
  align-items: start;
  padding: 0.35rem 0;
}

.point-label {
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
}

.point-text {
  color: var(--text-primary);
  line-height: 1.55;
  font-size: 13px;
}

.takeaway {
  margin: 0.75rem 0 0;
  padding: 0.55rem 0.7rem;
  border-left: 2px solid var(--border-strong);
  background: var(--surface-1);
  border-radius: var(--radius);
  color: var(--text-secondary);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .cards {
    gap: 10px;
  }

  .page-subtitle {
    margin-bottom: 1rem;
  }

  .point-row {
    grid-template-columns: 1fr;
    gap: 0.2rem;
    padding: 0.4rem 0;
  }
}
</style>
