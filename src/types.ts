export type Op = '+' | '−' | '×'
export type Fmt = 'line' | 'col'
export type DotState = 'ok' | 'fix' | 'bad'

export interface Problem {
  a: number
  b: number
  op: Op
  fmt: Fmt
  ans: number
  tries: number
  retry: boolean
}

export interface CalcConfig {
  level: 1 | 2 | 3 | 4
  op: 'add' | 'sub' | 'mix'
  fmt: 'line' | 'col' | 'mix'
}

export interface RoundResult {
  stars: number
  firstTry: number
  missed: Problem[]
}

export interface RoundMessage {
  kind: 'ok' | 'bad'
  title: string
  body?: string
  canSkip?: boolean
}
