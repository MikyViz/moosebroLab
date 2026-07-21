<script setup lang="ts">
import { ref } from 'vue'

type Dot = {
  x: number
  y: number
}

type Step = {
  label: string
  caption: string
}

const step = ref(0)

const steps: Step[] = [
  {
    label: 'Отдельные атомы',
    caption:
      'У кислорода 6 электронов на внешнем слое (не хватает 2 до полного комплекта из 8). У каждого водорода - по 1 электрону (не хватает 1 до полного комплекта из 2). Каждый атом "неполный" и нестабилен сам по себе.',
  },
  {
    label: 'Образование связей',
    caption:
      'Кислород кладет по одному своему электрону в общую пару с каждым водородом, а водороды кладут туда же свой единственный электрон. Пунктирный овал - это общая электронная пара, которая теперь принадлежит обоим атомам сразу.<br><br><b>Но ведь два электрона должны отталкиваться?</b> Да, отталкивание никуда не девается (закон Кулона). Но одновременно каждый электрон в этой паре притягивается сразу к <b>двум</b> ядрам - своему и чужому. Это двойное притяжение перевешивает отталкивание между самими электронами, и вся система (2 ядра + 2 электрона) оказывается в более низкоэнергетическом, выгодном состоянии, чем порознь. Природа минимизирует общую энергию системы, а не "договаривается" между электронами.<br><br>Плюс есть квантовое условие: чтобы два электрона вообще могли находиться в одной области (одной орбитали связи), у них должны быть <b>противоположные спины</b> (принцип Паули) - без этого правила такое соседство было бы запрещено, даже если бы энергетика сходилась.',
  },
  {
    label: 'Готовая молекула',
    caption:
      'Кислород теперь "видит" 8 электронов (свои 4 неподеленных + 2 общие пары по 2), каждый водород "видит" 2 (общая пара). Обе оболочки заполнены - молекула стабильна. Это и есть ковалентная связь: стабильность через совместное владение электронами, а не передачу.',
  },
  {
    label: 'Полярность',
    caption:
      'Кислород электроотрицательнее водорода - он тянет общие электроны на себя сильнее. Из-за этого у кислорода образуется небольшой избыток отрицательного заряда (d-), а у водородов - небольшой избыток положительного (d+). Молекула воды становится маленьким "магнитом" с двумя полюсами - отсюда и все дальнейшие эффекты: водородные связи, растворение солей, кислотность.',
  },
]

const oLoneDots: Dot[] = [
  { x: -16, y: -16 },
  { x: 16, y: -16 },
  { x: -16, y: 16 },
  { x: 16, y: 16 },
  { x: -22, y: 0 },
  { x: 22, y: 0 },
]

const oLoneDotsAfter: Dot[] = [
  { x: -22, y: -8 },
  { x: -22, y: 8 },
  { x: -8, y: -22 },
  { x: 8, y: -22 },
]
</script>

<template>
  <section class="covalent-wrap">
    <p class="covalent-title">Ковалентная связь O-H в молекуле воды</p>
    <p class="covalent-sub">как кислород и два водорода делят электроны, чтобы заполнить внешние оболочки</p>

    <div class="covalent-steps">
      <button v-for="(s, i) in steps" :key="i" class="covalent-step-btn" :class="{ active: step === i }" @click="step = i">{{ i + 1 }}. {{ s.label }}</button>
    </div>

    <div class="covalent-stage">
      <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg">
        <g v-if="step === 0">
          <circle cx="320" cy="170" r="34" class="atom-o-halo" />
          <circle cx="320" cy="170" r="16" class="atom-o" />
          <text x="320" y="176" text-anchor="middle" font-size="15" class="atom-label">O</text>
          <circle v-for="(p, i) in oLoneDots" :key="`o-${i}`" :cx="320 + p.x" :cy="170 + p.y" r="4" class="atom-o" />
          <text x="320" y="222" text-anchor="middle" font-size="11" class="hint-text">6 e- на внешнем слое (нужно 8)</text>

          <circle cx="120" cy="120" r="20" class="atom-h-halo" />
          <circle cx="120" cy="120" r="10" class="atom-h" />
          <text x="120" y="124" text-anchor="middle" font-size="12" class="atom-label">H</text>
          <circle cx="140" cy="120" r="4" class="atom-h" />
          <text x="120" y="160" text-anchor="middle" font-size="11" class="hint-text">1 e- (нужно 2)</text>

          <circle cx="120" cy="240" r="20" class="atom-h-halo" />
          <circle cx="120" cy="240" r="10" class="atom-h" />
          <text x="120" y="244" text-anchor="middle" font-size="12" class="atom-label">H</text>
          <circle cx="140" cy="240" r="4" class="atom-h" />
          <text x="120" y="280" text-anchor="middle" font-size="11" class="hint-text">1 e- (нужно 2)</text>
        </g>

        <g v-if="step === 1">
          <line x1="360" y1="150" x2="470" y2="90" class="bond-line" />
          <line x1="360" y1="190" x2="470" y2="250" class="bond-line" />

          <circle cx="320" cy="170" r="16" class="atom-o" />
          <text x="320" y="176" text-anchor="middle" font-size="15" class="atom-label">O</text>
          <circle v-for="(p, i) in oLoneDotsAfter" :key="`oa-${i}`" :cx="320 + p.x" :cy="170 + p.y" r="4" class="atom-o" />

          <circle cx="405" cy="120" r="4.5" class="atom-o" />
          <circle cx="415" cy="120" r="4.5" class="atom-h" />
          <ellipse cx="410" cy="120" rx="20" ry="12" class="shared-pair" />

          <circle cx="405" cy="220" r="4.5" class="atom-o" />
          <circle cx="415" cy="220" r="4.5" class="atom-h" />
          <ellipse cx="410" cy="220" rx="20" ry="12" class="shared-pair" />

          <circle cx="470" cy="90" r="10" class="atom-h" />
          <text x="470" y="94" text-anchor="middle" font-size="12" class="atom-label">H</text>
          <circle cx="470" cy="250" r="10" class="atom-h" />
          <text x="470" y="254" text-anchor="middle" font-size="12" class="atom-label">H</text>

          <text x="320" y="320" text-anchor="middle" font-size="12" class="teal-note">пунктир = общая пара электронов (ковалентная связь)</text>
        </g>

        <g v-if="step === 2">
          <line x1="320" y1="170" x2="470" y2="90" class="bond-line-strong" />
          <line x1="320" y1="170" x2="470" y2="250" class="bond-line-strong" />

          <circle cx="320" cy="170" r="18" class="atom-o" />
          <text x="320" y="176" text-anchor="middle" font-size="16" class="atom-label">O</text>
          <circle v-for="(p, i) in oLoneDotsAfter" :key="`of-${i}`" :cx="320 + p.x" :cy="170 + p.y" r="4.2" class="atom-o" />

          <circle cx="470" cy="90" r="12" class="atom-h" />
          <text x="470" y="95" text-anchor="middle" font-size="13" class="atom-label">H</text>
          <circle cx="470" cy="250" r="12" class="atom-h" />
          <text x="470" y="255" text-anchor="middle" font-size="13" class="atom-label">H</text>

          <text x="320" y="230" text-anchor="middle" font-size="12" class="o-note">O: 8 e- видит ✓</text>
          <text x="510" y="80" text-anchor="middle" font-size="11" class="h-note">H: 2 e- видит ✓</text>
          <text x="510" y="270" text-anchor="middle" font-size="11" class="h-note">H: 2 e- видит ✓</text>
        </g>

        <g v-if="step === 3">
          <line x1="320" y1="170" x2="470" y2="90" class="bond-line-strong" />
          <line x1="320" y1="170" x2="470" y2="250" class="bond-line-strong" />

          <line x1="440" y1="105" x2="345" y2="158" class="pull-arrow" marker-end="url(#arrow)" />
          <line x1="440" y1="235" x2="345" y2="182" class="pull-arrow" marker-end="url(#arrow)" />
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" class="arrow-head" />
            </marker>
          </defs>

          <circle cx="320" cy="170" r="18" class="atom-o" />
          <text x="320" y="176" text-anchor="middle" font-size="16" class="atom-label">O</text>
          <circle v-for="(p, i) in oLoneDotsAfter" :key="`op-${i}`" :cx="320 + p.x" :cy="170 + p.y" r="4.2" class="atom-o" />
          <text x="320" y="140" text-anchor="middle" font-size="13" class="red-note">d-</text>

          <circle cx="470" cy="90" r="12" class="atom-h" />
          <text x="470" y="95" text-anchor="middle" font-size="13" class="atom-label">H</text>
          <text x="495" y="70" text-anchor="middle" font-size="13" class="h-note">d+</text>

          <circle cx="470" cy="250" r="12" class="atom-h" />
          <text x="470" y="255" text-anchor="middle" font-size="13" class="atom-label">H</text>
          <text x="495" y="275" text-anchor="middle" font-size="13" class="h-note">d+</text>

          <text x="320" y="320" text-anchor="middle" font-size="12" class="red-note-strong">кислород сильнее тянет общие электроны - молекула становится полярной</text>
        </g>
      </svg>
    </div>

    <div class="covalent-legend">
      <span><i class="dot dot-o" /> кислород (O)</span>
      <span><i class="dot dot-h" /> водород (H)</span>
      <span><i class="dot dot-shared" /> общая электронная пара</span>
    </div>

    <p class="covalent-caption" v-html="steps[step]?.caption" />
  </section>
</template>

<style scoped>
.covalent-wrap {
  --paper: #f3ede0;
  --paper-line: #d9cfb4;
  --ink: #28344a;
  --ink-soft: #5b6785;
  --teal: #3d7a78;
  --teal-soft: #d9ece9;
  --red: #a13d3d;
  --white: #fdfbf5;
  --o-color: #c0433f;
  --h-color: #3d6ba1;
  font-family: Georgia, 'Times New Roman', serif;
  background:
    linear-gradient(var(--paper-line) 1px, transparent 1px) 0 0 / 100% 27px,
    var(--paper);
  color: var(--ink);
  padding: 26px 22px 32px;
  border-radius: 10px;
  max-width: 700px;
  margin: 0 auto;
}

.covalent-title {
  font-size: 21px;
  font-weight: 700;
  margin: 0 0 4px;
}

.covalent-sub {
  font-family: -apple-system, system-ui, sans-serif;
  font-size: 13px;
  color: var(--ink-soft);
  margin: 0 0 18px;
}

.covalent-steps {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  font-family: -apple-system, system-ui, sans-serif;
}

.covalent-step-btn {
  font-size: 12.5px;
  font-weight: 600;
  padding: 7px 13px;
  border-radius: 16px;
  border: 1.5px solid var(--ink);
  background: var(--white);
  color: var(--ink);
  cursor: pointer;
  transition: all 0.2s ease;
}

.covalent-step-btn.active {
  background: var(--ink);
  color: var(--white);
}

.covalent-stage {
  background: var(--white);
  border: 1.5px solid var(--ink);
  border-radius: 8px;
  padding: 6px;
  box-shadow: 3px 3px 0 var(--paper-line);
}

.covalent-stage svg {
  width: 100%;
  height: auto;
  display: block;
}

.atom-o-halo {
  fill: var(--o-color);
  opacity: 0.15;
}

.atom-h-halo {
  fill: var(--h-color);
  opacity: 0.15;
}

.atom-o {
  fill: var(--o-color);
}

.atom-h {
  fill: var(--h-color);
}

.atom-label {
  fill: white;
  font-family: Georgia, serif;
  font-weight: 700;
}

.hint-text {
  fill: var(--ink-soft);
  font-family: -apple-system, sans-serif;
}

.bond-line {
  stroke: var(--ink);
  stroke-width: 2;
}

.bond-line-strong {
  stroke: var(--ink);
  stroke-width: 3;
}

.shared-pair {
  fill: none;
  stroke: var(--teal);
  stroke-width: 1.5;
  stroke-dasharray: 3 2;
}

.teal-note {
  fill: var(--teal);
  font-family: -apple-system, sans-serif;
  font-weight: 600;
}

.o-note {
  fill: var(--o-color);
  font-family: -apple-system, sans-serif;
  font-weight: 700;
}

.h-note {
  fill: var(--h-color);
  font-family: -apple-system, sans-serif;
  font-weight: 700;
}

.pull-arrow {
  stroke: var(--red);
  stroke-width: 2;
}

.arrow-head {
  fill: var(--red);
}

.red-note {
  fill: var(--red);
  font-family: Georgia, serif;
  font-weight: 700;
}

.red-note-strong {
  fill: var(--red);
  font-family: -apple-system, sans-serif;
  font-weight: 600;
}

.covalent-legend {
  display: flex;
  gap: 18px;
  margin-top: 12px;
  flex-wrap: wrap;
  font-family: -apple-system, system-ui, sans-serif;
  font-size: 12.5px;
  color: var(--ink-soft);
}

.covalent-legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: inline-block;
}

.dot-o {
  background: var(--o-color);
}

.dot-h {
  background: var(--h-color);
}

.dot-shared {
  background: var(--teal);
  width: 14px;
  height: 14px;
  border-radius: 3px;
}

.covalent-caption {
  margin-top: 14px;
  font-size: 14.5px;
  line-height: 1.58;
  padding: 11px 14px;
  background: var(--teal-soft);
  border-left: 3px solid var(--teal);
  border-radius: 0 6px 6px 0;
}
</style>
