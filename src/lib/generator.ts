import type { CalcConfig, Fmt, Op, Problem } from '../types'

export const MULT_NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9, 10]

const rnd = (n: number) => Math.floor(Math.random() * n)
const pick = <T>(x: T, y: T): T => (Math.random() < 0.5 ? x : y)

type Rule = (a: number, b: number) => boolean

// index = level - 1
const addRules: Rule[] = [
  (a, b) => a >= 1 && b >= 1 && a + b <= 20,
  (a, b) => a >= 10 && b >= 1 && a + b <= 99 && (a % 10) + (b % 10) < 10, // no carry
  (a, b) => a >= 10 && b >= 2 && a + b <= 100 && (a % 10) + (b % 10) >= 10, // with carry
  (a, b) => a + b <= 100 && a + b > 0,
]
const subRules: Rule[] = [
  (a, b) => a <= 20 && b >= 1 && a > b,
  (a, b) => a >= 10 && b >= 1 && a > b && a % 10 >= b % 10, // no borrow
  (a, b) => a >= 10 && b >= 2 && a > b && a % 10 < b % 10, // with borrow
  (a, b) => a >= b && a > 0,
]

export function genCalc(cfg: CalcConfig): Problem {
  const op: Op = cfg.op === 'mix' ? pick<Op>('+', '−') : cfg.op === 'add' ? '+' : '−'
  const L = cfg.level - 1
  const max = L === 0 ? 20 : 100
  const rule = (op === '+' ? addRules : subRules)[L]
  let a = 0
  let b = 0
  let n = 0
  do {
    a = rnd(max + 1)
    b = rnd(max + 1)
    n++
  } while (!rule(a, b) && n < 5000)
  const fmt: Fmt = cfg.fmt === 'mix' ? pick<Fmt>('col', 'line') : cfg.fmt
  return { a, b, op, fmt, ans: op === '+' ? a + b : a - b, tries: 0, retry: false }
}

export function genMult(nums: number[]): Problem {
  const n = nums[rnd(nums.length)]
  const m = 1 + rnd(10)
  const swap = Math.random() < 0.5
  const a = swap ? m : n
  const b = swap ? n : m
  return { a, b, op: '×', fmt: 'line', ans: a * b, tries: 0, retry: false }
}

/** Builds a round of unique problems (as far as the pool allows). */
export function buildRound(make: () => Problem, size = 10): Problem[] {
  const seen = new Set<string>()
  const out: Problem[] = []
  while (out.length < size) {
    let p = make()
    let t = 0
    while (seen.has(`${p.a}${p.op}${p.b}`) && t < 30) {
      p = make()
      t++
    }
    seen.add(`${p.a}${p.op}${p.b}`)
    out.push(p)
  }
  return out
}

/** Number of digit boxes in the answer row of a column problem. */
export const answerColumns = (p: Problem) =>
  Math.max(2, String(p.a).length, String(p.b).length, String(p.ans).length)

export const maxDigits = (p: Problem) => (p.fmt === 'line' ? 3 : answerColumns(p))

/**
 * Column mode: digits are typed right-to-left (ones first),
 * so buf[0] is the ones digit, buf[1] the tens digit, etc.
 */
export function valueOf(buf: string, fmt: Fmt): number {
  if (fmt === 'line') return parseInt(buf, 10)
  return [...buf].reduce((sum, ch, i) => sum + Number(ch) * 10 ** i, 0)
}
