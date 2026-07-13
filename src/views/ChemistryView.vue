<script setup lang="ts">
import { ref } from 'vue'
import ChemConspectView from './ChemConspectView.vue'
import WaterIceDemoView from './WaterIceDemoView.vue'

type ChemistryTab = 'conspect' | 'demo'

const activeTab = ref<ChemistryTab>('conspect')
</script>

<template>
  <main class="chem-page">
    <h1>Химия</h1>
    <p class="chem-subtitle">Конспекты и визуализация по воде, льду, связям и структуре молекул.</p>

    <div class="chem-tabs">
      <button class="chem-tab" :class="{ active: activeTab === 'conspect' }" @click="activeTab = 'conspect'">Конспект 01</button>
      <button class="chem-tab" :class="{ active: activeTab === 'demo' }" @click="activeTab = 'demo'">Вода vs Лёд</button>
    </div>

    <section v-show="activeTab === 'conspect'" class="chem-panel">
      <ChemConspectView />
    </section>

    <section v-show="activeTab === 'demo'" class="chem-panel">
      <WaterIceDemoView />
    </section>
  </main>
</template>

<style scoped>
.chem-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.chem-page h1 {
  margin: 0;
  font-size: 2rem;
  color: var(--text-primary);
}

.chem-subtitle {
  margin: 0.4rem 0 1.25rem;
  color: var(--text-secondary);
}

.chem-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.chem-tab {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-1);
  color: var(--text-secondary);
  padding: 9px 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.chem-tab:hover {
  border-color: var(--border-strong);
  color: var(--text-primary);
}

.chem-tab.active {
  background: var(--bg-accent);
  border-color: var(--border-strong);
  color: var(--text-accent);
}

.chem-panel {
  border-radius: var(--border-radius-lg);
}
</style>