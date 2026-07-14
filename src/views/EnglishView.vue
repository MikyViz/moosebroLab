<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  conditionalCompareTables,
  conditionalSections,
  conditionalTabs,
  irregularVerbsTable,
  mistakesTable,
  perfectCards,
  perfectComparisonTable,
  sectionTabs,
  signalCards,
  type ConditionalKey,
  type SectionKey,
} from '../data/englishData'

const activeSection = ref<SectionKey>('perfects')
const activeConditional = ref<ConditionalKey>('zero')

const setSection = (section: SectionKey) => {
  activeSection.value = section
  if (section === 'conditionals') {
    activeConditional.value = 'zero'
  }
}

const activeConditionalBlocks = computed(() => conditionalSections[activeConditional.value].blocks)
</script>

<template>
  <main class="wrap">
    <h1 class="main-title">Английская грамматика</h1>

    <div class="tabs">
      <button
        v-for="tab in sectionTabs"
        :key="tab.key"
        class="tab"
        :class="{ active: activeSection === tab.key }"
        @click="setSection(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-show="activeSection === 'perfects'" class="section">
      <div v-for="(card, cardIndex) in perfectCards" :key="`perfect-${cardIndex}`" class="card">
        <div v-if="card.title" class="card-title">
          {{ card.title }}
          <span v-if="card.badge" class="badge" :class="card.badgeClass">{{ card.badge }}</span>
        </div>
        <div v-if="card.formula" class="formula">{{ card.formula }}</div>
        <div v-if="card.rule" class="rule" v-html="card.rule"></div>
        <div
          v-for="(example, exampleIndex) in card.examples ?? []"
          :key="`perfect-${cardIndex}-example-${exampleIndex}`"
          class="example"
          :class="example.className"
          v-html="example.html"
        ></div>
      </div>

      <div class="label">Быстрое сравнение</div>
      <table>
        <tr>
          <th v-for="(header, index) in perfectComparisonTable.headers" :key="`perfect-header-${index}`">{{ header }}</th>
        </tr>
        <tr v-for="(row, rowIndex) in perfectComparisonTable.rows" :key="`perfect-row-${rowIndex}`">
          <td v-for="(cell, cellIndex) in row" :key="`perfect-row-${rowIndex}-cell-${cellIndex}`" v-html="cell"></td>
        </tr>
      </table>
    </div>

    <div v-show="activeSection === 'conditionals'" class="section">
      <div class="subtabs">
        <button
          v-for="tab in conditionalTabs"
          :key="tab.key"
          class="subtab"
          :class="{ active: activeConditional === tab.key }"
          @click="activeConditional = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <div v-if="activeConditional !== 'compare'" class="subsection">
        <template v-for="(block, blockIndex) in activeConditionalBlocks" :key="`conditional-${activeConditional}-block-${blockIndex}`">
          <div v-if="block.type === 'card'" class="card">
            <div v-if="block.card.title" class="card-title">
              {{ block.card.title }}
              <span v-if="block.card.badge" class="badge" :class="block.card.badgeClass">{{ block.card.badge }}</span>
            </div>
            <div v-if="block.card.formula" class="formula">{{ block.card.formula }}</div>
            <div v-if="block.card.rule" class="rule" v-html="block.card.rule"></div>
            <div
              v-for="(example, exampleIndex) in block.card.examples ?? []"
              :key="`conditional-${activeConditional}-card-${blockIndex}-example-${exampleIndex}`"
              class="example"
              :class="example.className"
              v-html="example.html"
            ></div>
          </div>

          <div v-else class="warn-box">
            <div class="warn-title">{{ block.title }}</div>
            <div
              v-for="(example, exampleIndex) in block.examples"
              :key="`conditional-${activeConditional}-warn-${blockIndex}-example-${exampleIndex}`"
              class="example"
              :class="example.className"
              v-html="example.html"
            ></div>
          </div>
        </template>
      </div>

      <div v-else class="subsection">
        <div class="label">Все четыре conditional — одним взглядом</div>
        <table>
          <tr>
            <th v-for="(header, index) in conditionalCompareTables.summary.headers" :key="`cond-summary-header-${index}`">{{ header }}</th>
          </tr>
          <tr v-for="(row, rowIndex) in conditionalCompareTables.summary.rows" :key="`cond-summary-row-${rowIndex}`">
            <td v-for="(cell, cellIndex) in row" :key="`cond-summary-row-${rowIndex}-cell-${cellIndex}`" v-html="cell"></td>
          </tr>
        </table>

        <div class="label top-gap">Один пример — четыре conditional</div>
        <table>
          <tr>
            <th v-for="(header, index) in conditionalCompareTables.oneExample.headers" :key="`cond-example-header-${index}`">{{ header }}</th>
          </tr>
          <tr v-for="(row, rowIndex) in conditionalCompareTables.oneExample.rows" :key="`cond-example-row-${rowIndex}`">
            <td v-for="(cell, cellIndex) in row" :key="`cond-example-row-${rowIndex}-cell-${cellIndex}`" v-html="cell"></td>
          </tr>
        </table>

        <div class="label top-gap">Главное правило для всех</div>
        <div class="warn-box">
          <div class="warn-title">{{ conditionalCompareTables.finalRule.title }}</div>
          <div
            v-for="(example, exampleIndex) in conditionalCompareTables.finalRule.examples"
            :key="`cond-final-rule-${exampleIndex}`"
            class="example"
            :class="example.className"
            v-html="example.html"
          ></div>
        </div>
      </div>
    </div>

    <div v-show="activeSection === 'signals'" class="section">
      <template v-for="(item, itemIndex) in signalCards" :key="`signal-${itemIndex}`">
        <div class="label">{{ item.label }}</div>
        <div class="card">
          <div
            v-for="(rule, ruleIndex) in item.rules"
            :key="`signal-${itemIndex}-rule-${ruleIndex}`"
            class="rule"
            v-html="rule"
          ></div>
          <div
            v-for="(example, exampleIndex) in item.examples"
            :key="`signal-${itemIndex}-example-${exampleIndex}`"
            class="example"
            v-html="example"
          ></div>
        </div>
      </template>
    </div>

    <div v-show="activeSection === 'mistakes'" class="section">
      <div class="label">Твои типичные ошибки из теста</div>
      <table>
        <tr>
          <th v-for="(header, index) in mistakesTable.headers" :key="`mistakes-header-${index}`">{{ header }}</th>
        </tr>
        <tr v-for="(row, rowIndex) in mistakesTable.rows" :key="`mistakes-row-${rowIndex}`">
          <td
            v-for="(cell, cellIndex) in row"
            :key="`mistakes-row-${rowIndex}-cell-${cellIndex}`"
            :class="{
              'wrong keep-red': cellIndex === 0,
              'correct keep-green': cellIndex === 1,
            }"
            v-html="cell"
          ></td>
        </tr>
      </table>

      <div class="label top-gap">Неправильные глаголы, которые тебе нужны</div>
      <table>
        <tr>
          <th v-for="(header, index) in irregularVerbsTable.headers" :key="`verbs-header-${index}`">{{ header }}</th>
        </tr>
        <tr v-for="(row, rowIndex) in irregularVerbsTable.rows" :key="`verbs-row-${rowIndex}`">
          <td v-for="(cell, cellIndex) in row" :key="`verbs-row-${rowIndex}-cell-${cellIndex}`" v-html="cell"></td>
        </tr>
      </table>
    </div>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.main-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tab {
  padding: 10px 20px;
  border-radius: var(--radius);
  border: 0.5px solid var(--border-strong);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
}

.tab.active {
  background: var(--surface-2);
  color: var(--text-primary);
  border-color: var(--border-stronger);
}

.tab:hover:not(.active) {
  background: var(--surface-1);
}

.subtabs {
  display: flex;
  gap: 6px;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.subtab {
  padding: 6px 14px;
  border-radius: var(--radius);
  border: 0.5px solid var(--border);
  background: var(--surface-1);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s;
}

.subtab.active {
  background: var(--surface-2);
  color: var(--text-primary);
  border-color: var(--border-strong);
}

.subtab:hover:not(.active) {
  background: var(--surface-2);
}

.card {
  background: var(--surface-2);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.formula {
  font-family: var(--font-mono);
  font-size: 13px;
  background: var(--surface-1);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 8px 12px;
  margin: 8px 0;
  color: var(--text-accent);
  font-weight: 500;
}

.rule {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 6px 0;
  padding-left: 12px;
  border-left: 2px solid var(--border-strong);
}

.example {
  font-size: 13px;
  margin: 6px 0 6px 12px;
  color: var(--text-primary);
}

.muted-note {
  color: var(--text-muted);
  font-size: 12px;
}

.correct {
  color: var(--text-success);
  font-weight: 500;
}

.wrong {
  color: var(--text-danger);
  text-decoration: line-through;
}

.keep-red {
  color: var(--text-danger);
}

.keep-green {
  color: var(--text-success);
}

.badge {
  display: inline-block;
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 999px;
  font-weight: 600;
  margin-left: 8px;
  vertical-align: middle;
}

.badge-0 {
  background: var(--bg-accent);
  color: var(--text-accent);
}

.badge-1 {
  background: var(--bg-success);
  color: var(--text-success);
}

.badge-2 {
  background: var(--bg-warning);
  color: var(--text-warning);
}

.badge-3 {
  background: var(--bg-danger);
  color: var(--text-danger);
}

.badge-blue {
  background: var(--bg-accent);
  color: var(--text-accent);
}

.badge-green {
  background: var(--bg-success);
  color: var(--text-success);
}

.badge-warn {
  background: var(--bg-warning);
  color: var(--text-warning);
}

.warn-box {
  background: var(--bg-danger);
  border: 0.5px solid var(--border-danger);
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 1rem;
}

.warn-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-danger);
  margin-bottom: 6px;
}

.keyword {
  color: var(--text-accent);
  font-weight: 600;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-top: 8px;
  background: var(--surface-2);
  border-radius: 8px;
  overflow: hidden;
}

th {
  text-align: left;
  padding: 10px 12px;
  background: var(--surface-1);
  color: var(--text-secondary);
  font-weight: 600;
  border-bottom: 0.5px solid var(--border-strong);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

td {
  padding: 10px 12px;
  border-bottom: 0.5px solid var(--border);
  color: var(--text-primary);
  vertical-align: top;
  line-height: 1.5;
}

tr:last-child td {
  border-bottom: none;
}

.label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 1.5rem 0 0.75rem;
}

.top-gap {
  margin-top: 1.5rem;
}

@media (max-width: 600px) {
  .wrap {
    padding: 1rem 0.75rem;
  }

  .main-title {
    font-size: 22px;
  }

  .tabs {
    justify-content: flex-start;
  }

  .tab {
    font-size: 13px;
    padding: 8px 14px;
  }

  table {
    font-size: 12px;
  }

  th,
  td {
    padding: 8px 10px;
  }
}
</style>
