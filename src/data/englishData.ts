export type SectionKey = 'perfects' | 'conditionals' | 'signals' | 'mistakes'
export type ConditionalKey = 'zero' | 'first' | 'second' | 'third' | 'compare'

export type TabItem<T extends string> = {
  key: T
  label: string
}

export type CardExample = {
  className?: string
  html: string
}

export type GrammarCard = {
  title?: string
  badge?: string
  badgeClass?: string
  formula?: string
  rule?: string
  examples?: CardExample[]
}

export type ConditionalBlock =
  | {
      type: 'card'
      card: GrammarCard
    }
  | {
      type: 'warn'
      title: string
      examples: CardExample[]
    }

export const sectionTabs: TabItem<SectionKey>[] = [
  { key: 'perfects', label: 'Perfect-времена' },
  { key: 'conditionals', label: 'Conditionals' },
  { key: 'signals', label: 'Слова-подсказки' },
  { key: 'mistakes', label: 'Твои ошибки' },
]

export const conditionalTabs: TabItem<ConditionalKey>[] = [
  { key: 'zero', label: 'Zero' },
  { key: 'first', label: 'First' },
  { key: 'second', label: 'Second' },
  { key: 'third', label: 'Third' },
  { key: 'compare', label: 'Сравнение' },
]

export const perfectCards: GrammarCard[] = [
  {
    title: 'Present Perfect',
    badge: 'have/has + V3',
    badgeClass: 'badge-blue',
    formula: 'have/has + V3 (причастие)',
    rule: 'Факт или опыт в прошлом без указания конкретного времени. Важен результат сейчас, или само действие.',
    examples: [
      { html: '✅ <span class="correct">I have seen this movie.</span> (факт опыта, не важно когда)' },
      { html: '✅ <span class="correct">I have worked here for 3 years.</span> (до сих пор работаю)' },
      { html: '❌ <span class="wrong">I have seen this movie yesterday.</span> (yesterday = конкретное время → Past Simple)' },
    ],
  },
  {
    title: 'Present Perfect Continuous',
    badge: 'have been + V-ing',
    badgeClass: 'badge-blue',
    formula: 'have/has + been + V-ing',
    rule: 'Действие началось в прошлом и продолжается до сих пор. Акцент на процессе.',
    examples: [
      { html: '✅ <span class="correct">I have been working as a freelancer for 3 years.</span>' },
      { className: 'muted-note', html: '→ лучше чем "I have worked", потому что ты ещё фрилансер' },
    ],
  },
  {
    title: 'Past Simple',
    badge: 'V2 (прошедшая форма)',
    badgeClass: 'badge-warn',
    formula: 'V2 (worked / went / saw)',
    rule: 'Конкретный завершённый момент в прошлом. Обычно есть указание времени.',
    examples: [
      { html: '✅ <span class="correct">I finished the project in March.</span>' },
      { html: '✅ <span class="correct">He lost his job last month.</span>' },
    ],
  },
  {
    title: 'Past Perfect',
    badge: 'had + V3',
    badgeClass: 'badge-green',
    formula: 'had + V3',
    rule: '"Прошлое до прошлого" — одно событие случилось раньше другого. Ключевые слова: before, after, when, by the time, already.',
    examples: [
      { html: '✅ <span class="correct">When the client called, I had already sent the code.</span>' },
      { html: '✅ <span class="correct">We had studied Torah for 7 years before he left the kollel.</span>' },
      { className: 'muted-note', html: '→ "had studied" (раньше) / "left" (позже)' },
    ],
  },
]

export const perfectComparisonTable = {
  headers: ['Время', 'Когда?', 'Пример'],
  rows: [
    ['Past Simple', 'конкретный момент в прошлом', 'I saw him yesterday.'],
    ['Present Perfect', 'прошлое, важно сейчас', 'I have seen him. (уже видел)'],
    ['Pres. Perfect Cont.', 'началось в прошлом, длится', 'I have been waiting for an hour.'],
    ['Past Perfect', 'раньше другого прошлого', 'I had finished before he called.'],
  ],
}

export const conditionalSections: Record<ConditionalKey, { blocks: ConditionalBlock[] }> = {
  zero: {
    blocks: [
      {
        type: 'card',
        card: {
          title: 'Zero Conditional',
          badge: 'всегда истина',
          badgeClass: 'badge-0',
          formula: 'If + Present Simple, ... Present Simple',
          rule: 'Универсальные факты, законы природы, привычки. То, что всегда правда.',
          examples: [
            { html: '✅ <span class="correct">If you heat water to 100°C, it boils.</span>' },
            { html: '✅ <span class="correct">If I drink coffee late, I can\'t sleep.</span>' },
            { html: '✅ <span class="correct">If the server crashes, the app goes down.</span>' },
          ],
        },
      },
      {
        type: 'card',
        card: {
          rule: 'Можно заменить "if" на "when" — смысл не меняется:',
          examples: [{ html: '<span class="correct">When you heat water to 100°C, it boils.</span>' }],
        },
      },
    ],
  },
  first: {
    blocks: [
      {
        type: 'card',
        card: {
          title: 'First Conditional',
          badge: 'реальное будущее',
          badgeClass: 'badge-1',
          formula: 'If + Present Simple, ... will + verb',
          rule: 'Ситуация реальная и возможная в будущем. Есть реальный шанс, что это случится.',
          examples: [
            { html: '✅ <span class="correct">If I find a client this week, I will buy presents for the kids.</span>' },
            { html: '✅ <span class="correct">If you finish the bug fix today, we will deploy it tomorrow.</span>' },
          ],
        },
      },
      {
        type: 'warn',
        title: '⚠️ Главное правило — после IF нет WILL',
        examples: [
          { html: '❌ <span class="wrong">If I will find a client...</span>' },
          { html: '✅ <span class="correct">If I find a client...</span>' },
        ],
      },
      {
        type: 'card',
        card: {
          rule: 'Вместо will можно использовать: <span class="keyword">can, might, should, must</span>',
          examples: [{ html: '<span class="correct">If you call him now, he <span class="keyword">might</span> answer.</span>' }],
        },
      },
    ],
  },
  second: {
    blocks: [
      {
        type: 'card',
        card: {
          title: 'Second Conditional',
          badge: 'гипотетическое',
          badgeClass: 'badge-2',
          formula: 'If + Past Simple, ... would + verb',
          rule: 'Ситуация нереальная или маловероятная. Мечты, фантазии, советы ("If I were you...").',
          examples: [
            { html: '✅ <span class="correct">If I had more experience, clients would not leave me.</span>' },
            { html: '✅ <span class="correct">If I were a senior developer, I would not worry about money.</span>' },
            { html: '✅ <span class="correct">If I had no children, I would move to another country.</span>' },
          ],
        },
      },
      {
        type: 'card',
        card: {
          rule: 'С "I" формально используем <span class="keyword">were</span>, не "was":',
          examples: [
            { html: '✅ <span class="correct">If I <span class="keyword">were</span> rich...</span> (формально)' },
            { className: 'muted-note', html: 'В разговорной речи "was" тоже принято.' },
          ],
        },
      },
      {
        type: 'warn',
        title: '⚠️ После IF нет WOULD',
        examples: [
          { html: '❌ <span class="wrong">If I would have more time...</span>' },
          { html: '✅ <span class="correct">If I had more time...</span>' },
        ],
      },
    ],
  },
  third: {
    blocks: [
      {
        type: 'card',
        card: {
          title: 'Third Conditional',
          badge: 'прошлое нереальное',
          badgeClass: 'badge-3',
          formula: 'If + Past Perfect (had + V3), ... would have + V3',
          rule: 'Прошлое, которое уже нельзя изменить. Сожаление, размышление "что было бы если бы..."',
          examples: [
            { html: '✅ <span class="correct">If I had known Vue.js earlier, I would have gotten that job.</span>' },
            { html: '✅ <span class="correct">If I had not left that project, the client wouldn\'t have left.</span>' },
            { html: '✅ <span class="correct">If she hadn\'t called on time, we would have missed the deadline.</span>' },
          ],
        },
      },
      {
        type: 'card',
        card: {
          rule: 'Обе части могут быть отрицательными:',
          examples: [
            {
              html: '<span class="correct">If he <span class="keyword">hadn\'t</span> made that mistake, we <span class="keyword">wouldn\'t have lost</span> the client.</span>',
            },
          ],
        },
      },
      {
        type: 'warn',
        title: '⚠️ Самая частая ошибка',
        examples: [
          { html: '❌ <span class="wrong">If I would have known... / If I had have known...</span>' },
          { html: '✅ <span class="correct">If I had known...</span>' },
        ],
      },
    ],
  },
  compare: {
    blocks: [],
  },
}

export const conditionalCompareTables: {
  summary: { headers: string[]; rows: string[][] }
  oneExample: { headers: string[]; rows: string[][] }
  finalRule: { title: string; examples: CardExample[] }
} = {
  summary: {
    headers: ['Тип', 'If-часть', 'Главная часть', 'Смысл'],
    rows: [
      ['<strong>Zero</strong>', 'Present Simple', 'Present Simple', 'Всегда правда, факт'],
      ['<strong>First</strong>', 'Present Simple', 'will + V', 'Реально, возможно в будущем'],
      ['<strong>Second</strong>', 'Past Simple', 'would + V', 'Гипотетически, нереально'],
      ['<strong>Third</strong>', 'Past Perfect (had+V3)', 'would have + V3', 'Прошлое, уже не изменить'],
    ],
  },
  oneExample: {
    headers: ['Тип', 'Предложение'],
    rows: [
      ['Zero', 'If I <span class="keyword">work</span> hard, I <span class="keyword">get</span> good results.'],
      ['First', 'If I <span class="keyword">find</span> a client, I <span class="keyword">will earn</span> money.'],
      ['Second', 'If I <span class="keyword">had</span> more clients, I <span class="keyword">would earn</span> more.'],
      ['Third', 'If I <span class="keyword">had found</span> a client then, I <span class="keyword">would have earned</span> money.'],
    ],
  },
  finalRule: {
    title: '⚠️ После IF никогда не ставим WILL или WOULD',
    examples: [
      { html: '❌ <span class="wrong">If I will find... / If I would have...</span>' },
      { html: '✅ <span class="correct">If I find... / If I had... / If I had found...</span>' },
    ],
  },
}

export const signalCards = [
  {
    label: 'Present Perfect',
    rules: ['Слова-сигналы: <span class="keyword">already, yet, ever, never, just, recently, so far, for, since</span>'],
    examples: ['✅ I have <span class="keyword">already</span> finished. / Have you <span class="keyword">ever</span> been to Japan? / I haven\'t done it <span class="keyword">yet</span>.'],
  },
  {
    label: 'Past Simple',
    rules: ['Слова-сигналы: <span class="keyword">yesterday, last week/month/year, ago, in 2020, when I was...</span>'],
    examples: ['✅ I finished it <span class="keyword">last month</span>. / He left <span class="keyword">two years ago</span>.'],
  },
  {
    label: 'Past Perfect',
    rules: ['Слова-сигналы: <span class="keyword">before, after, when, by the time, already, just</span> (в контексте двух прошлых событий)'],
    examples: [
      '✅ <span class="keyword">By the time</span> he arrived, I had already left.',
      '✅ I had finished <span class="keyword">before</span> she called.',
    ],
  },
  {
    label: 'Артикли (твоя слабая зона)',
    rules: [
      '<span class="keyword">a/an</span> — впервые упоминаем, неопределённый предмет: "I am <span class="keyword">a</span> freelancer"',
      '<span class="keyword">the</span> — уже известный предмет, конкретный: "I fixed <span class="keyword">the</span> bug"',
      '<span class="keyword">без артикля</span> — профессии после "work as": "I work as <span class="keyword">a</span> developer" (НЕ без артикля!)',
    ],
    examples: ['❌ <span class="wrong">I work as freelancer</span> → ✅ <span class="correct">I work as a freelancer</span>'],
  },
]

export const mistakesTable = {
  headers: ['Твой вариант', 'Правильно', 'Почему'],
  rows: [
    ['I saw this movie before', 'I have seen this movie before', 'нет конкретного времени → Present Perfect'],
    ['If I will have more time', 'If I had more time', 'will после if запрещено + это Second Conditional'],
    ['He don\'t like coffee', 'He doesn\'t like coffee', 'для he/she/it → doesn\'t'],
    ['I work as freelancer for 3 years', 'I have been working as a freelancer for 3 years', 'артикль "a" + Pres. Perfect Cont. (длится сейчас)'],
    ['I had already forgot', 'I had already forgotten', 'forget → forgot → forgotten (V3)'],
    ['I would be worryed', 'I would be worried', 'worry → worried (y → ied)'],
    ['he had already leaven', 'he had already left', 'leave → left → left (неправильный глагол)'],
  ],
}

export const irregularVerbsTable = {
  headers: ['Base', 'Past Simple (V2)', 'Past Participle (V3)'],
  rows: [
    ['forget', 'forgot', 'forgotten'],
    ['leave', 'left', 'left'],
    ['lose', 'lost', 'lost'],
    ['write', 'wrote', 'written'],
    ['send', 'sent', 'sent'],
    ['find', 'found', 'found'],
    ['give', 'gave', 'given'],
    ['know', 'knew', 'known'],
    ['take', 'took', 'taken'],
    ['see', 'saw', 'seen'],
  ],
}