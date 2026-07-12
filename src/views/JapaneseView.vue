<script setup lang="ts">
import { computed, ref } from 'vue'
import { grammarData } from '../data/grammarData'
import { hiragana, radicals } from '../data/japaneseData'

type TabKey = 'hiragana' | 'radicals' | 'grammar' | 'quiz'
type DayFilter = 'all' | 'day1' | 'day2' | 'day3' | 'day4'
type GrammarDay = 'day2' | 'day3' | 'day4'

type QuizItem = {
  ch: string
  r: string
  day: DayFilter
}

const activeTab = ref<TabKey>('hiragana')
const hiraganaFilter = ref<DayFilter>('all')
const radicalsFilter = ref<DayFilter>('all')
const grammarDay = ref<GrammarDay>('day2')

const openHiragana = ref<Set<string>>(new Set())
const openRadicals = ref<Set<string>>(new Set())

const quizFilter = ref<DayFilter>('all')
const quizItems = ref<QuizItem[]>([])
const quizIndex = ref(0)
const quizCorrect = ref(0)
const quizInput = ref('')
const quizFeedback = ref('')
const quizFeedbackClass = ref('')

const filteredHiragana = computed(() => {
  if (hiraganaFilter.value === 'all') {
    return hiragana
  }
  const day = Number(hiraganaFilter.value.replace('day', ''))
  return hiragana.filter((item) => item.day === day)
})

const filteredRadicals = computed(() => {
  if (radicalsFilter.value === 'all') {
    return radicals
  }
  const day = Number(radicalsFilter.value.replace('day', ''))
  return radicals.filter((item) => item.day === day)
})

const grammarItems = computed(() => grammarData[grammarDay.value])

const currentQuizItem = computed(() => quizItems.value[quizIndex.value] ?? null)
const quizDone = computed(() => quizIndex.value >= quizItems.value.length)
const quizProgress = computed(() => {
  if (quizDone.value) {
    return `Правильно ${quizCorrect.value} из ${quizItems.value.length}`
  }
  return `Вопрос ${quizIndex.value + 1} из ${quizItems.value.length}`
})

const toggleHiragana = (ch: string) => {
  const next = new Set(openHiragana.value)
  if (next.has(ch)) {
    next.delete(ch)
  } else {
    next.add(ch)
  }
  openHiragana.value = next
}

const toggleRadical = (ch: string) => {
  const next = new Set(openRadicals.value)
  if (next.has(ch)) {
    next.delete(ch)
  } else {
    next.add(ch)
  }
  openRadicals.value = next
}

const highlightParticles = (text: string) =>
  text
    .replace(/は/g, '<span class="particle-highlight">は</span>')
    .replace(/を/g, '<span class="particle-highlight">を</span>')
    .replace(/が/g, '<span class="particle-highlight">が</span>')

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const resetQuiz = () => {
  const base: QuizItem[] = [
    ...hiragana.map((item) => ({ ch: item.ch, r: item.r, day: `day${item.day}` as DayFilter })),
    ...radicals.map((item) => ({ ch: item.ch, r: item.r.split(' / ')[0].split(' ')[0], day: `day${item.day}` as DayFilter })),
  ]

  const filtered = quizFilter.value === 'all' ? base : base.filter((item) => item.day === quizFilter.value)

  quizItems.value = shuffle(filtered)
  quizIndex.value = 0
  quizCorrect.value = 0
  quizInput.value = ''
  quizFeedback.value = ''
  quizFeedbackClass.value = ''
}

const checkQuiz = () => {
  const item = currentQuizItem.value
  if (!item) {
    return
  }

  const answer = quizInput.value.trim().toLowerCase()
  if (answer === item.r.toLowerCase()) {
    quizCorrect.value += 1
    quizFeedback.value = '✓ Верно!'
    quizFeedbackClass.value = 'ok'
    quizInput.value = ''
    window.setTimeout(() => {
      quizIndex.value += 1
      quizFeedback.value = ''
      quizFeedbackClass.value = ''
    }, 500)
    return
  }

  quizFeedback.value = `✗ Неверно — правильный ответ: ${item.r}`
  quizFeedbackClass.value = 'bad'
}

const skipQuiz = () => {
  if (quizDone.value) {
    return
  }
  quizIndex.value += 1
  quizInput.value = ''
  quizFeedback.value = ''
  quizFeedbackClass.value = ''
}

const setQuizFilter = (filter: DayFilter) => {
  quizFilter.value = filter
  resetQuiz()
}

resetQuiz()
</script>

<template>
  <main class="jp-page">
    <div class="tabs-container">
      <button class="tab-btn" :class="{ active: activeTab === 'hiragana' }" @click="activeTab = 'hiragana'">Хирагана</button>
      <button class="tab-btn" :class="{ active: activeTab === 'radicals' }" @click="activeTab = 'radicals'">Радикалы</button>
      <button class="tab-btn" :class="{ active: activeTab === 'grammar' }" @click="activeTab = 'grammar'">Грамматика</button>
      <button class="tab-btn" :class="{ active: activeTab === 'quiz' }" @click="activeTab = 'quiz'">Проверка себя</button>
    </div>

    <section v-show="activeTab === 'hiragana'" class="panel">
      <div class="filter-container">
        <button class="filter-btn" :class="{ active: hiraganaFilter === 'all' }" @click="hiraganaFilter = 'all'">Все вместе</button>
        <button class="filter-btn" :class="{ active: hiraganaFilter === 'day1' }" @click="hiraganaFilter = 'day1'">День 1 (あ, か)</button>
        <button class="filter-btn" :class="{ active: hiraganaFilter === 'day2' }" @click="hiraganaFilter = 'day2'">День 2 (さ, た)</button>
        <button class="filter-btn" :class="{ active: hiraganaFilter === 'day3' }" @click="hiraganaFilter = 'day3'">День 3 (な, は)</button>
        <button class="filter-btn" :class="{ active: hiraganaFilter === 'day4' }" @click="hiraganaFilter = 'day4'">День 4 (ま, や)</button>
      </div>

      <div class="card-grid">
        <article v-for="item in filteredHiragana" :key="item.ch" class="card" @click="toggleHiragana(item.ch)">
          <div class="card-char">{{ item.ch }}</div>
          <div class="card-reading">{{ item.r }}</div>
          <div v-if="openHiragana.has(item.ch)" class="card-mnemonic">{{ item.mnemonic }}</div>
        </article>
      </div>
    </section>

    <section v-show="activeTab === 'radicals'" class="panel">
      <div class="filter-container">
        <button class="filter-btn" :class="{ active: radicalsFilter === 'all' }" @click="radicalsFilter = 'all'">Все вместе</button>
        <button class="filter-btn" :class="{ active: radicalsFilter === 'day1' }" @click="radicalsFilter = 'day1'">День 1 (人–山)</button>
        <button class="filter-btn" :class="{ active: radicalsFilter === 'day2' }" @click="radicalsFilter = 'day2'">День 2 (火–小)</button>
        <button class="filter-btn" :class="{ active: radicalsFilter === 'day3' }" @click="radicalsFilter = 'day3'">День 3 (月–女)</button>
        <button class="filter-btn" :class="{ active: radicalsFilter === 'day4' }" @click="radicalsFilter = 'day4'">День 4 (心–子)</button>
      </div>

      <div class="card-grid">
        <article v-for="item in filteredRadicals" :key="item.ch" class="card" @click="toggleRadical(item.ch)">
          <div class="card-char">{{ item.ch }}</div>
          <div class="card-reading">{{ item.r }} — {{ item.meaning }}</div>
          <div v-if="openRadicals.has(item.ch)" class="radical-card-mnemonic">
            <div class="mnemonic-text">{{ item.mnemonic }}</div>
          </div>
        </article>
      </div>
    </section>

    <section v-show="activeTab === 'grammar'" class="panel">
      <div class="filter-container">
        <button class="filter-btn" :class="{ active: grammarDay === 'day2' }" @click="grammarDay = 'day2'">День 2</button>
        <button class="filter-btn" :class="{ active: grammarDay === 'day3' }" @click="grammarDay = 'day3'">День 3</button>
        <button class="filter-btn" :class="{ active: grammarDay === 'day4' }" @click="grammarDay = 'day4'">День 4</button>
      </div>

      <div id="grammar-content">
        <article v-for="item in grammarItems" :key="item.topic" class="grammar-card">
          <div class="grammar-label">{{ item.topic }}</div>
          <div v-if="item.reading" class="grammar-char">{{ item.reading }}</div>
          <div class="grammar-description">{{ item.explanation }}</div>

          <div v-if="item.structure" class="grammar-structure-box">
            <div class="grammar-small-label">Структура</div>
            <div class="grammar-formula" v-html="highlightParticles(item.structure)"></div>
          </div>

          <div v-if="item.example" class="grammar-example-box">
            <div class="grammar-small-label">Пример</div>
            <div class="grammar-example" v-html="highlightParticles(item.example.jp)"></div>
            <div class="grammar-translation">{{ item.example.romaji }} — "{{ item.example.ru }}"</div>
          </div>

          <div v-if="item.notes" class="grammar-notes">
            <div class="grammar-small-label">Примечание</div>
            <div class="grammar-notes-text">{{ item.notes }}</div>
          </div>
        </article>
      </div>
    </section>

    <section v-show="activeTab === 'quiz'" class="panel">
      <div class="filter-container">
        <button class="filter-btn" :class="{ active: quizFilter === 'all' }" @click="setQuizFilter('all')">Все вместе</button>
        <button class="filter-btn" :class="{ active: quizFilter === 'day1' }" @click="setQuizFilter('day1')">День 1</button>
        <button class="filter-btn" :class="{ active: quizFilter === 'day2' }" @click="setQuizFilter('day2')">День 2</button>
        <button class="filter-btn" :class="{ active: quizFilter === 'day3' }" @click="setQuizFilter('day3')">День 3</button>
        <button class="filter-btn" :class="{ active: quizFilter === 'day4' }" @click="setQuizFilter('day4')">День 4</button>
      </div>

      <div class="quiz-container">
        <p class="quiz-progress">{{ quizProgress }}</p>
        <div class="quiz-char">{{ quizDone ? '🎉' : currentQuizItem?.ch }}</div>
        <p class="quiz-question">{{ quizDone ? 'Готово! Все знаки пройдены.' : 'Как читается этот знак?' }}</p>

        <input
          v-if="!quizDone"
          v-model="quizInput"
          type="text"
          class="quiz-input"
          placeholder="введи латиницей"
          autocomplete="off"
          @keydown.enter="checkQuiz"
        />

        <div v-if="!quizDone" class="quiz-buttons">
          <button @click="checkQuiz">Проверить</button>
          <button id="quiz-skip" @click="skipQuiz">Дальше</button>
        </div>

        <p class="quiz-feedback" :class="quizFeedbackClass">{{ quizFeedback }}</p>
      </div>

      <div class="quiz-footer">
        <span>Правильно: <span class="quiz-score">{{ quizCorrect }}</span></span>
        <button class="quiz-restart-btn" @click="resetQuiz">Начать заново</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.jp-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--color-text-primary);
  background: var(--color-background-secondary);
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.tabs-container {
  display: flex;
  gap: 8px;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--color-border-primary);
  padding-bottom: 0;
  flex-wrap: wrap;
  background: var(--color-background-primary);
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  padding: 8px 8px 0;
}

.tab-btn {
  border: none;
  border-bottom: 3px solid transparent;
  border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
  background: transparent;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.tab-btn::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-primary);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.tab-btn.active {
  color: var(--color-primary);
  background: var(--color-background-hover);
}

.tab-btn.active::before {
  transform: scaleX(1);
}

.tab-btn:hover {
  color: var(--color-text-primary);
  background: var(--color-background-hover);
}

.panel {
  background: var(--color-background-primary);
  border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
  padding: 2rem;
  animation: fadeIn 0.4s ease-out;
  box-shadow: var(--shadow-sm);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-container {
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  padding: 0.75rem;
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-primary);
}

.filter-btn {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-primary);
  background: var(--color-background-primary);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-btn:hover {
  color: var(--color-text-primary);
  border-color: var(--color-primary);
  background: var(--color-background-hover);
}

.filter-btn.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.card {
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-card);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.card-char {
  font-size: 40px;
  margin-bottom: 8px;
  font-weight: 500;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-reading {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.card-mnemonic,
.radical-card-mnemonic {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border-primary);
  text-align: left;
}

.mnemonic-text {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.grammar-card {
  background: linear-gradient(135deg, var(--color-background-secondary) 0%, var(--color-background-primary) 100%);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-primary);
}

.grammar-label {
  font-size: 12px;
  color: var(--color-primary);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.grammar-char {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.grammar-description {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.grammar-structure-box,
.grammar-example-box {
  background: var(--color-background-primary);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  margin-bottom: 16px;
  border: 1px solid var(--color-border-primary);
}

.grammar-small-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.grammar-formula {
  font-size: 20px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.grammar-example {
  font-size: 24px;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.grammar-translation {
  font-size: 15px;
  color: var(--color-text-secondary);
  font-style: italic;
}

:deep(.particle-highlight) {
  color: var(--color-text-accent);
  font-weight: 700;
}

.grammar-notes {
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  margin-top: 16px;
  border-left: 3px solid var(--color-primary);
}

.grammar-notes-text {
  font-size: 14px;
  color: var(--color-text-secondary);
}

#grammar-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.quiz-container {
  background: linear-gradient(135deg, var(--color-background-secondary) 0%, var(--color-background-primary) 100%);
  border-radius: var(--border-radius-lg);
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-primary);
}

.quiz-progress {
  font-size: 13px;
  color: var(--color-text-tertiary);
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.quiz-char {
  font-size: 72px;
  font-weight: 600;
  margin: 1.5rem 0;
}

.quiz-question {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 0 0 20px;
  font-weight: 500;
}

.quiz-input {
  text-align: center;
  max-width: 280px;
  width: 100%;
  margin: 0 auto 20px;
  display: block;
  padding: 12px 16px;
  font-size: 18px;
  border: 2px solid var(--color-border-primary);
  border-radius: var(--border-radius-md);
  background: var(--color-background-primary);
  color: var(--color-text-primary);
}

.quiz-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.quiz-buttons button {
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: var(--border-radius-md);
  border: 2px solid var(--color-primary);
  background: var(--color-primary);
  color: #fff;
  cursor: pointer;
}

#quiz-skip {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-border-primary);
}

.quiz-feedback {
  font-size: 16px;
  margin: 16px 0 0;
  min-height: 24px;
  font-weight: 600;
}

.quiz-feedback.ok {
  color: var(--color-success);
}

.quiz-feedback.bad {
  color: var(--color-danger);
}

.quiz-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border-primary);
  font-size: 14px;
  color: var(--color-text-secondary);
}

.quiz-score {
  font-weight: 700;
  color: var(--color-primary);
  font-size: 18px;
}

.quiz-restart-btn {
  font-size: 14px;
  background: transparent;
  border: 1px solid var(--color-border-primary);
  padding: 8px 16px;
  border-radius: var(--border-radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  font-weight: 600;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 640px) {
  .jp-page {
    padding: 1rem 0.5rem;
  }

  .panel {
    padding: 1.5rem 1rem;
  }

  .grammar-card,
  .quiz-container {
    padding: 1.5rem 1rem;
  }

  .quiz-char {
    font-size: 56px;
  }

  .grammar-char {
    font-size: 36px;
  }

  .tabs-container {
    padding: 4px 4px 0;
    gap: 4px;
  }

  .tab-btn {
    padding: 10px 14px;
    font-size: 13px;
  }

  .filter-container {
    gap: 6px;
    padding: 0.5rem;
  }

  .filter-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>
