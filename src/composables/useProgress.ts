import { reactive } from 'vue'

const KEY = 'tetradka:v1'

interface Save {
  stars: number
  best: Record<string, number>
}

function load(): Save {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const s = JSON.parse(raw)
      return { stars: Number(s.stars) || 0, best: s.best ?? {} }
    }
  } catch {
    /* storage unavailable: start fresh */
  }
  return { stars: 0, best: {} }
}

// module-level singleton: every component sees the same state
const state = reactive<Save>(load())

export function useProgress() {
  function addRound(key: string, stars: number) {
    state.stars += stars
    state.best[key] = Math.max(state.best[key] ?? 0, stars)
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }
  return { state, addRound }
}
