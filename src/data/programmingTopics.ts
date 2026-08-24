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
  {
    id: 18,
    title: 'Замыкания (Closures)',
    icon: '🔒',
    color: '#e17055',
    points: [
      { label: 'Суть', text: 'Функция запоминает окружение, в котором была создана.' },
      { label: 'Применение', text: 'Приватные переменные, фабричные функции.' },
      { label: 'Важно', text: 'Объектный литерал не создаёт скоуп — только функция.' },
    ],
    code: `const makeCounter = () => {\n  let count = 0;\n  return {\n    increment: () => count++,\n    getCount: () => count\n  }\n}`,
    takeaway: 'Данные спрятаны внутри функции и недоступны снаружи.',
  },
  {
    id: 19,
    title: 'Event Loop',
    icon: '🔁',
    color: '#00b894',
    points: [
      { label: 'Синхронный', text: 'Выполняется первым, блокирует поток.' },
      { label: 'Микротаски', text: 'Promise.then — выполняются сразу после синхронного.' },
      { label: 'Макротаски', text: 'setTimeout, setInterval — выполняются последними.' },
    ],
    code: `console.log('1');       // синхронный\nsetTimeout(() => console.log('2'), 0); // макротаска\nPromise.resolve().then(() => console.log('3')); // микротаска\nconsole.log('4');       // синхронный\n// Вывод: 1, 4, 3, 2`,
    takeaway: 'Синхронный → Микротаски → Макротаски.',
  },
  {
    id: 20,
    title: 'this и стрелочные функции',
    icon: '🎯',
    color: '#6c5ce7',
    points: [
      { label: 'Обычная', text: 'this зависит от того, кто вызвал функцию.' },
      { label: 'Стрелочная', text: 'this берётся из места, где функция создана.' },
      { label: 'Ловушка', text: 'Объектный литерал не создаёт скоуп для this.' },
    ],
    code: `const obj = {\n  name: 'Alex',\n  greet() { console.log(this.name) }, // 'Alex'\n  greetArrow: () => { console.log(this.name) } // undefined\n}`,
    takeaway: 'Обычная — кто вызвал. Стрелочная — где создана.',
  },
  {
    id: 21,
    title: 'REST API структура',
    icon: '🛠️',
    color: '#0984e3',
    points: [
      { label: 'GET', text: 'Получить данные. Нет body.' },
      { label: 'POST', text: 'Создать ресурс. Данные в body.' },
      { label: 'PATCH', text: 'Обновить частично. id в params, данные в body.' },
      { label: 'DELETE', text: 'Удалить. id в params, нет body.' },
    ],
    code: `// req.params — /todos/:id\n// req.body   — { text: "..." }\n// req.query  — /todos?done=true`,
    takeaway: 'params — кто, body — что, query — фильтры.',
  },
  {
    id: 22,
    title: 'Pinia Store',
    icon: '🍍',
    color: '#f9ca24',
    points: [
      { label: 'Суть', text: 'Единый источник данных для всего приложения.' },
      { label: 'Composition', text: 'defineStore с ref, computed, функциями.' },
      { label: 'Компонент', text: 'Только отображает данные и вызывает actions.' },
    ],
    code: `const useStore = defineStore('todo', () => {\n  const todos = ref([]);\n  const count = computed(() => todos.value.length);\n  const add = (text) => todos.value.push({ text });\n  return { todos, count, add };\n})`,
    takeaway: 'Компонент тупой — логика в сторе.',
  },
  {
    id: 23,
    title: 'SQL базы данных',
    icon: '🗄️',
    color: '#e17055',
    points: [
      { label: 'SELECT', text: 'Получить данные из таблицы.' },
      { label: 'INSERT', text: 'Добавить новую строку.' },
      { label: 'UPDATE', text: 'Изменить существующую строку.' },
      { label: 'DELETE', text: 'Удалить строку.' },
    ],
    code: `db.prepare('SELECT * FROM todos').all();\ndb.prepare('INSERT INTO todos (text) VALUES (?)').run(text);\ndb.prepare('UPDATE todos SET done=? WHERE id=?').run(1, id);\ndb.prepare('DELETE FROM todos WHERE id=?').run(id);`,
    takeaway: 'Всегда используй ? вместо шаблонных строк — защита от инъекций.',
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
