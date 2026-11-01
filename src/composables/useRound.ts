import { computed, onScopeDispose, ref } from 'vue'
import type { DotState, Problem, RoundMessage, RoundResult } from '../types'
import { maxDigits, valueOf } from '../lib/generator'
import { hintFor, ltr } from '../lib/hints'

const PRAISE = ['נכון!', 'מצוין!', 'כל הכבוד!', 'יפה מאוד!', 'בול!']

export function useRound() {
  const queue = ref<Problem[]>([])
  const cur = ref<Problem | null>(null)
  const buf = ref('')
  const dots = ref<DotState[]>([])
  const message = ref<RoundMessage | null>(null)
  const result = ref<RoundResult | null>(null)
  const locked = ref(false)
  const firstTry = ref(0)
  const missed = ref<Problem[]>([])
  let timer: ReturnType<typeof setTimeout> | undefined

  const stars = computed(() =>
    firstTry.value >= 9 ? 3 : firstTry.value >= 7 ? 2 : firstTry.value >= 4 ? 1 : 0,
  )

  function start(problems: Problem[]) {
    queue.value = problems.map((p) => ({ ...p }))
    dots.value = []
    firstTry.value = 0
    missed.value = []
    result.value = null
    next()
  }

  function next() {
    clearTimeout(timer)
    const p = queue.value.shift()
    if (!p) {
      cur.value = null
      result.value = { stars: stars.value, firstTry: firstTry.value, missed: missed.value }
      return
    }
    cur.value = { ...p, tries: 0 }
    buf.value = ''
    message.value = null
    locked.value = false
  }

  function press(k: string) {
    const p = cur.value
    if (!p) return
    if (locked.value) {
      if (k === 'enter' && message.value?.canSkip) next()
      return
    }
    if (k === 'back') buf.value = buf.value.slice(0, -1)
    else if (k === 'enter') check(p)
    else if (buf.value.length < maxDigits(p)) buf.value += k
  }

  function check(p: Problem) {
    if (!buf.value) return

    if (valueOf(buf.value, p.fmt) === p.ans) {
      locked.value = true
      if (!p.retry) {
        dots.value.push(p.tries === 0 ? 'ok' : 'fix')
        if (p.tries === 0) firstTry.value++
        else missed.value.push({ ...p })
      }
      message.value = {
        kind: 'ok',
        title: PRAISE[Math.floor(Math.random() * PRAISE.length)],
        body: ltr(`${p.a} ${p.op} ${p.b} = ${p.ans}`),
      }
      timer = setTimeout(next, p.tries === 0 ? 800 : 1400)
      return
    }

    p.tries++
    if (p.tries === 1) {
      buf.value = ''
      message.value = { kind: 'bad', title: 'כמעט!', body: `נסה שוב. ${hintFor(p)}` }
      return
    }

    // second miss: show the answer, then bring the problem back at the end of the round
    locked.value = true
    if (!p.retry) {
      dots.value.push('bad')
      missed.value.push({ ...p })
      queue.value.push({ ...p, tries: 0, retry: true })
    }
    message.value = { kind: 'bad', title: `התשובה הנכונה: ${p.ans}`, body: hintFor(p), canSkip: true }
  }

  onScopeDispose(() => clearTimeout(timer))

  return { cur, buf, dots, message, result, locked, start, press, next }
}
