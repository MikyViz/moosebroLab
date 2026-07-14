export type PhilosophyTopic = {
  id: number
  title: string
  icon: string
  color: string
  points: Array<{
    label: string
    text: string
  }>
  takeaway?: string
}

export const philosophyTopics: PhilosophyTopic[] = [
  {
    id: 4,
    title: 'Стоицизм',
    icon: '🏛️',
    color: '#2ed573',
    points: [
      { label: 'Дихотомия контроля', text: 'Дели все на под контролем и не под контролем.' },
      { label: 'Amor Fati', text: 'Принимай судьбу как топливо для роста.' },
      { label: 'Premeditatio Malorum', text: 'Продумай худшее заранее и снизь тревогу.' },
    ],
    takeaway: 'Счастье растет, когда перестаешь воевать с неизбежным.',
  },
  {
    id: 5,
    title: 'Восточные учения',
    icon: '🧘',
    color: '#1abc9c',
    points: [
      { label: 'Дуккха', text: 'Страдание часто рождается из привязанности.' },
      { label: 'Несуществование Я', text: 'Я можно рассматривать как поток состояний.' },
      { label: 'У-вэй', text: 'Действуй в ритме обстоятельств, без лишнего сопротивления.' },
    ],
    takeaway: 'Иногда мягкость дает больше силы, чем лобовой напор.',
  },
  {
    id: 6,
    title: 'Рефлексия',
    icon: '🪞',
    color: '#9b59b6',
    points: [
      { label: 'Суть', text: 'Мысль о своих мыслях и действиях.' },
      { label: 'Вечерний обзор', text: 'Что получилось, где ошибся, что меняю завтра.' },
      { label: '5 Почему', text: 'Повторяй почему, пока не дойдешь до корня.' },
    ],
    takeaway: 'Рефлексия без действия бесполезна; рефлексия с шагом - рост.',
  },
]
