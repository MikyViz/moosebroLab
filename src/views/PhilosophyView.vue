<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { philosophyTopics } from '../data/philosophyTopics'

const TopicCard = defineAsyncComponent(() => import('../components/TopicCard.vue'))
</script>

<template>
  <main class="study-wrap">
    <h1 class="title">Философия</h1>
    <p class="lead">Философские конспекты и рефлексия.</p>

    <div class="cards">
      <TopicCard v-for="topic in philosophyTopics" :key="topic.id" :topic="topic" />
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

.cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
