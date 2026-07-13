<script setup lang="ts">
import { reactive } from 'vue'

type ConspectSection = {
  title: string
  body: string
}

const sections: ConspectSection[] = [
  {
    title: 'Атом и электронные оболочки',
    body: `
      <p>Атом = ядро (протоны + нейтроны) + электроны на слоях-оболочках вокруг. Число протонов определяет элемент.</p>
      <p>Оболочки заполняются по порядку: 1-я — максимум 2 электрона, 2-я — максимум 8, и так далее. Атом стабилен, когда <b>внешняя оболочка полностью заполнена</b> (обычно 8 электронов — «правило октета»).</p>
      <div class="chem1-example">Na (натрий): 2 · 8 · 1 → на внешнем слое всего 1 электрон</div>
      <div class="chem1-callout">Если атом теряет все электроны с внешнего слоя — этот слой не остаётся «пустым», а просто перестаёт считаться. Новым внешним слоем становится предыдущий, уже полностью заполненный.</div>
    `,
  },
  {
    title: 'Периодическая таблица — не хаос, а система',
    body: `
      <p>Элементы расположены по числу протонов и по повторяющимся свойствам. Слева — металлы (мало электронов на внешнем слое, легко отдают). Справа — неметаллы (почти полный внешний слой, легко забирают недостающее).</p>
    `,
  },
  {
    title: 'Ионная связь — один отдал, другой забрал',
    body: `
      <p>Металлы «хотят» отдать 1–3 лишних электрона (это проще, чем натаскать 6–7 недостающих). Неметаллы «хотят» забрать 1–2 недостающих.</p>
      <div class="chem1-example">Na (отдаёт 1 e⁻) + Cl (принимает 1 e⁻) → Na⁺ + Cl⁻ → NaCl</div>
      <p>После обмена оба атома заряжены (стали <b>ионами</b>) — разные заряды притягиваются, это и держит их вместе.</p>
    `,
  },
  {
    title: 'Ковалентная связь — по-честному делятся',
    body: `
      <p>Вместо передачи электрона целиком — два атома кладут по одному электрону в общую пару, которая принадлежит им обоим одновременно.</p>
      <div class="chem1-example">O (не хватает 2 e⁻) + 2×H (не хватает 1 e⁻ каждому) → H₂O</div>
      <p>Кислород «видит» у себя 8 электронов (свои 6 + 2 одолженных), каждый водород «видит» 2 (свой 1 + 1 одолженный). Никто не заряжен — связь держится на общем притяжении к общим электронам.</p>
    `,
  },
  {
    title: 'Электроотрицательность и полярность молекулы',
    body: `
      <p>Кислород притягивает общие электроны сильнее водорода (выше <b>электроотрицательность</b>). Из-за этого в H₂O электроны чаще «гостят» у кислорода.</p>
      <div class="chem1-callout">Результат — небольшой перекос заряда: δ⁻ у кислорода, δ⁺ у водородов. Молекула воды похожа на крошечный магнит с двумя полюсами.</div>
    `,
  },
  {
    title: 'Водородные связи между молекулами воды',
    body: `
      <p>δ⁺ (водород) одной молекулы притягивается к δ⁻ (кислороду) соседней. Это притяжение между молекулами — <b>водородная связь</b>: слабее ковалентной, но их очень много.</p>
      <p>У каждой молекулы 4 «крепления»: 2 водорода-донора + 2 неподелённые пары электронов на кислороде как акцепторы, расположены примерно тетраэдрически (угол ≈109°).</p>
    `,
  },
  {
    title: 'Почему лёд легче воды',
    body: `
      <p>В жидкой воде тепловое движение постоянно рвёт и пересобирает водородные связи — молекулы «жульничают» и упаковываются плотнее.</p>
      <p>При замерзании движения не хватает, чтобы жульничать: каждая молекула выстраивает все 4 связи под правильным углом одновременно. Это раздвигает молекулы дальше друг от друга → получается ажурная шестиугольная решётка с пустотами.</p>
      <div class="chem1-redflag">Итог: тот же объём воды при замерзании расширяется примерно на 9%. Плотность падает — лёд плавает, а не тонет.</div>
      <p>Именно поэтому водоёмы промерзают сверху вниз, а не целиком — жизнь подо льдом продолжается зимой.</p>
    `,
  },
]

const tags = [
  'атом',
  'электронная оболочка',
  'ионная связь',
  'NaCl',
  'ковалентная связь',
  'H₂O',
  'электроотрицательность',
  'водородная связь',
  'аномалия льда',
]

const open = reactive(sections.map((_, index) => index === 0))

const toggle = (index: number) => {
  open[index] = !open[index]
}
</script>

<template>
  <section class="chem1-wrap">
    <header class="chem1-header">
      <p class="chem1-eyebrow">Конспект · химия с нуля · 01</p>
      <h2>Атомы, связи и странности воды</h2>
      <p class="chem1-meta">Атом → периодическая таблица → ионная связь → ковалентная связь → водородные связи → почему лёд плавает</p>
    </header>

    <div v-for="(section, index) in sections" :key="section.title" class="chem1-section">
      <div class="chem1-head" @click="toggle(index)">
        <span class="chem1-num">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="chem1-title">{{ section.title }}</span>
        <span class="chem1-arrow" :class="{ open: open[index] }">▶</span>
      </div>
      <div v-show="open[index]" class="chem1-body" v-html="section.body"></div>
    </div>

    <div class="chem1-taglist">
      <span v-for="tag in tags" :key="tag" class="chem1-tag">{{ tag }}</span>
    </div>
  </section>
</template>

<style scoped>
.chem1-wrap {
  --paper: #f3ede0;
  --paper-line: #d9cfb4;
  --ink: #28344a;
  --ink-soft: #5b6785;
  --teal: #3d7a78;
  --teal-soft: #d9ece9;
  --red: #a13d3d;
  --red-soft: #f1dcdc;
  --white: #fdfbf5;
  font-family: Georgia, 'Times New Roman', serif;
  background:
    linear-gradient(var(--paper-line) 1px, transparent 1px) 0 0 / 100% 27px,
    var(--paper);
  color: var(--ink);
  padding: 30px 26px 40px;
  border-radius: 10px;
  max-width: 740px;
  margin: 0 auto;
  position: relative;
}

.chem1-wrap::before {
  content: '';
  position: absolute;
  left: 52px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--red);
  opacity: 0.35;
}

.chem1-header {
  margin-bottom: 22px;
  padding-left: 34px;
}

.chem1-eyebrow {
  font-family: -apple-system, system-ui, sans-serif;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--teal);
  font-weight: 700;
  margin: 0 0 6px;
}

.chem1-header h2 {
  font-size: 25px;
  margin: 0 0 6px;
  line-height: 1.25;
}

.chem1-meta {
  font-family: -apple-system, system-ui, sans-serif;
  font-size: 12.5px;
  color: var(--ink-soft);
  margin: 0;
}

.chem1-section {
  padding-left: 34px;
  margin-bottom: 6px;
}

.chem1-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  cursor: pointer;
  padding: 11px 0;
  border-bottom: 1px solid var(--paper-line);
  user-select: none;
}

.chem1-num {
  font-family: -apple-system, system-ui, sans-serif;
  font-size: 11px;
  color: var(--red);
  font-weight: 700;
  min-width: 16px;
}

.chem1-title {
  font-size: 17px;
  font-weight: 700;
  flex: 1;
}

.chem1-arrow {
  font-family: -apple-system, system-ui, sans-serif;
  color: var(--ink-soft);
  transition: transform 0.2s ease;
  font-size: 13px;
}

.chem1-arrow.open {
  transform: rotate(90deg);
}

.chem1-body {
  font-size: 15px;
  line-height: 1.62;
  padding: 12px 4px 18px;
}

.chem1-body :deep(p) {
  margin: 0 0 10px;
}

.chem1-body :deep(b) {
  color: var(--teal);
}

.chem1-body :deep(.chem1-callout) {
  background: var(--teal-soft);
  border-left: 3px solid var(--teal);
  padding: 9px 12px;
  border-radius: 0 6px 6px 0;
  font-size: 13.5px;
  margin: 10px 0;
}

.chem1-body :deep(.chem1-redflag) {
  background: var(--red-soft);
  border-left: 3px solid var(--red);
  padding: 9px 12px;
  border-radius: 0 6px 6px 0;
  font-size: 13.5px;
  margin: 10px 0;
  font-style: italic;
}

.chem1-body :deep(.chem1-example) {
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 13px;
  background: var(--white);
  border: 1px solid var(--paper-line);
  border-radius: 6px;
  padding: 9px 12px;
  margin: 10px 0;
  display: inline-block;
}

.chem1-taglist {
  padding-left: 34px;
  margin-top: 24px;
  font-family: -apple-system, system-ui, sans-serif;
  font-size: 11.5px;
  color: var(--ink-soft);
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chem1-tag {
  border: 1px solid var(--paper-line);
  padding: 3px 9px;
  border-radius: 12px;
  background: var(--white);
}
</style>