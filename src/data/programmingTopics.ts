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

  // 🔥 НОВЫЕ ТЕМЫ

  {
    id: 11,
    title: 'HTTP-модуль Node.js',
    icon: '🌐',
    color: '#2ecc71',
    points: [
      { label: 'Суть', text: 'Базовый модуль Node.js для создания серверов без Express.' },
      { label: 'Потоки', text: 'Запросы и ответы — это streams, приходят кусками.' },
      { label: 'Гибкость', text: 'Express — это просто удобная обёртка над http.' },
    ],
    code: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.end('Hello');\n});\n\nserver.listen(3000);`,
    takeaway: 'Понимание http-модуля даёт контроль над сервером на низком уровне.',
  },
  {
    id: 12,
    title: 'Middleware-цепочка',
    icon: '🧩',
    color: '#9b59b6',
    points: [
      { label: 'Суть', text: 'Функции, которые выполняются до обработчика маршрута.' },
      { label: 'next()', text: 'Передаёт управление следующему middleware.' },
      { label: 'Гибкость', text: 'Можно останавливать запрос, модифицировать req/res.' },
    ],
    code: `app.use((req, res, next) => {\n  console.log('Middleware');\n  next();\n});`,
    takeaway: 'Middleware — фундамент Express и любого фреймворка.',
  },
  {
    id: 13,
    title: 'JSON Parser',
    icon: '📦',
    color: '#1abc9c',
    points: [
      { label: 'Проблема', text: 'Тело запроса приходит потоками, а не готовым объектом.' },
      { label: 'Решение', text: 'Собрать chunks, дождаться конца, распарсить JSON.' },
      { label: 'Использование', text: 'Добавляет req.body в фреймворк.' },
    ],
    code: `req.on('data', chunk => data += chunk);\nreq.on('end', () => req.body = JSON.parse(data));`,
    takeaway: 'Это то, что делает express.json() под капотом.',
  },
  {
    id: 14,
    title: 'URL-encoded Parser',
    icon: '🔤',
    color: '#e84393',
    points: [
      { label: 'Формат', text: 'Строка вида key=value&key2=value2.' },
      { label: 'Использование', text: 'HTML-формы по умолчанию отправляют URL-encoded.' },
      { label: 'Парсинг', text: 'split("&"), split("="), decodeURIComponent.' },
    ],
    code: `const pairs = data.split('&');\nfor (const p of pairs) {\n  const [k, v] = p.split('=');\n  result[decodeURIComponent(k)] = decodeURIComponent(v);\n}`,
    takeaway: 'Это аналог express.urlencoded().',
  },
  {
    id: 15,
    title: 'Функции как объекты',
    icon: '🧠',
    color: '#fdcb6e',
    points: [
      { label: 'Суть', text: 'В JS функция — это объект, ей можно добавлять свойства.' },
      { label: 'Фреймворки', text: 'Express — это функция с методами (get, post, listen).' },
      { label: 'Гибкость', text: 'Позволяет создавать собственные мини-фреймворки.' },
    ],
    code: `function app() {}\napp.get = () => {};\napp.listen = () => {};`,
    takeaway: 'Понимание этого — ключ к созданию своих библиотек.',
  },
  {
    id: 16,
    title: 'Динамические маршруты',
    icon: '🛣️',
    color: '#6c5ce7',
    points: [
      { label: 'Суть', text: 'Маршрут содержит переменные части: /users/:id.' },
      { label: 'Разбор', text: 'Сравнение частей пути, извлечение параметров.' },
      { label: 'Результат', text: 'req.params = { id: "42" }.' },
    ],
    code: `const parts = path.split('/');\nif (routePart.startsWith(':')) params[name] = value;`,
    takeaway: 'Это то, как Express делает req.params.',
  },
  {
    id: 17,
    title: 'Регулярки для маршрутов',
    icon: '📐',
    color: '#0984e3',
    points: [
      { label: 'Суть', text: 'Регулярки позволяют сопоставлять шаблон маршрута с URL.' },
      { label: 'Параметры', text: '([^/]+) — динамическая часть пути.' },
      { label: 'Границы', text: '^ начало, $ конец строки.' },
    ],
    code: `^/users/([^/]+)$`,
    takeaway: 'Регулярки — основа динамических маршрутов Express.',
  },
]

export const programmingExtraTopics: ProgrammingTopic[] = [
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
