export type RussianWord = {
  ru: string
  en: string
  emoji: string
}

export const alphabetLetters: string[] = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('')

// Explicit alphabetic names, so the browser voice reads each letter the same way every time
// instead of guessing (which caused some letters to say the sound, others the letter's name).
export const letterNames: Record<string, string> = {
  А: 'а', Б: 'бэ', В: 'вэ', Г: 'гэ', Д: 'дэ', Е: 'е', Ё: 'ё', Ж: 'жэ', З: 'зэ',
  И: 'и', Й: 'и краткое', К: 'ка', Л: 'эль', М: 'эм', Н: 'эн', О: 'о', П: 'пэ',
  Р: 'эр', С: 'эс', Т: 'тэ', У: 'у', Ф: 'эф', Х: 'ха', Ц: 'цэ', Ч: 'че', Ш: 'ша',
  Щ: 'ща', Ъ: 'твёрдый знак', Ы: 'ы', Ь: 'мягкий знак', Э: 'э', Ю: 'ю', Я: 'я',
}

export const russianWords: RussianWord[] = [
  { ru: 'кот', en: 'cat', emoji: '🐱' },
  { ru: 'собака', en: 'dog', emoji: '🐶' },
  { ru: 'мама', en: 'mom', emoji: '👩' },
  { ru: 'папа', en: 'dad', emoji: '👨' },
  { ru: 'яблоко', en: 'apple', emoji: '🍎' },
  { ru: 'солнце', en: 'sun', emoji: '☀️' },
  { ru: 'вода', en: 'water', emoji: '💧' },
  { ru: 'дом', en: 'house', emoji: '🏠' },
  { ru: 'машина', en: 'car', emoji: '🚗' },
  { ru: 'рыба', en: 'fish', emoji: '🐟' },
  { ru: 'мяч', en: 'ball', emoji: '⚽' },
  { ru: 'книга', en: 'book', emoji: '📖' },
  { ru: 'молоко', en: 'milk', emoji: '🥛' },
  { ru: 'птица', en: 'bird', emoji: '🐦' },
  { ru: 'звезда', en: 'star', emoji: '⭐' },
  { ru: 'цветок', en: 'flower', emoji: '🌸' },
  { ru: 'луна', en: 'moon', emoji: '🌙' },
  { ru: 'хлеб', en: 'bread', emoji: '🍞' },
  { ru: 'медведь', en: 'bear', emoji: '🐻' },
  { ru: 'снег', en: 'snow', emoji: '❄️' },
  { ru: 'дерево', en: 'tree', emoji: '🌳' },
  { ru: 'огонь', en: 'fire', emoji: '🔥' },
  { ru: 'земля', en: 'earth', emoji: '🌍' },
  { ru: 'лось', en: 'moose', emoji: '🫎' },
  { ru: 'облако', en: 'cloud', emoji: '☁️' },
  { ru: 'дождь', en: 'rain', emoji: '🌧️' },
  { ru: 'ветер', en: 'wind', emoji: '💨' },
  { ru: 'молния', en: 'lightning', emoji: '⚡' },
  { ru: 'деньги', en: 'money', emoji: '💰' },
  { ru: 'сердце', en: 'heart', emoji: '❤️' },
  { ru: 'бобер', en: 'beaver', emoji: '🦫' },
  { ru: 'лиса', en: 'fox', emoji: '🦊' },
  { ru: 'волк', en: 'wolf', emoji: '🐺' }
]
