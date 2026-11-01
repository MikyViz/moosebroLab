<script setup lang="ts">
import { ref } from 'vue'
import type { CalcConfig, Problem, RoundResult } from '../types.ts'
import { buildRound, genCalc, genMult } from '../lib/generator.ts'
import { useProgress } from '../composables/useProgress.ts'
import CalcMenu from '../components/CalcMenu.vue'
import MultMenu from '../components/MultMenu.vue'
import StudyTable from '../components/StudyTable.vue'
import GameScreen from '../components/GameScreen.vue'
import ResultScreen from '../components/ResultScreen.vue'

type Screen = 'menu' | 'study' | 'game' | 'result'

const mode = ref<'calc' | 'mult'>('calc')
const screen = ref<Screen>('menu')
const cfg = ref<CalcConfig>({ level: 2, op: 'mix', fmt: 'mix' })
const nums = ref<number[]>([2])

const problems = ref<Problem[]>([])
const result = ref<RoundResult | null>(null)
const progressKey = ref('2')
const gameKey = ref(0) // new key = fresh GameScreen for every round

const { state: progress, addRound } = useProgress()

function startRound() {
  if (mode.value === 'calc') {
    problems.value = buildRound(() => genCalc(cfg.value))
    progressKey.value = String(cfg.value.level)
  } else {
    const pool = [...nums.value]
    problems.value = buildRound(() => genMult(pool))
    progressKey.value = 'm'
  }
  gameKey.value++
  screen.value = 'game'
}

function trainNumber(n: number) {
  nums.value = [n]
  startRound()
}

function onFinish(r: RoundResult) {
  addRound(progressKey.value, r.stars)
  result.value = r
  screen.value = 'result'
}
</script>

<template>
  <main class="app" dir="rtl" lang="he">
    <template v-if="screen === 'menu'">
      <div class="tabs">
        <button type="button" :aria-pressed="mode === 'calc'" @click="mode = 'calc'">חשבון עד 100</button>
        <button type="button" :aria-pressed="mode === 'mult'" @click="mode = 'mult'">לוח הכפל</button>
      </div>
      <div class="total">⭐ {{ progress.stars }}</div>
      <CalcMenu v-if="mode === 'calc'" v-model="cfg" @start="startRound" />
      <MultMenu v-else v-model="nums" @study="screen = 'study'" @start="startRound" />
    </template>

    <StudyTable v-else-if="screen === 'study'" @back="screen = 'menu'" @train="trainNumber" />

    <GameScreen
      v-else-if="screen === 'game'"
      :key="gameKey"
      :problems="problems"
      @finish="onFinish"
      @exit="screen = 'menu'"
    />

    <ResultScreen
      v-else-if="result"
      v-bind="result"
      @again="startRound"
      @menu="screen = 'menu'"
    />
  </main>
</template>

<style scoped>
.app {
  width: min(100% - 32px, 760px);
  margin: 28px auto 40px;
  padding: 28px;
  color: var(--text-primary);
  background: linear-gradient(180deg, var(--surface-2), var(--surface-1));
  border: 1px solid var(--border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-card);
}

.app :deep(h1) {
  margin: 0;
  color: var(--text-primary);
  font-size: clamp(1.6rem, 5vw, 2rem);
  line-height: 1.25;
  text-align: center;
}

.app :deep(.sub) {
  margin: 8px 0 22px;
  color: var(--text-secondary);
  line-height: 1.6;
  text-align: center;
}

.app :deep(.tabs) {
  display: flex;
  gap: 6px;
  padding: 5px;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--border-radius-md);
}

.app :deep(.tabs button) {
  flex: 1;
  min-height: 42px;
  padding: 8px 12px;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 7px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.app :deep(.tabs button[aria-pressed='true']) {
  color: var(--text-accent);
  background: var(--surface-2);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-sm);
}

.app :deep(.total) {
  display: table;
  margin: 16px auto 22px;
  padding: 6px 14px;
  color: var(--text-accent);
  background: var(--bg-accent);
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  font-weight: 700;
}

.app :deep(.grp) {
  margin: 0 0 14px;
  padding: 16px;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--border-radius-md);
}

.app :deep(.grp h2) {
  margin: 0 0 12px;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 650;
}

.app :deep(.chips) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.app :deep(.chip),
.app :deep(.ghost) {
  min-height: 40px;
  padding: 8px 12px;
  color: var(--text-secondary);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  font: inherit;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.app :deep(.chip:hover),
.app :deep(.ghost:hover) {
  color: var(--text-primary);
  background: var(--color-background-hover);
  border-color: var(--border-stronger);
}

.app :deep(.chip[aria-pressed='true']) {
  color: var(--text-accent);
  background: var(--bg-accent);
  border-color: var(--border-stronger);
  font-weight: 700;
}

.app :deep(.chip small) {
  display: block;
  margin-top: 3px;
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 400;
}

.app :deep(.chip.num) {
  min-width: 42px;
  font-weight: 700;
}

.app :deep(.go),
.app :deep(.next) {
  min-height: 46px;
  padding: 10px 18px;
  color: #fff;
  background: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.app :deep(.go:hover),
.app :deep(.next:hover) {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  transform: translateY(-1px);
}

.app :deep(.go) {
  display: block;
  width: 100%;
  margin-top: 18px;
}

.app :deep(.go.alt) {
  color: var(--text-accent);
  background: var(--bg-accent);
  border-color: var(--border-strong);
}

.app :deep(.go.alt:hover) {
  background: var(--color-background-hover);
  border-color: var(--border-stronger);
}

.app :deep(.row) {
  display: flex;
  gap: 10px;
}

.app :deep(.row .go) {
  flex: 1;
  margin-top: 18px;
}

.app :deep(.top) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.app :deep(.dots) {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
}

.app :deep(.d) {
  width: 12px;
  height: 12px;
  background: var(--border-strong);
  border-radius: 50%;
}

.app :deep(.d.ok),
.app :deep(.d.fix) {
  background: var(--text-success);
}

.app :deep(.d.bad) {
  background: var(--text-danger);
}

.app :deep(.sheet) {
  display: grid;
  min-height: 220px;
  place-items: center;
  padding: 24px 16px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.app :deep(.problem) {
  width: 100%;
  color: var(--text-primary);
  text-align: center;
}

.app :deep(.line) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 4vw, 24px);
  font-size: clamp(2rem, 9vw, 3.5rem);
  font-weight: 700;
}

.app :deep(.ans),
.app :deep(.cell.in) {
  min-width: 1.4em;
  color: var(--text-accent);
  background: var(--bg-accent);
  border: 2px solid var(--border-strong);
  border-radius: 8px;
}

.app :deep(.ans.act),
.app :deep(.cell.in.act) {
  border-color: var(--text-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--bg-accent) 70%, transparent);
}

.app :deep(.col) {
  display: grid;
  justify-content: center;
  gap: 4px;
  margin: 0 auto;
  font-size: clamp(1.5rem, 8vw, 2.25rem);
  font-weight: 700;
}

.app :deep(.cell) {
  display: grid;
  min-height: 48px;
  place-items: center;
}

.app :deep(.cell.sign) {
  color: var(--text-accent);
}

.app :deep(.cell.rule) {
  grid-column: 2 / -1;
  min-height: 0;
  border-top: 3px solid var(--text-primary);
}

.app :deep(.tip) {
  margin: 16px 0 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.app :deep(.msg) {
  min-height: 58px;
  margin: 14px 0;
  padding: 12px 14px;
  color: var(--text-secondary);
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--border-radius-md);
  line-height: 1.5;
}

.app :deep(.msg:empty) {
  visibility: hidden;
}

.app :deep(.msg.ok) {
  color: var(--text-success);
  background: var(--bg-success);
  border-color: var(--border);
}

.app :deep(.msg.bad) {
  color: var(--text-danger);
  background: var(--bg-danger);
  border-color: var(--border-danger);
}

.app :deep(.next) {
  min-height: 40px;
  margin-top: 10px;
  padding: 7px 14px;
}

.app :deep(.pad) {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  max-width: 360px;
  margin: 0 auto;
}

.app :deep(.pad button) {
  min-height: 54px;
  color: var(--text-primary);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  font: inherit;
  font-size: 1.35rem;
  font-weight: 650;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.app :deep(.pad button:hover) {
  background: var(--color-background-hover);
  border-color: var(--border-stronger);
}

.app :deep(.pad button.enter) {
  color: #fff;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.app :deep(.tbl) {
  display: grid;
  width: 100%;
  min-height: 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 12px;
}

.app :deep(.trow) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 48px;
  padding: 8px 12px;
  color: var(--text-primary);
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font: inherit;
  font-size: 1.05rem;
  cursor: pointer;
}

.app :deep(.trow:hover) {
  background: var(--color-background-hover);
  border-color: var(--border-stronger);
}

.app :deep(.trow b) {
  color: var(--text-accent);
}

.app :deep(.trow b.hid) {
  color: transparent;
  background: var(--border-strong);
  border-radius: 4px;
  user-select: none;
}

.app :deep(.study-tip) {
  margin: 16px 0 0;
  padding: 12px 14px;
  color: var(--text-success);
  background: var(--bg-success);
  border: 1px solid var(--border);
  border-radius: var(--border-radius-md);
  line-height: 1.6;
}

.app :deep(.res) {
  padding: 8px 0;
  text-align: center;
}

.app :deep(.stars) {
  margin: 16px 0 8px;
  color: var(--text-warning);
  font-size: 2.5rem;
  letter-spacing: 0.12em;
}

.app :deep(.miss) {
  margin-top: 18px;
  padding: 14px;
  color: var(--text-secondary);
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--border-radius-md);
  line-height: 1.8;
}

.app :deep(.miss b) {
  display: block;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.app :deep(button:focus-visible) {
  outline: 3px solid var(--text-accent);
  outline-offset: 2px;
}

@media (max-width: 600px) {
  .app {
    width: calc(100% - 24px);
    margin: 16px auto 24px;
    padding: 18px 14px;
  }

  .app :deep(.grp) {
    padding: 13px;
  }

  .app :deep(.top) {
    align-items: flex-start;
  }

  .app :deep(.tbl) {
    gap: 6px;
    padding: 8px;
  }

  .app :deep(.trow) {
    min-height: 44px;
    padding: 7px 9px;
    font-size: 0.95rem;
  }
}

@media (max-width: 380px) {
  .app :deep(.row) {
    flex-direction: column-reverse;
    gap: 0;
  }

  .app :deep(.row .go) {
    margin-top: 10px;
  }

  .app :deep(.tbl) {
    grid-template-columns: 1fr;
  }
}
</style>
