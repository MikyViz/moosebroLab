import type { Problem } from '../types'

/** Wraps an expression in LTR isolates so it keeps its order inside Hebrew text. */
export const ltr = (s: string) => `\u2066${s}\u2069`

export const TIPS: Record<number, string> = {
  2: `כפל ב-2 זה להכפיל: ${ltr('2 × 6')} זה ${ltr('6 + 6')}.`,
  3: `סופרים בשלשות: ${ltr('3, 6, 9, 12, 15…')}`,
  4: `מכפילים פעמיים: ${ltr('4 × 6')} זה 6, אחר כך 12, אחר כך 24.`,
  5: 'התוצאה תמיד נגמרת ב-5 או ב-0.',
  6: `${ltr('6 × 7')} זה ${ltr('5 × 7')} ועוד 7 אחד: ${ltr('35 + 7 = 42')}.`,
  7: `הכי קשה: ${ltr('7 × 8 = 56')}. זכור את הספרות לפי הסדר: ${ltr('5, 6, 7, 8')}.`,
  8: `מכפילים שלוש פעמים: ${ltr('8 × 4')} זה ${ltr('4, 8, 16, 32')}.`,
  9: `סכום הספרות של התוצאה הוא 9: ${ltr('9 × 4 = 36')} ו-${ltr('3 + 6 = 9')}.`,
  10: `פשוט מוסיפים אפס מימין: ${ltr('10 × 7 = 70')}.`,
}

function multHint(p: Problem): string {
  const step = Math.max(p.a, p.b)
  const jumps = Math.min(p.a, p.b)
  const seq = Array.from({ length: jumps }, (_, i) => step * (i + 1)).join(', ')
  return `סופרים בקפיצות של ${step}: ${ltr(seq)}. מספר הקפיצות: ${jumps}.`
}

export function hintFor(p: Problem): string {
  if (p.op === '×') return multHint(p)

  const { a, b } = p
  const ao = a % 10
  const bo = b % 10
  const at = (a - ao) / 10
  const bt = (b - bo) / 10

  if (p.fmt === 'col') {
    if (p.op === '+') {
      const s = ao + bo
      const carry = s >= 10 ? 1 : 0
      return (
        `מתחילים באחדות: ${ltr(`${ao} + ${bo} = ${s}`)}. ` +
        (carry ? `כותבים ${s % 10} ומעבירים עשרת אחת. ` : `כותבים ${s}. `) +
        `אחר כך עשרות: ${ltr(`${at} + ${bt}${carry ? ' + 1' : ''} = ${at + bt + carry}`)}.`
      )
    }
    const borrow = ao < bo ? 1 : 0
    return (
      'מתחילים באחדות: ' +
      (borrow
        ? `מ-${ao} אי אפשר להוריד ${bo}, לכן לווים עשרת: ${ltr(`${ao + 10} − ${bo} = ${ao + 10 - bo}`)}. בעשרות נשאר ${at - 1}. `
        : `${ltr(`${ao} − ${bo} = ${ao - bo}`)}. `) +
      `אחר כך עשרות: ${ltr(`${at - borrow} − ${bt} = ${at - borrow - bt}`)}.`
    )
  }

  if (p.op === '+') {
    if (bt > 0 && bo > 0) return `${ltr(`${a} + ${bt} = ${a + bt}`)}, ואחר כך ${ltr(`${a + bt} + ${bo} = ${a + b}`)}.`
    if (bo === 0) return `מוסיפים עשרות: ל-${a} מוסיפים ${bt / 10} עשרות, ויוצא ${a + b}.`
    if (ao + b > 10) return `קודם משלימים לעשרת עגולה: ${ltr(`${a} + ${10 - ao} = ${a + 10 - ao}`)}. נשאר להוסיף ${b - (10 - ao)}.`
    return `סופרים אחדות: ${ltr(`${ao} + ${b} = ${ao + b}`)}, ולכן ${a + b}.`
  }

  if (bt > 0 && bo > 0) return `${ltr(`${a} − ${bt} = ${a - bt}`)}, ואחר כך ${ltr(`${a - bt} − ${bo} = ${a - b}`)}.`
  if (bo === 0) return `מורידים עשרות: ${ltr(`${a} − ${bt} = ${a - b}`)}.`
  if (ao >= b) return `סופרים אחדות: ${ltr(`${ao} − ${b} = ${ao - b}`)}, ולכן ${a - b}.`
  return `קודם יורדים לעשרת עגולה: ${ltr(`${a} − ${ao} = ${a - ao}`)}. נשאר להוריד עוד ${b - ao}: ${ltr(`${a - ao} − ${b - ao} = ${a - b}`)}.`
}
