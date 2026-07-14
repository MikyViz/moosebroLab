export type ProgrammingTopic = {
  id: number
  title: string
  icon: string
  color: string
  points: Array<{
    label: string
    text: string
  }>
  code?: string
  complexity?: string
  takeaway?: string
}

export const programmingBaseTopics: ProgrammingTopic[] = [
  {
    id: 7,
    title: 'Хеш-таблицы (Set / Map)',
    icon: '🗂️',
    color: '#e74c3c',
    points: [
      { label: 'Что это', text: 'Ключ -> значение с быстрым доступом.' },
      { label: 'Set', text: 'Проверка наличия обычно за O(1).' },
      { label: 'Map', text: 'Удобно для частот, группировки и кэша.' },
    ],
    code: `const set2 = new Set(arr2);\nconst result = arr1.filter((n) => set2.has(n));`,
    complexity: 'O(n), операции has/set в среднем O(1)',
    takeaway: 'Set/Map - одна из самых частых оптимизаций в JS.',
  },
  {
    id: 8,
    title: 'Рекурсия',
    icon: '🔄',
    color: '#3498db',
    points: [
      { label: 'Суть', text: 'Функция вызывает саму себя.' },
      { label: 'База', text: 'Условие остановки обязательно.' },
      { label: 'Шаг', text: 'Каждый вызов должен приближать к базе.' },
    ],
    code: `function sumArray(arr) {\n  if (arr.length === 0) return 0;\n  return arr[0] + sumArray(arr.slice(1));\n}`,
    takeaway: 'Без базового случая рекурсия падает в переполнение стека.',
  },
  {
    id: 9,
    title: 'Two Pointers',
    icon: '👉',
    color: '#f39c12',
    points: [
      { label: 'Суть', text: 'Два индекса двигаются по структуре данных.' },
      { label: 'Когда', text: 'Пары, палиндромы, слияние, окна.' },
      { label: 'Правило', text: 'Двигай указатель, который приближает к условию.' },
    ],
    code: `function twoSum(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n  while (left < right) {\n    const sum = nums[left] + nums[right];\n    if (sum === target) return [left, right];\n    sum < target ? left++ : right--;\n  }\n}`,
    complexity: 'O(n) при одном проходе',
    takeaway: 'Часто заменяет двойной цикл O(n²).',
  },
]

export const programmingExtraTopics: ProgrammingTopic[] = [
  {
    id: 10,
    title: 'Race Condition',
    icon: '🏁',
    color: '#e67e22',
    points: [
      { label: 'Суть', text: 'Конкурентные операции могут породить дубль данных.' },
      { label: 'БД', text: 'Добавь UNIQUE constraint на критичные поля.' },
      { label: 'UI', text: 'Блокируй повторные клики флагом загрузки.' },
    ],
    code: `ALTER TABLE cart_items\nADD UNIQUE KEY unique_user_item (user_id, product_id);`,
    takeaway: 'Фронт снижает риск, БД гарантирует целостность.',
  },
  {
    id: 1,
    title: 'Сквозное шифрование',
    icon: '🔒',
    color: '#6d4aff',
    points: [
      { label: 'Открытый ключ', text: 'Им шифруют данные для тебя.' },
      { label: 'Закрытый ключ', text: 'Им только ты расшифровываешь.' },
      { label: 'Главное', text: 'Сервер не должен иметь доступ к закрытому ключу.' },
    ],
    takeaway: 'Даже утечка базы не раскрывает переписку без приватного ключа.',
  },
  {
    id: 2,
    title: 'Как нейросети работают с текстом',
    icon: '🧠',
    color: '#ff6b6b',
    points: [
      { label: 'Токены', text: 'Текст представляется числовыми токенами.' },
      { label: 'Эмбеддинги', text: 'Семантически близкие слова находятся рядом.' },
      { label: 'Attention', text: 'Механизм связи слов в контексте.' },
    ],
    takeaway: 'Модель не думает как человек, а вероятностно предсказывает.',
  },
  {
    id: 3,
    title: 'Галлюцинации ИИ',
    icon: '🌀',
    color: '#ffa502',
    points: [
      { label: 'Причина', text: 'Оптимизация на правдоподобие, не на истину.' },
      { label: 'RAG', text: 'Подтягивай внешние источники перед ответом.' },
      { label: 'Проверка', text: 'Факты лучше валидировать независимо.' },
    ],
    takeaway: 'Критичные данные всегда проверяй по источникам.',
  },
]
