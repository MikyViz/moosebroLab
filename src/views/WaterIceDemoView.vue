<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

type DemoMode = 'liquid' | 'ice'

type WaterMolecule = {
  x: number
  y: number
  r: number
}

type Velocity = {
  vx: number
  vy: number
  vr: number
}

const W = 660
const H = 320
const mode = ref<DemoMode>('liquid')
const mols = ref<WaterMolecule[]>([])
const bonds = ref<Array<[number, number]>>([])
const hx1 = 15
const hy1 = -14
const hx2 = 15
const hy2 = 14
const N_LIQUID = 34

let velocities: Velocity[] = []
let raf: number | null = null

const randRange = (a: number, b: number) => a + Math.random() * (b - a)

const buildLiquid = () => {
  mols.value = []
  velocities = []

  for (let i = 0; i < N_LIQUID; i += 1) {
    mols.value.push({
      x: randRange(30, W - 30),
      y: randRange(30, H - 30),
      r: randRange(0, 360),
    })

    velocities.push({
      vx: randRange(-0.4, 0.4),
      vy: randRange(-0.4, 0.4),
      vr: randRange(-1, 1),
    })
  }

  bonds.value = []
}

const buildIce = () => {
  mols.value = []
  bonds.value = []

  const spacing = 46
  const rows = 7
  const cols = 8
  const offsetX = 40
  const offsetY = 25
  const index = new Map<string, number>()

  let idx = 0
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = offsetX + col * spacing * 1.05 + (row % 2 === 0 ? 0 : spacing * 0.52)
      const y = offsetY + row * spacing * 0.92
      if (x > W - 20 || y > H - 20) {
        continue
      }

      mols.value.push({ x, y, r: (row + col) % 2 === 0 ? 20 : -160 })
      index.set(`${row}_${col}`, idx)
      idx += 1
    }
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const current = index.get(`${row}_${col}`)
      if (typeof current !== 'number') {
        continue
      }

      const right = index.get(`${row}_${col + 1}`)
      const down = index.get(`${row + 1}_${col}`)

      if (typeof right === 'number') {
        bonds.value.push([current, right])
      }

      if (typeof down === 'number') {
        bonds.value.push([current, down])
      }
    }
  }
}

const tick = () => {
  if (mode.value === 'liquid') {
    for (let i = 0; i < mols.value.length; i += 1) {
      const molecule = mols.value[i]
      const speed = velocities[i]
      if (!molecule || !speed) {
        continue
      }

      molecule.x += speed.vx
      molecule.y += speed.vy
      molecule.r += speed.vr

      if (molecule.x < 20 || molecule.x > W - 20) {
        speed.vx *= -1
      }
      if (molecule.y < 20 || molecule.y > H - 20) {
        speed.vy *= -1
      }

      molecule.x = Math.max(20, Math.min(W - 20, molecule.x))
      molecule.y = Math.max(20, Math.min(H - 20, molecule.y))
    }
  }

  raf = window.requestAnimationFrame(tick)
}

const setMode = (nextMode: DemoMode) => {
  mode.value = nextMode
  if (nextMode === 'liquid') {
    buildLiquid()
    return
  }
  buildIce()
}

onMounted(() => {
  buildLiquid()
  tick()
})

onUnmounted(() => {
  if (raf !== null) {
    window.cancelAnimationFrame(raf)
  }
})

const areaLabel = computed(() => (mode.value === 'ice' ? '~ +9% объёма' : 'базовый объём'))
const densityLabel = computed(() => (mode.value === 'ice' ? '≈0.92 г/см³' : '1.00 г/см³'))
const caption = computed(() =>
  mode.value === 'liquid'
    ? 'В жидкой воде молекулы толкаются и постоянно рвут/пересобирают водородные связи — это позволяет им упаковываться плотнее, "жульничая" с идеальными углами.'
    : 'При замерзании тепловое движение стихает, и каждая молекула выстраивает все 4 водородные связи под правильным углом ≈109°. Это раздвигает молекулы дальше друг от друга — решётка ажурная, объём растёт, плотность падает, лёд всплывает.',
)
</script>

<template>
  <section class="chem2-wrap">
    <p class="chem2-title">Вода в жидком виде vs лёд</p>
    <p class="chem2-sub">почему та же самая вода в твёрдом виде занимает больше места</p>

    <div class="chem2-toggle-row">
      <button :class="{ active: mode === 'liquid' }" @click="setMode('liquid')">Жидкая вода</button>
      <button :class="{ active: mode === 'ice' }" @click="setMode('ice')">Лёд</button>
    </div>

    <div class="chem2-stage">
      <svg :viewBox="`0 0 ${W} ${H}`" xmlns="http://www.w3.org/2000/svg">
        <g v-if="mode === 'ice'">
          <line
            v-for="(bond, index) in bonds"
            :key="`bond-${index}`"
            class="chem2-bond"
            :x1="mols[bond[0]]?.x"
            :y1="mols[bond[0]]?.y"
            :x2="mols[bond[1]]?.x"
            :y2="mols[bond[1]]?.y"
          />
        </g>

        <g v-for="(molecule, index) in mols" :key="index" :transform="`translate(${molecule.x},${molecule.y}) rotate(${molecule.r})`">
          <line x1="0" y1="0" :x2="hx1" :y2="hy1" stroke="#cfcfcf" stroke-width="2" />
          <line x1="0" y1="0" :x2="hx2" :y2="hy2" stroke="#cfcfcf" stroke-width="2" />
          <circle cx="0" cy="0" r="6.5" fill="#3d7a78" />
          <circle :cx="hx1" :cy="hy1" r="3.4" fill="#fdfbf5" stroke="#b9b9b9" stroke-width="1" />
          <circle :cx="hx2" :cy="hy2" r="3.4" fill="#fdfbf5" stroke="#b9b9b9" stroke-width="1" />
        </g>
      </svg>
    </div>

    <div class="chem2-stats">
      <div class="chem2-stat"><b>{{ mols.length }}</b>молекул H₂O</div>
      <div class="chem2-stat"><b>{{ areaLabel }}</b>занимаемая площадь</div>
      <div class="chem2-stat"><b>{{ densityLabel }}</b>условная плотность</div>
    </div>

    <p class="chem2-caption">{{ caption }}</p>
    <p class="chem2-note">Тонкие пунктирные линии в режиме льда — водородные связи. Каждая молекула держится за 4 соседних под фиксированным углом ≈109°, поэтому решётка получается ажурной, с пустотами — отсюда и падение плотности.</p>
  </section>
</template>

<style scoped>
.chem2-wrap {
  --paper: #f3ede0;
  --paper-line: #d9cfb4;
  --ink: #28344a;
  --ink-soft: #5b6785;
  --teal: #3d7a78;
  --teal-soft: #bfe0dd;
  --white: #fdfbf5;
  font-family: Georgia, 'Times New Roman', serif;
  background:
    linear-gradient(var(--paper-line) 1px, transparent 1px) 0 0 / 100% 28px,
    var(--paper);
  color: var(--ink);
  padding: 28px 22px 34px;
  border-radius: 10px;
  max-width: 720px;
  margin: 0 auto;
}

.chem2-title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.2px;
  margin: 0 0 4px;
}

.chem2-sub {
  font-family: -apple-system, system-ui, sans-serif;
  font-size: 13px;
  color: var(--ink-soft);
  margin: 0 0 18px;
}

.chem2-toggle-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 14px;
  font-family: -apple-system, system-ui, sans-serif;
}

.chem2-toggle-row button {
  font-family: -apple-system, system-ui, sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1.5px solid var(--ink);
  background: var(--white);
  color: var(--ink);
  cursor: pointer;
  transition: all 0.2s ease;
}

.chem2-toggle-row button.active {
  background: var(--ink);
  color: var(--white);
}

.chem2-toggle-row button:hover {
  opacity: 0.85;
}

.chem2-stage {
  position: relative;
  background: var(--white);
  border: 1.5px solid var(--ink);
  border-radius: 8px;
  height: 320px;
  overflow: hidden;
  box-shadow: 3px 3px 0 var(--paper-line);
}

.chem2-stage svg {
  width: 100%;
  height: 100%;
  display: block;
}

.chem2-bond {
  stroke: #c9c1a8;
  stroke-width: 1;
  stroke-dasharray: 3 3;
}

.chem2-stats {
  display: flex;
  gap: 22px;
  margin-top: 14px;
  font-family: -apple-system, system-ui, sans-serif;
  font-size: 13px;
  flex-wrap: wrap;
}

.chem2-stat b {
  display: block;
  font-size: 19px;
  color: var(--teal);
  font-family: Georgia, serif;
}

.chem2-caption {
  margin-top: 16px;
  font-size: 14.5px;
  line-height: 1.55;
  padding: 12px 14px;
  background: var(--teal-soft);
  border-left: 3px solid var(--teal);
  border-radius: 0 6px 6px 0;
}

.chem2-note {
  font-family: -apple-system, system-ui, sans-serif;
  font-size: 11.5px;
  color: var(--ink-soft);
  margin-top: 10px;
  font-style: italic;
}
</style>