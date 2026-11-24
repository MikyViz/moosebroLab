export type HiraganaItem = {
  ch: string
  r: string
  mnemonic: string
  day: 1 | 2 | 3 | 4 | 5
}

export type RadicalItem = {
  ch: string
  kun: string     // разговорное чтение (кунное), латиницей
  on: string      // чтение в составных словах (онное), латиницей
  kana: string    // кун-чтение хираганой
  meaning: string
  mnemonic: string
  day: 1 | 2 | 3 | 4 | 5
}

export type ParticleItem = {
  ch: string
  reading: string   // как читается именно в роли частицы
  name: string
  explanation: string
  example: { jp: string; romaji: string; ru: string }
  notes: string | null
}

export type VoicingItem = {
  base: string      // исходный знак
  baseR: string
  voiced: string    // знак с чёрточками
  voicedR: string
  mark: 'dakuten' | 'handakuten'
  note: string | null
}

export const hiragana: HiraganaItem[] = [
  { ch: 'あ', r: 'a', mnemonic: 'Круглая закорючка - как прописная а, а пересекающиеся полоски - похожи на поломанную букву "a"', day: 1 },
  { ch: 'い', r: 'i', mnemonic: 'Две буквы i', day: 1 },
  { ch: 'う', r: 'u', mnemonic: 'Повернутая на 90 градусов буква "u", с оторванным хвостиком.', day: 1 },
  { ch: 'え', r: 'e', mnemonic: 'Человечек на стуле чешет голову и тянет "э-э..." в растерянности — форма стула/человечка = звук неуверенности', day: 1 },
  { ch: 'お', r: 'o', mnemonic: 'Завиток-локон волос, который наматывают на палец, приговаривая "о-о-о" — завиток формы = протяжный звук', day: 1 },
  { ch: 'か', r: 'ka', mnemonic: 'Серп жнеца, который со свистом срезает траву: "ка!" — резкий звук удара', day: 1 },
  { ch: 'き', r: 'ki', mnemonic: 'Ключ (key) поворачивается в замке с щелчком "ки!" — форма ключа = звук "ki" из самого слова "key"', day: 1 },
  { ch: 'く', r: 'ku', mnemonic: 'Клюв птицы открывается и кричит "ку!" — форма клюва = звук крика', day: 1 },
  { ch: 'け', r: 'ke', mnemonic: 'Флаг на флагштоКЕ хлопает на ветру: "кэ-кэ-кэ" (как хлопки ткани)', day: 1 },
  { ch: 'こ', r: 'ko', mnemonic: 'Две КОсти стучат друг о друга: "ко-ко" — форма костей = звук стука', day: 1 },
  { ch: 'さ', r: 'sa', mnemonic: 'Снежинка падает на САсиску', day: 2 },
  { ch: 'し', r: 'shi', mnemonic: 'Тещя достает из кастрюли ЩИ"', day: 2 },
  { ch: 'す', r: 'su', mnemonic: 'Гопник говорит "СУ...!"', day: 2 },
  { ch: 'せ', r: 'se', mnemonic: 'Кто то сделал графити, буква "с" и "е" вместе, и полчилось ⋲. Потом у этой фигулины отломали верхнюю часть и она типа упала. получился знак せ', day: 2 },
  { ch: 'そ', r: 'so', mnemonic: 'Хвост СОСО', day: 2 },
  { ch: 'た', r: 'ta', mnemonic: 'Правая половина лица девочки, у которой волосы заколоты заколкой, которая улыбается, и как бы отмахиваясь говорит - "та!"', day: 2 },
  { ch: 'ち', r: 'chi', mnemonic: 'ЧИ то 5, ЧИ то 7', day: 2 },
  { ch: 'つ', r: 'tsu', mnemonic: 'Волна Хокусай обрушивается с шумом: "цу!" (от "цунами")', day: 2 },
  { ch: 'て', r: 'te', mnemonic: 'Жест рукой, который делают мароканки, когда говорят, что то типа - "Че такое, мами?!" — "te" значит "рука" по-японски, сама форма и есть подсказка', day: 2 },
  { ch: 'と', r: 'to', mnemonic: 'Птичка киви лежит на полу и показывает клювом в верх, на "то"', day: 2 },
  { ch: 'な', r: 'na', mnemonic: 'Узел-петля веревки, который завязывают со словом "на, держи"', day: 3 },
  { ch: 'に', r: 'ni', mnemonic: 'Иголка с нитью протыкает ткань двумя проколами: "ни-и-ить"', day: 3 },
  { ch: 'ぬ', r: 'nu', mnemonic: 'Смотриш на эту загагулину, и думаешь: "НУ блин..."', day: 3 },
  { ch: 'ね', r: 'ne', mnemonic: 'Нитка с узелком на конце цепляется и не пролезает в иголку: "не получается"', day: 3 },
  { ch: 'の', r: 'no', mnemonic: 'Стилизованно написанные вместе n и o', day: 3 },
  { ch: 'は', r: 'ha', mnemonic: 'Если повернуть этот знак на 90∘, похоже на строчку над которой написано "ха"', day: 3 },
  { ch: 'ひ', r: 'hi', mnemonic: 'Такой вот человек ¯\\_(ツ)_/¯ застенчиво хихикает', day: 3 },
  { ch: 'ふ', r: 'fu', mnemonic: 'Гора Фудзи (Fuji -> fu) — знак похож на гору с двумя склонами', day: 3 },
  { ch: 'へ', r: 'he', mnemonic: 'Галочка-крыша домика — ударяешься об нее лбом и выдыхаешь: "хэ!"', day: 3 },
  { ch: 'ほ', r: 'ho', mnemonic: 'Если повернуть этот знак на 90∘, похоже на строчку над которой написано "ho"', day: 3 },
  { ch: 'ま', r: 'ma', mnemonic: 'Мачта корабля с перекладиной — ветер гудит в снастях: "ма-а-а"', day: 4 },
  { ch: 'み', r: 'mi', mnemonic: 'Три волны одна за другой — смотришь на море и щуришься: "ми-и"', day: 4 },
  { ch: 'む', r: 'mu', mnemonic: 'Бык с рогами мычит: "му-у-у" — форма рогов узнается сверху', day: 4 },
  { ch: 'め', r: 'me', mnemonic: 'Козел рогатый', day: 4 },
  { ch: 'も', r: 'mo', mnemonic: 'Черьвячок Джим поднял две гантели. МОлодец, Джим!))', day: 4 },
  { ch: 'や', r: 'ya', mnemonic: 'Якорь брошен в воду — цепь натягивается со звуком: "я!"', day: 4 },
  { ch: 'ゆ', r: 'yu', mnemonic: 'Бууква Ю, а поверх нее буква J, чтобы напомнить, что это все таки японский)', day: 4 },
  { ch: 'よ', r: 'yo', mnemonic: 'ЗмеЙО говорит "йо!"', day: 4 },
  { ch: 'ら', r: 'ra', mnemonic: 'РАкета взлетает — хвост пламени загибается вниз, как хвостик знака', day: 5 },
  { ch: 'り', r: 'ri', mnemonic: 'Две травинки РИтмично качаются на ветру — "ри-ри-ри"', day: 5 },
  { ch: 'る', r: 'ru', mnemonic: 'РУлетка раскручивается в спираль — конец улетает со звуком "ру-у"', day: 5 },
  { ch: 'れ', r: 're', mnemonic: 'РЕка течёт — петля-излучина в нижней части знака', day: 5 },
  { ch: 'ろ', r: 'ro', mnemonic: 'РОт открыт — та же петля что в "ре", но без хвоста, как закрытое "о"', day: 5 },
  { ch: 'わ', r: 'wa', mnemonic: 'ВАза с изогнутым горлышком — ставишь её на стол: "ва!"', day: 5 },
  { ch: 'を', r: 'o', mnemonic: 'Особый знак — только для частицы объекта を, форма как "о" с засечкой-крышкой сверху', day: 5 },
  { ch: 'ん', r: 'n', mnemonic: 'Единственный знак без гласной — похож на "ん" как на кивок "н-да" с закрытым ртом', day: 5 },
]

export const radicals: RadicalItem[] = [
  { ch: '人', kun: 'hito',    on: 'nin / jin',    kana: 'ひと',     meaning: 'человек',         mnemonic: 'Шагающий человечек (форма = две ноги в движении)', day: 1 },
  { ch: '木', kun: 'ki',      on: 'moku / boku',  kana: 'き',       meaning: 'дерево',          mnemonic: 'Ствол с расходящимися ветвями, который пилят со звуком "ки-и-и"', day: 1 },
  { ch: '日', kun: 'hi / ka', on: 'nichi / jitsu', kana: 'ひ',      meaning: 'солнце / день',   mnemonic: 'Квадрат-солнце светит и говорит тебе "hi"', day: 1 },
  { ch: '水', kun: 'mizu',    on: 'sui',           kana: 'みず',     meaning: 'вода',            mnemonic: 'Потоки воды всасываются через трубочку со звуком "свии"', day: 1 },
  { ch: '山', kun: 'yama',    on: 'san',           kana: 'やま',     meaning: 'гора',            mnemonic: 'Три пика на горизонте — альпинист кричит "йа-ма"', day: 1 },
  { ch: '火', kun: 'hi',      on: 'ka',            kana: 'ひ',       meaning: 'огонь',           mnemonic: 'Языки пламени расходятся и вспыхивают со звуком "ка"', day: 2 },
  { ch: '土', kun: 'tsuchi',  on: 'do / to',       kana: 'つち',     meaning: 'земля',           mnemonic: 'Росток-крест пробивается из почвы с глухим стуком: "до-о"', day: 2 },
  { ch: '金', kun: 'kane',    on: 'kin / kon',     kana: 'かね',     meaning: 'золото / металл', mnemonic: 'Крыша над землей с двумя самородками-точками', day: 2 },
  { ch: '大', kun: 'ookii',   on: 'dai / tai',     kana: 'おおきい', meaning: 'большой',         mnemonic: 'Человек, широко раскинувший руки и ноги', day: 2 },
  { ch: '小', kun: 'chiisai', on: 'shou',          kana: 'ちいさい', meaning: 'маленький',       mnemonic: 'Три маленькие капли/точки падают с тихим звуком: "шшш"', day: 2 },
  { ch: '月', kun: 'tsuki',   on: 'getsu / gatsu', kana: 'つき',     meaning: 'луна / месяц',    mnemonic: 'Полумесяц с засечкой внутри — смотришь на луну и тянешь: "цуки-и"', day: 3 },
  { ch: '手', kun: 'te',      on: 'shu',           kana: 'て',       meaning: 'рука',            mnemonic: 'Три пальца расходятся от запястья — протягиваешь руку (te)', day: 3 },
  { ch: '口', kun: 'kuchi',   on: 'kou',           kana: 'くち',     meaning: 'рот',             mnemonic: 'Простой квадрат — открытый рот, который кусает что-то со звуком "ку"', day: 3 },
  { ch: '目', kun: 'me',      on: 'moku / boku',   kana: 'め',       meaning: 'глаз',            mnemonic: 'Прямоугольник с веками-чертами — прищуриваешься и говоришь "ме?"', day: 3 },
  { ch: '女', kun: 'onna',    on: 'jo / nyo',      kana: 'おんな',   meaning: 'женщина',         mnemonic: 'Изящный изгиб фигуры — кто-то восхищенно тянет: "о-он-на"', day: 3 },
  { ch: '心', kun: 'kokoro',  on: 'shin / jin',    kana: 'こころ',   meaning: 'сердце',          mnemonic: 'Три капли-удара пульса — сердце стучит: "ко-ко-ро"', day: 4 },
  { ch: '言', kun: 'iu / koto', on: 'gen / gon',   kana: 'いう',     meaning: 'слово / речь',    mnemonic: 'Рот с волнами-строчками под ним — слова льются волнами', day: 4 },
  { ch: '食', kun: 'taberu',  on: 'shoku / jiki',  kana: 'たべる',   meaning: 'еда',             mnemonic: 'Крышка над миской — открываешь крышку и вдыхаешь запах: "шо-ку"', day: 4 },
  { ch: '力', kun: 'chikara', on: 'ryoku / riki',  kana: 'ちから',   meaning: 'сила',            mnemonic: 'Согнутая рука с мышцей — напрягаешь бицепс', day: 4 },
  { ch: '子', kun: 'ko',      on: 'shi / su',      kana: 'こ',       meaning: 'ребёнок',         mnemonic: 'Маленький человечек с большой головой — зовешь его: "ко"', day: 4 },
  { ch: '田', kun: 'ta',      on: 'den',           kana: 'た',       meaning: 'рисовое поле',    mnemonic: 'Клетки рисового поля — крестьянин кричит через поле: "та-та!"', day: 5 },
  { ch: '糸', kun: 'ito',     on: 'shi',           kana: 'いと',     meaning: 'нить',            mnemonic: 'Клубок нити с узелком — нить тянется со звуком "ши-и"', day: 5 },
  { ch: '門', kun: 'kado',    on: 'mon',           kana: 'かど',     meaning: 'ворота',          mnemonic: 'Две створки ворот — стражник стоит у МОНумента-ворот', day: 5 },
  { ch: '雨', kun: 'ame',     on: 'u',             kana: 'あめ',     meaning: 'дождь',           mnemonic: 'Облако с капельками-точками под ним — дождь барабанит: "ame-ame"', day: 5 },
  { ch: '竹', kun: 'take',    on: 'chiku',         kana: 'たけ',     meaning: 'бамбук',          mnemonic: 'Два стебля бамбука с листьями — стучат друг о друга: "та-кэ"', day: 5 },
]

// ───────────── Сводка: частицы ─────────────
// Частицы — отдельные слова-«клей», которые ставятся ПОСЛЕ слова или группы слов.
// Три из них читаются не так, как пишутся: は → wa, へ → e, を → o.
export const particles: ParticleItem[] = [
  {
    ch: 'は', reading: 'wa', name: 'Тема',
    explanation: 'Показывает, о чём речь: "что касается...". Это не артикль, а маркер темы всего предложения. Часто несёт оттенок контраста.',
    example: { jp: 'わたしは がくせいです', romaji: 'watashi wa gakusei desu', ru: 'Я — студент' },
    notes: 'Как слог внутри слова は читается ha (はは — haha, "мама"), как частица — всегда wa.',
  },
  {
    ch: 'が', reading: 'ga', name: 'Субъект',
    explanation: 'Называет подлежащее, того, кто выполняет действие или обладает состоянием. Без выделения темы и без контраста.',
    example: { jp: 'ねこが ねています', romaji: 'neko ga nete imasu', ru: 'Кошка спит' },
    notes: 'は vs が: は = "что касается X...", が = "именно X" / нейтральное называние субъекта. Все нюансы сразу учить не нужно.',
  },
  {
    ch: 'を', reading: 'o', name: 'Прямой объект',
    explanation: 'Показывает, на что направлено действие: то, что едят, видят, читают.',
    example: { jp: 'ごはんを たべます', romaji: 'gohan o tabemasu', ru: 'Ем (рис / еду)' },
    notes: 'Читается o (как お), но пишется только в роли этой частицы.',
  },
  {
    ch: 'に', reading: 'ni', name: 'Место существования / направление',
    explanation: 'Где что-то находится (いる, ある) или куда направлено движение.',
    example: { jp: 'やまに いく', romaji: 'yama ni iku', ru: 'Иду на гору' },
    notes: 'いえに いる — "находиться дома". Для места, где происходит действие, используется で.',
  },
  {
    ch: 'で', reading: 'de', name: 'Место действия',
    explanation: 'Где совершается действие.',
    example: { jp: 'いえで たべる', romaji: 'ie de taberu', ru: 'Ем дома' },
    notes: 'に = где находится / куда идёшь. で = где происходит действие.',
  },
  {
    ch: 'も', reading: 'mo', name: '"Тоже"',
    explanation: 'Добавляет "тоже / также". Занимает место は, が или を.',
    example: { jp: 'わたしも がくせいです', romaji: 'watashi mo gakusei desu', ru: 'Я тоже студент' },
    notes: null,
  },
  {
    ch: 'の', reading: 'no', name: 'Принадлежность',
    explanation: 'Связывает два существительных: X の Y = "Y, принадлежащий X". Похоже на "\'s" в английском.',
    example: { jp: 'わたしの ほん', romaji: 'watashi no hon', ru: 'Моя книга' },
    notes: null,
  },
  {
    ch: 'へ', reading: 'e', name: 'Направление',
    explanation: 'Показывает направление движения, близко к に в этом значении.',
    example: { jp: 'やまへ いく', romaji: 'yama e iku', ru: 'Иду к горе' },
    notes: 'Пишется he, но как частица читается e.',
  },
]

// ───────────── Сводка: нигори и хандакутэн ─────────────
// Дакутэн ゛ (тэнтэн, две чёрточки) делает согласный ЗВОНКИМ (голос включается).
// Хандакутэн ゜ (кружок) есть только у ха-ряда и даёт звук p.
// Это не "жёстче", а звонче: k → g, s → z, t → d, h → b.
export const voicingSummary = {
  title: 'Чёрточки и кружок: звонкие и "p"-звуки',
  explanation:
    'Две чёрточки ゛ (дакутэн, тэнтэн) делают согласный звонким: при произнесении работают голосовые связки. Кружок ゜ (хандакутэн) бывает только у ха-ряда и превращает h в p. Гласная не меняется.',
  rules: [
    'か-ряд → が-ряд: k → g',
    'さ-ряд → ざ-ряд: s → z (し → じ ji)',
    'た-ряд → だ-ряд: t → d (ち → ぢ ji, つ → づ zu, редкие)',
    'は-ряд → ば-ряд: h → b',
    'は-ряд + кружок → ぱ-ряд: h → p',
  ],
  tip: 'Проверка пальцем на горле: произнеси "к", потом "г" — на "г" чувствуется вибрация. Это и есть разница между глухим и звонким.',
}

export const voicing: VoicingItem[] = [
  { base: 'か', baseR: 'ka', voiced: 'が', voicedR: 'ga', mark: 'dakuten', note: null },
  { base: 'き', baseR: 'ki', voiced: 'ぎ', voicedR: 'gi', mark: 'dakuten', note: null },
  { base: 'く', baseR: 'ku', voiced: 'ぐ', voicedR: 'gu', mark: 'dakuten', note: null },
  { base: 'け', baseR: 'ke', voiced: 'げ', voicedR: 'ge', mark: 'dakuten', note: null },
  { base: 'こ', baseR: 'ko', voiced: 'ご', voicedR: 'go', mark: 'dakuten', note: null },
  { base: 'さ', baseR: 'sa', voiced: 'ざ', voicedR: 'za', mark: 'dakuten', note: null },
  { base: 'し', baseR: 'shi', voiced: 'じ', voicedR: 'ji', mark: 'dakuten', note: null },
  { base: 'す', baseR: 'su', voiced: 'ず', voicedR: 'zu', mark: 'dakuten', note: null },
  { base: 'せ', baseR: 'se', voiced: 'ぜ', voicedR: 'ze', mark: 'dakuten', note: null },
  { base: 'そ', baseR: 'so', voiced: 'ぞ', voicedR: 'zo', mark: 'dakuten', note: null },
  { base: 'た', baseR: 'ta', voiced: 'だ', voicedR: 'da', mark: 'dakuten', note: null },
  { base: 'ち', baseR: 'chi', voiced: 'ぢ', voicedR: 'ji', mark: 'dakuten', note: 'Звучит так же, как じ, и встречается редко' },
  { base: 'つ', baseR: 'tsu', voiced: 'づ', voicedR: 'zu', mark: 'dakuten', note: 'Звучит так же, как ず, и встречается редко' },
  { base: 'て', baseR: 'te', voiced: 'で', voicedR: 'de', mark: 'dakuten', note: null },
  { base: 'と', baseR: 'to', voiced: 'ど', voicedR: 'do', mark: 'dakuten', note: null },
  { base: 'は', baseR: 'ha', voiced: 'ば', voicedR: 'ba', mark: 'dakuten', note: null },
  { base: 'ひ', baseR: 'hi', voiced: 'び', voicedR: 'bi', mark: 'dakuten', note: null },
  { base: 'ふ', baseR: 'fu', voiced: 'ぶ', voicedR: 'bu', mark: 'dakuten', note: null },
  { base: 'へ', baseR: 'he', voiced: 'べ', voicedR: 'be', mark: 'dakuten', note: null },
  { base: 'ほ', baseR: 'ho', voiced: 'ぼ', voicedR: 'bo', mark: 'dakuten', note: null },
  { base: 'は', baseR: 'ha', voiced: 'ぱ', voicedR: 'pa', mark: 'handakuten', note: null },
  { base: 'ひ', baseR: 'hi', voiced: 'ぴ', voicedR: 'pi', mark: 'handakuten', note: null },
  { base: 'ふ', baseR: 'fu', voiced: 'ぷ', voicedR: 'pu', mark: 'handakuten', note: null },
  { base: 'へ', baseR: 'he', voiced: 'ぺ', voicedR: 'pe', mark: 'handakuten', note: null },
  { base: 'ほ', baseR: 'ho', voiced: 'ぽ', voicedR: 'po', mark: 'handakuten', note: null },
]