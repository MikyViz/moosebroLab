<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { programmingBaseTopics, programmingExtraTopics } from '../data/programmingTopics'

const TopicCard = defineAsyncComponent(() => import('../components/TopicCard.vue'))

type ProgTag = 'Основа' | 'Всякое'

const activeTag = ref<ProgTag>('Основа')
const tags: ProgTag[] = ['Основа', 'Всякое']

const topics = computed(() => (activeTag.value === 'Основа' ? programmingBaseTopics : programmingExtraTopics))
</script>

<template>
  <main class="study-wrap">
    <h1 class="title">Программирование</h1>
    <p class="lead">Теги в программировании: Основа и Всякое.</p>

    <div class="tags">
      <button v-for="tag in tags" :key="tag" class="tag-btn" :class="{ active: activeTag === tag }" @click="activeTag = tag">
        {{ tag }}
      </button>
    </div>

    <div class="cards">
      <TopicCard v-for="topic in topics" :key="topic.id" :topic="topic" />
    </div>
  </main>
</template>

<style scoped>
.title {
  margin: 0;
  font-size: 2rem;
  color: var(--text-primary);
}

.lead {
  margin: 8px 0 20px;
  color: var(--text-secondary);
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.tag-btn {
  padding: 8px 16px;
  border: 1px solid var(--border-strong);
  border-radius: 20px;
  background: transparent;
  color: var(--text-accent);
  cursor: pointer;
  font-weight: 600;
}

.tag-btn.active {
  background: var(--bg-accent);
  border-color: var(--border-stronger);
  color: var(--text-primary);
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
