<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { shoulderBonusNote, workoutPatterns, workoutWeek } from '../data/workoutData'

const WorkoutBodySvg = defineAsyncComponent(() => import('../components/WorkoutBodySvg.vue'))

type MainSection = 'anatomy' | 'program'

type BodyView = 'front' | 'back'

type WorkoutMode = 'full' | 'min'

const weekdayIds = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const
const workoutProgressStorageKey = 'moosebroLab.workouts.progress'

const getCurrentWeekdayId = () => weekdayIds[new Date().getDay()]

const getTodayKey = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const readStoredProgress = () => {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const rawValue = window.localStorage.getItem(workoutProgressStorageKey)
    if (!rawValue) {
      return {}
    }

    const parsed = JSON.parse(rawValue) as { date?: string; state?: Record<string, boolean> }
    return parsed.date === getTodayKey() && parsed.state ? parsed.state : {}
  } catch {
    return {}
  }
}

const saveStoredProgress = (state: Record<string, boolean>) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    workoutProgressStorageKey,
    JSON.stringify({
      date: getTodayKey(),
      state,
    }),
  )
}

const activeSection = ref<MainSection>('anatomy')
const bodyView = ref<BodyView>('front')
const activePatternId = ref(workoutPatterns[0]?.id ?? '')
const activeDayId = ref<string>(getCurrentWeekdayId())
const workoutMode = ref<WorkoutMode>('full')
const doneState = ref<Record<string, boolean>>(readStoredProgress())

const currentWeekdayLabel = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' })
  .format(new Date())
  .replace(/^./, (char) => char.toUpperCase())

const programTabLabel = `Программа · ${currentWeekdayLabel}`

const activePattern = computed(() => workoutPatterns.find((item) => item.id === activePatternId.value) ?? workoutPatterns[0])
const activeDay = computed(() => workoutWeek.find((item) => item.id === activeDayId.value) ?? workoutWeek[0])

const activeExercises = computed(() => {
  const day = activeDay.value
  if (!day || day.rest) {
    return []
  }
  if (workoutMode.value === 'min' && day.min?.length) {
    return day.min
  }
  return day.ex ?? []
})

const setPattern = (patternId: string) => {
  const pattern = workoutPatterns.find((item) => item.id === patternId)
  if (!pattern) {
    return
  }
  activePatternId.value = pattern.id
  bodyView.value = pattern.view
}

const openProgramSection = () => {
  activeSection.value = 'program'
  activeDayId.value = getCurrentWeekdayId()
}

const setDay = (dayId: string) => {
  activeDayId.value = dayId
}

const setMode = (mode: WorkoutMode) => {
  workoutMode.value = mode
}

const getExerciseKey = (dayId: string, mode: WorkoutMode, index: number) => `${dayId}-${mode}-${index}`

const toggleExercise = (dayId: string, index: number) => {
  const key = getExerciseKey(dayId, workoutMode.value, index)
  doneState.value[key] = !doneState.value[key]
}

const isExerciseDone = (dayId: string, index: number) => !!doneState.value[getExerciseKey(dayId, workoutMode.value, index)]

let dayChangeTimer: number | undefined

watch(
  doneState,
  (state) => {
    saveStoredProgress(state)
  },
  { deep: true },
)

onMounted(() => {
  dayChangeTimer = window.setInterval(() => {
    if (readStoredProgress() && Object.keys(readStoredProgress()).length === 0) {
      doneState.value = {}
    }
  }, 60 * 1000)
})

onBeforeUnmount(() => {
  if (dayChangeTimer) {
    window.clearInterval(dayChangeTimer)
  }
})
</script>

<template>
  <main class="workouts-page study-wrap">
    <div class="hero study-card">
      <p class="hero-eyebrow">Домашняя система · вес тела</p>
      <h1 class="hero-title">Тело как <span>система рычагов</span>, а не набор мышц</h1>
      <p class="hero-subtitle">Сначала какие движения запускают какие мышцы. Потом неделя, в которой это живет: без турника, без зала, каждый день понемногу.</p>
    </div>

    <nav class="section-nav study-tabs">
      <button class="study-tab" :class="{ active: activeSection === 'anatomy' }" @click="activeSection = 'anatomy'">Анатомия</button>
      <button class="study-tab" :class="{ active: activeSection === 'program' }" @click="openProgramSection">{{ programTabLabel }}</button>
    </nav>

    <section v-show="activeSection === 'anatomy'" class="content-section">
      <h2 class="study-main-title section-title">Анатомия по паттернам движения</h2>
      <p class="section-lede">Выбери паттерн: на схеме подсветится, что работает. Это не мышца ради мышцы, а движение и его механика.</p>

      <div class="anatomy-grid">
        <div class="body-wrap study-card">
          <div class="view-toggle study-tabs">
            <button class="study-tab" :class="{ active: bodyView === 'front' }" @click="bodyView = 'front'">Спереди</button>
            <button class="study-tab" :class="{ active: bodyView === 'back' }" @click="bodyView = 'back'">Сзади</button>
          </div>

          <WorkoutBodySvg :body-view="bodyView" :active-regions="activePattern?.regions ?? []" />
        </div>

        <div>
          <div class="patterns-grid">
            <button
              v-for="pattern in workoutPatterns"
              :key="pattern.id"
              class="study-tab pattern-btn"
              :class="{ active: activePattern?.id === pattern.id }"
              @click="setPattern(pattern.id)"
            >
              <span class="num">{{ pattern.num }}</span>
              {{ pattern.name }}
            </button>
          </div>

          <article v-if="activePattern" class="pattern-detail study-card">
            <h3>{{ activePattern.name }}</h3>
            <p>{{ activePattern.text }}</p>
            <div class="muscle-list">
              <span v-for="muscle in activePattern.muscles" :key="muscle">{{ muscle }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section v-show="activeSection === 'program'" class="content-section">
      <h2 class="study-main-title section-title">Недельная программа</h2>
      <p class="section-lede">Вс-Чт активные дни. Пт и Сб по самочувствию: легкий формат или полный отдых.</p>

      <div class="mode-toggle">
        <button class="study-tab" :class="{ active: workoutMode === 'full' }" @click="setMode('full')">Полная программа</button>
        <button class="study-tab" :class="{ active: workoutMode === 'min' }" @click="setMode('min')">Минимум</button>
        <span v-if="workoutMode === 'min'" class="mode-hint">— короткая версия из знакомых упражнений, без раздумий</span>
      </div>

      <div class="study-tabs day-tabs">
        <button
          v-for="day in workoutWeek"
          :key="day.id"
          class="study-tab day-tab"
          :class="{ active: activeDay?.id === day.id, rest: day.rest }"
          @click="setDay(day.id)"
        >
          {{ day.label }}
        </button>
      </div>

      <div v-if="activeDay" class="day-panel">
        <h3 class="day-title">{{ activeDay.title }}</h3>
        <p class="day-focus">{{ activeDay.focus }}<template v-if="!activeDay.rest && workoutMode === 'min'"> · минимум</template></p>

        <div v-if="activeDay.rest" class="rest-note study-card">{{ activeDay.note }}</div>

        <div v-else class="exlist">
          <div
            v-for="(exercise, index) in activeExercises"
            :key="`${activeDay.id}-${workoutMode}-${exercise.n}`"
            class="ex study-card"
            :class="{ done: isExerciseDone(activeDay.id, index) }"
            @click="toggleExercise(activeDay.id, index)"
          >
            <div class="checkbox">{{ isExerciseDone(activeDay.id, index) ? '✓' : '' }}</div>
            <div>
              <span class="exname">{{ exercise.n }}</span>
              <span v-if="exercise.note" class="exnote">{{ exercise.note }}</span>
            </div>
            <div class="exsets">{{ exercise.s }}</div>
          </div>
        </div>
      </div>

      <article class="callout study-card">
        <h4>Про тяговые движения</h4>
        <p>Без турника полноценно закрыть тягу сложно, а это важно для осанки. Среда частично компенсирует, но при возможности дверной турник или резинка-эспандер заметно улучшат баланс программы.</p>
      </article>

      <article class="callout callout-bonus study-card">
        <h4>Бонус на плечи</h4>
        <p>{{ shoulderBonusNote }}</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.workouts-page {
  color: var(--text-primary);
}

.hero {
  margin-bottom: 1.25rem;
}

.hero-eyebrow {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-success);
  margin-bottom: 0.8rem;
  font-family: var(--font-mono);
}

.hero-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.05;
  margin: 0 0 1rem;
}

.hero-title span {
  color: var(--text-accent);
}

.hero-subtitle {
  max-width: 700px;
  color: var(--text-secondary);
  margin: 0;
}

.section-nav {
  margin-bottom: 1rem;
}

.content-section {
  margin-top: 1rem;
}

.section-title {
  font-size: 1.9rem;
  margin: 0 0 0.5rem;
  text-align: left;
}

.section-lede {
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 0 1.5rem;
}

.anatomy-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1.25rem;
}

.body-wrap {
  position: sticky;
  top: 80px;
}

.view-toggle {
  justify-content: center;
  margin-bottom: 1rem;
}

.patterns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.pattern-btn {
  text-align: left;
  font-weight: 500;
}

.pattern-btn .num {
  display: block;
  font-size: 11px;
  color: var(--text-success);
  margin-bottom: 0.3rem;
  font-family: var(--font-mono);
}

.pattern-detail h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: var(--text-accent);
}

.pattern-detail p {
  margin: 0 0 0.9rem;
  color: var(--text-primary);
}

.muscle-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.muscle-list span {
  font-size: 12px;
  border: 1px solid var(--border-strong);
  color: var(--text-accent);
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
}

.mode-toggle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.mode-hint {
  color: var(--text-secondary);
  font-size: 13px;
  margin-left: 0.2rem;
}

.day-tabs {
  margin-bottom: 1rem;
}

.day-tab.rest {
  border-style: dashed;
}

.day-tab.rest.active {
  background: var(--bg-success);
  border-color: var(--border-strong);
  color: var(--text-success);
}

.day-title {
  margin: 0 0 0.2rem;
  font-size: 1.55rem;
}

.day-focus {
  margin: 0 0 1rem;
  color: var(--text-success);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 13px;
}

.exlist {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.ex {
  display: grid;
  grid-template-columns: 28px 1fr auto;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0;
  cursor: pointer;
}

.ex.done {
  opacity: 0.5;
}

.ex.done .exname {
  text-decoration: line-through;
}

.checkbox {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid var(--border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: var(--text-accent);
  user-select: none;
}

.ex.done .checkbox {
  background: var(--bg-accent);
  border-color: var(--border-strong);
}

.exname {
  font-weight: 600;
}

.exnote {
  display: block;
  color: var(--text-secondary);
  font-size: 13px;
  margin-top: 0.1rem;
}

.exsets {
  font-size: 13px;
  color: var(--text-accent);
  white-space: nowrap;
  font-family: var(--font-mono);
}

.rest-note {
  color: var(--text-secondary);
}

.callout {
  margin-top: 1.5rem;
  border-left: 3px solid var(--text-danger);
}

.callout h4 {
  margin: 0 0 0.45rem;
  color: var(--text-danger);
  font-size: 1.1rem;
}

.callout p {
  margin: 0;
  color: var(--text-secondary);
}

.callout-bonus {
  border-left-color: var(--text-accent);
}

.callout-bonus h4 {
  color: var(--text-accent);
}

@media (max-width: 900px) {
  .anatomy-grid {
    grid-template-columns: 1fr;
  }

  .body-wrap {
    position: static;
  }
}
</style>
