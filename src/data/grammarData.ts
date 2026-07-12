export type GrammarEntry = {
  topic: string
  reading: string | null
  explanation: string
  structure: string | null
  example: {
    jp: string
    romaji: string
    ru: string
  } | null
  notes: string | null
}

export const grammarData: Record<'day2' | 'day3' | 'day4', GrammarEntry[]> = {
  day2: [
    {
      topic: 'は (wa) — частица темы',
      reading: 'wa',
      explanation:
        'Показывает, о чем идет речь в предложении — "что касается...". Это не артикль, а маркер темы всего высказывания.',
      structure: '[Тема] は [Информация] です',
      example: {
        jp: '私は学生です',
        romaji: 'watashi wa gakusei desu',
        ru: 'Я (что касается меня) — студент',
      },
      notes:
        'Знак は имеет два чтения: внутри слова — "ha", как частица темы — "wa".',
    },
  ],
  day3: [
    {
      topic: 'を (o) — частица прямого объекта',
      reading: 'o',
      explanation:
        'Показывает объект действия — то, над чем совершается глагол.',
      structure: '[Тема]は [Объект]を [Глагол]',
      example: {
        jp: 'パンを食べます',
        romaji: 'pan o tabemasu',
        ru: 'Ем хлеб',
      },
      notes: null,
    },
    {
      topic: 'は как омограф: частица vs слог',
      reading: 'wa (частица) / ha (слог)',
      explanation:
        'Один и тот же знак は в разных ролях читается по-разному.',
      structure: null,
      example: {
        jp: '母',
        romaji: 'haha',
        ru: '"мама" — здесь は читается как ha, это обычный слог в слове',
      },
      notes:
        'Сравнение чтений отдельной частицы は (wa) с этим словом — хороший способ закрепить разницу.',
    },
  ],
  day4: [
    {
      topic: 'が (ga) — частица субъекта',
      reading: 'ga',
      explanation:
        'Указывает на подлежащее — того, кто совершает действие.',
      structure: '[Субъект]が [Глагол / Прилагательное]',
      example: {
        jp: '猫が寝ています',
        romaji: 'neko ga nete imasu',
        ru: 'Кошка спит (именно кошка — субъект действия)',
      },
      notes: null,
    },
    {
      topic: 'は vs が — ключевое различие',
      reading: 'wa vs ga',
      explanation:
        'は выделяет тему и контраст, が просто называет субъект действия без дополнительного акцента.',
      structure: null,
      example: {
        jp: '私は学生です / 私が学生です',
        romaji: 'watashi WA gakusei desu / watashi GA gakusei desu',
        ru: 'WA: "Что касается меня — я студент". GA: "Именно я — студент".',
      },
      notes:
        'Базовая эвристика: は = тема/контраст, が = субъект.',
    },
  ],
}
