<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

const ChemConspectView = defineAsyncComponent(() => import('./ChemConspectView.vue'))
const WaterIceDemoView = defineAsyncComponent(() => import('./WaterIceDemoView.vue'))

type ChemistryTab = 'conspect' | 'demo'

const activeTab = ref<ChemistryTab>('conspect')
</script>

<template>
  <main class="chem-page study-wrap">
    <h1 class="study-main-title">Химия</h1>
    <p class="chem-subtitle study-subtitle">Конспекты и визуализация по воде, льду, связям и структуре молекул.</p>

    <div class="chem-tabs study-tabs">
      <button class="chem-tab study-tab" :class="{ active: activeTab === 'conspect' }" @click="activeTab = 'conspect'">Конспект 01</button>
      <button class="chem-tab study-tab" :class="{ active: activeTab === 'demo' }" @click="activeTab = 'demo'">Вода vs Лёд</button>
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
.chem-tabs {
  margin-bottom: 1rem;
}

.chem-tab {
  font-weight: 600;
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