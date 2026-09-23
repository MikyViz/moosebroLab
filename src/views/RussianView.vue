<script setup lang="ts">
import { computed, ref } from 'vue'
import { alphabetLetters, letterNames, russianWords } from '../data/russianData'

type TabKey = 'alphabet' | 'cards' | 'game'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'alphabet', label: 'Алфавит' },
  { key: 'cards', label: 'Карточки' },
  { key: 'game', label: 'Игра' },
]

const activeTab = ref<TabKey>('alphabet')

function speak(text: string) {
  try {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ru-RU'
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  } catch {
    // speech synthesis not available in this browser
  }
}

// Alphabet tab
const activeLetter = ref(alphabetLetters[0])
function pickLetter(letter: string) {
  activeLetter.value = letter
  speak(letterNames[letter])
}
function lower(letter: string) {
  return letter.toLowerCase()
}

// Flashcards tab
const cardIndex = ref(0)
const currentCard = computed(() => russianWords[cardIndex.value])
const cardPosition = computed(() => `${cardIndex.value + 1} из ${russianWords.length}`)

function renderCard() {
  speak(currentCard.value.ru)
}
function nextCard() {
  cardIndex.value = (cardIndex.value + 1) % russianWords.length
  renderCard()
}
function prevCard() {
  cardIndex.value = (cardIndex.value - 1 + russianWords.length) % russianWords.length
  renderCard()
}

// Game tab
const score = ref(0)
const gameWord = ref(russianWords[0])
const gameOptions = ref<string[]>([])
const answeredOption = ref<string | null>(null)
const correctOption = ref<string | null>(null)

function newRound() {
  answeredOption.value = null
  correctOption.value = null
  gameWord.value = russianWords[Math.floor(Math.random() * russianWords.length)]

  const options = [gameWord.value.ru]
  while (options.length < 3) {
    const word = russianWords[Math.floor(Math.random() * russianWords.length)].ru
    if (!options.includes(word)) {
      options.push(word)
    }
  }
  gameOptions.value = options.sort(() => Math.random() - 0.5)
}

function pickOption(option: string) {
  if (answeredOption.value) {
    return
  }
  answeredOption.value = option
  correctOption.value = gameWord.value.ru

  if (option === gameWord.value.ru) {
    score.value++
    speak(`Правильно! ${option}`)
  } else {
    speak(`Нет, это ${gameWord.value.ru}`)
  }
  setTimeout(newRound, 1200)
}

function optionClass(option: string) {
  if (answeredOption.value !== option) {
    return ''
  }
  return option === correctOption.value ? 'correct' : 'wrong'
}

newRound()
</script>

<template>
  <main class="wrap study-wrap">
    <h1 class="main-title study-main-title">Учим русский 🇷🇺</h1>
    <p class="study-subtitle" style="text-align: center">Три режима — для разного возраста</p>

    <div class="tabs study-tabs centered">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab study-tab"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <section v-show="activeTab === 'alphabet'" class="russian-panel">
      <div class="card study-card russian-card">
        <div class="russian-big russian-big-letters">{{ activeLetter }}{{ lower(activeLetter) }}</div>
        <div class="russian-rowbtns">
          <button class="russian-action" @click="speak(letterNames[activeLetter])">🔊 Сказать</button>
        </div>
      </div>
      <div class="russian-grid">
        <button
          v-for="letter in alphabetLetters"
          :key="letter"
          class="russian-letter"
          @click="pickLetter(letter)"
        >
          {{ letter }}{{ lower(letter) }}
        </button>
      </div>
    </section>

    <section v-show="activeTab === 'cards'" class="russian-panel">
      <div class="card study-card russian-card">
        <div class="russian-big">{{ currentCard.emoji }}</div>
        <div class="russian-word">{{ currentCard.ru }}</div>
        <div class="russian-rowbtns">
          <button class="russian-action" @click="speak(currentCard.ru)">🔊 Сказать</button>
        </div>
        <div class="russian-rowbtns">
          <button class="russian-ghost" @click="prevCard">← Назад</button>
          <button class="russian-action" @click="nextCard">Дальше →</button>
        </div>
      </div>
      <p class="russian-score">{{ cardPosition }}</p>
    </section>

    <section v-show="activeTab === 'game'" class="russian-panel">
      <div class="card study-card russian-card">
        <div class="russian-big">{{ gameWord.emoji }}</div>
        <div class="russian-options">
          <button
            v-for="option in gameOptions"
            :key="option"
            class="russian-opt"
            :class="optionClass(option)"
            @click="pickOption(option)"
          >
            {{ option }}
          </button>
        </div>
      </div>
      <p class="russian-score">Счёт: {{ score }}</p>
    </section>
  </main>
</template>

<style scoped>
.russian-panel {
  max-width: 520px;
  margin: 0 auto;
}

.russian-card {
  text-align: center;
  padding: 28px 20px;
}

.russian-big {
  font-size: 80px;
  line-height: 1;
  margin: 6px 0 14px;
}

.russian-big-letters {
  font-size: 64px;
  letter-spacing: 6px;
}

.russian-word {
  font-size: 26px;
  font-weight: 600;
  margin: 0 0 4px;
  color: var(--text-primary);
}

.russian-rowbtns {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 16px;
  flex-wrap: wrap;
}

.russian-action,
.russian-ghost {
  border-radius: var(--radius);
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
}

.russian-action {
  border: none;
  background: var(--color-success);
  color: #fff;
}

.russian-ghost {
  background: transparent;
  color: var(--color-success);
  border: 1px solid var(--color-success);
}

.russian-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-top: 16px;
}

.russian-letter {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 0;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-primary);
}

.russian-letter:active {
  background: var(--color-primary);
  color: #fff;
}

.russian-score {
  text-align: center;
  color: var(--text-muted);
  margin-top: 10px;
  font-size: 14px;
}

.russian-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 18px;
}

.russian-opt {
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  font-size: 20px;
  cursor: pointer;
  color: var(--text-primary);
}

.russian-opt.correct {
  background: var(--color-success);
  color: #fff;
  border-color: var(--color-success);
}

.russian-opt.wrong {
  background: var(--color-danger);
  color: #fff;
  border-color: var(--color-danger);
}

@media (max-width: 600px) {
  .russian-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
