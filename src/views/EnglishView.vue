<script setup lang="ts">
import { ref } from 'vue'

type SectionKey = 'perfects' | 'conditionals' | 'signals' | 'mistakes'
type ConditionalKey = 'zero' | 'first' | 'second' | 'third' | 'compare'

const activeSection = ref<SectionKey>('perfects')
const activeConditional = ref<ConditionalKey>('zero')

const setSection = (section: SectionKey) => {
  activeSection.value = section
  if (section === 'conditionals') {
    activeConditional.value = 'zero'
  }
}
</script>

<template>
  <main class="wrap">
    <h1 class="main-title">Английская грамматика</h1>

    <div class="tabs">
      <button class="tab" :class="{ active: activeSection === 'perfects' }" @click="setSection('perfects')">Perfect-времена</button>
      <button class="tab" :class="{ active: activeSection === 'conditionals' }" @click="setSection('conditionals')">Conditionals</button>
      <button class="tab" :class="{ active: activeSection === 'signals' }" @click="setSection('signals')">Слова-подсказки</button>
      <button class="tab" :class="{ active: activeSection === 'mistakes' }" @click="setSection('mistakes')">Твои ошибки</button>
    </div>

    <div v-show="activeSection === 'perfects'" class="section">
      <div class="card">
        <div class="card-title">Present Perfect <span class="badge badge-blue">have/has + V3</span></div>
        <div class="formula">have/has + V3 (причастие)</div>
        <div class="rule">Факт или опыт в прошлом без указания конкретного времени. Важен результат сейчас, или само действие.</div>
        <div class="example">✅ <span class="correct">I have seen this movie.</span> (факт опыта, не важно когда)</div>
        <div class="example">✅ <span class="correct">I have worked here for 3 years.</span> (до сих пор работаю)</div>
        <div class="example">❌ <span class="wrong">I have seen this movie yesterday.</span> (yesterday = конкретное время → Past Simple)</div>
      </div>

      <div class="card">
        <div class="card-title">Present Perfect Continuous <span class="badge badge-blue">have been + V-ing</span></div>
        <div class="formula">have/has + been + V-ing</div>
        <div class="rule">Действие началось в прошлом и продолжается до сих пор. Акцент на процессе.</div>
        <div class="example">✅ <span class="correct">I have been working as a freelancer for 3 years.</span></div>
        <div class="example muted-note">→ лучше чем "I have worked", потому что ты ещё фрилансер</div>
      </div>

      <div class="card">
        <div class="card-title">Past Simple <span class="badge badge-warn">V2 (прошедшая форма)</span></div>
        <div class="formula">V2 (worked / went / saw)</div>
        <div class="rule">Конкретный завершённый момент в прошлом. Обычно есть указание времени.</div>
        <div class="example">✅ <span class="correct">I finished the project in March.</span></div>
        <div class="example">✅ <span class="correct">He lost his job last month.</span></div>
      </div>

      <div class="card">
        <div class="card-title">Past Perfect <span class="badge badge-green">had + V3</span></div>
        <div class="formula">had + V3</div>
        <div class="rule">"Прошлое до прошлого" — одно событие случилось раньше другого. Ключевые слова: before, after, when, by the time, already.</div>
        <div class="example">✅ <span class="correct">When the client called, I had already sent the code.</span></div>
        <div class="example">✅ <span class="correct">We had studied Torah for 7 years before he left the kollel.</span></div>
        <div class="example muted-note">→ "had studied" (раньше) / "left" (позже)</div>
      </div>

      <div class="label">Быстрое сравнение</div>
      <table>
        <tr><th>Время</th><th>Когда?</th><th>Пример</th></tr>
        <tr><td>Past Simple</td><td>конкретный момент в прошлом</td><td>I saw him yesterday.</td></tr>
        <tr><td>Present Perfect</td><td>прошлое, важно сейчас</td><td>I have seen him. (уже видел)</td></tr>
        <tr><td>Pres. Perfect Cont.</td><td>началось в прошлом, длится</td><td>I have been waiting for an hour.</td></tr>
        <tr><td>Past Perfect</td><td>раньше другого прошлого</td><td>I had finished before he called.</td></tr>
      </table>
    </div>

    <div v-show="activeSection === 'conditionals'" class="section">
      <div class="subtabs">
        <button class="subtab" :class="{ active: activeConditional === 'zero' }" @click="activeConditional = 'zero'">Zero</button>
        <button class="subtab" :class="{ active: activeConditional === 'first' }" @click="activeConditional = 'first'">First</button>
        <button class="subtab" :class="{ active: activeConditional === 'second' }" @click="activeConditional = 'second'">Second</button>
        <button class="subtab" :class="{ active: activeConditional === 'third' }" @click="activeConditional = 'third'">Third</button>
        <button class="subtab" :class="{ active: activeConditional === 'compare' }" @click="activeConditional = 'compare'">Сравнение</button>
      </div>

      <div v-show="activeConditional === 'zero'" class="subsection">
        <div class="card">
          <div class="card-title">Zero Conditional <span class="badge badge-0">всегда истина</span></div>
          <div class="formula">If + Present Simple, ... Present Simple</div>
          <div class="rule">Универсальные факты, законы природы, привычки. То, что всегда правда.</div>
          <div class="example">✅ <span class="correct">If you heat water to 100°C, it boils.</span></div>
          <div class="example">✅ <span class="correct">If I drink coffee late, I can't sleep.</span></div>
          <div class="example">✅ <span class="correct">If the server crashes, the app goes down.</span></div>
        </div>
        <div class="card">
          <div class="rule">Можно заменить "if" на "when" — смысл не меняется:</div>
          <div class="example"><span class="correct">When you heat water to 100°C, it boils.</span></div>
        </div>
      </div>

      <div v-show="activeConditional === 'first'" class="subsection">
        <div class="card">
          <div class="card-title">First Conditional <span class="badge badge-1">реальное будущее</span></div>
          <div class="formula">If + Present Simple, ... will + verb</div>
          <div class="rule">Ситуация реальная и возможная в будущем. Есть реальный шанс, что это случится.</div>
          <div class="example">✅ <span class="correct">If I find a client this week, I will buy presents for the kids.</span></div>
          <div class="example">✅ <span class="correct">If you finish the bug fix today, we will deploy it tomorrow.</span></div>
        </div>
        <div class="warn-box">
          <div class="warn-title">⚠️ Главное правило — после IF нет WILL</div>
          <div class="example">❌ <span class="wrong">If I will find a client...</span></div>
          <div class="example">✅ <span class="correct">If I find a client...</span></div>
        </div>
        <div class="card">
          <div class="rule">Вместо will можно использовать: <span class="keyword">can, might, should, must</span></div>
          <div class="example"><span class="correct">If you call him now, he <span class="keyword">might</span> answer.</span></div>
        </div>
      </div>

      <div v-show="activeConditional === 'second'" class="subsection">
        <div class="card">
          <div class="card-title">Second Conditional <span class="badge badge-2">гипотетическое</span></div>
          <div class="formula">If + Past Simple, ... would + verb</div>
          <div class="rule">Ситуация нереальная или маловероятная. Мечты, фантазии, советы ("If I were you...").</div>
          <div class="example">✅ <span class="correct">If I had more experience, clients would not leave me.</span></div>
          <div class="example">✅ <span class="correct">If I were a senior developer, I would not worry about money.</span></div>
          <div class="example">✅ <span class="correct">If I had no children, I would move to another country.</span></div>
        </div>
        <div class="card">
          <div class="rule">С "I" формально используем <span class="keyword">were</span>, не "was":</div>
          <div class="example">✅ <span class="correct">If I <span class="keyword">were</span> rich...</span> (формально)</div>
          <div class="example muted-note">В разговорной речи "was" тоже принято.</div>
        </div>
        <div class="warn-box">
          <div class="warn-title">⚠️ После IF нет WOULD</div>
          <div class="example">❌ <span class="wrong">If I would have more time...</span></div>
          <div class="example">✅ <span class="correct">If I had more time...</span></div>
        </div>
      </div>

      <div v-show="activeConditional === 'third'" class="subsection">
        <div class="card">
          <div class="card-title">Third Conditional <span class="badge badge-3">прошлое нереальное</span></div>
          <div class="formula">If + Past Perfect (had + V3), ... would have + V3</div>
          <div class="rule">Прошлое, которое уже нельзя изменить. Сожаление, размышление "что было бы если бы..."</div>
          <div class="example">✅ <span class="correct">If I had known Vue.js earlier, I would have gotten that job.</span></div>
          <div class="example">✅ <span class="correct">If I had not left that project, the client wouldn't have left.</span></div>
          <div class="example">✅ <span class="correct">If she hadn't called on time, we would have missed the deadline.</span></div>
        </div>
        <div class="card">
          <div class="rule">Обе части могут быть отрицательными:</div>
          <div class="example"><span class="correct">If he <span class="keyword">hadn't</span> made that mistake, we <span class="keyword">wouldn't have lost</span> the client.</span></div>
        </div>
        <div class="warn-box">
          <div class="warn-title">⚠️ Самая частая ошибка</div>
          <div class="example">❌ <span class="wrong">If I would have known... / If I had have known...</span></div>
          <div class="example">✅ <span class="correct">If I had known...</span></div>
        </div>
      </div>

      <div v-show="activeConditional === 'compare'" class="subsection">
        <div class="label">Все четыре conditional — одним взглядом</div>
        <table>
          <tr>
            <th>Тип</th>
            <th>If-часть</th>
            <th>Главная часть</th>
            <th>Смысл</th>
          </tr>
          <tr>
            <td><strong>Zero</strong></td>
            <td>Present Simple</td>
            <td>Present Simple</td>
            <td>Всегда правда, факт</td>
          </tr>
          <tr>
            <td><strong>First</strong></td>
            <td>Present Simple</td>
            <td>will + V</td>
            <td>Реально, возможно в будущем</td>
          </tr>
          <tr>
            <td><strong>Second</strong></td>
            <td>Past Simple</td>
            <td>would + V</td>
            <td>Гипотетически, нереально</td>
          </tr>
          <tr>
            <td><strong>Third</strong></td>
            <td>Past Perfect (had+V3)</td>
            <td>would have + V3</td>
            <td>Прошлое, уже не изменить</td>
          </tr>
        </table>

        <div class="label top-gap">Один пример — четыре conditional</div>
        <table>
          <tr><th>Тип</th><th>Предложение</th></tr>
          <tr><td>Zero</td><td>If I <span class="keyword">work</span> hard, I <span class="keyword">get</span> good results.</td></tr>
          <tr><td>First</td><td>If I <span class="keyword">find</span> a client, I <span class="keyword">will earn</span> money.</td></tr>
          <tr><td>Second</td><td>If I <span class="keyword">had</span> more clients, I <span class="keyword">would earn</span> more.</td></tr>
          <tr><td>Third</td><td>If I <span class="keyword">had found</span> a client then, I <span class="keyword">would have earned</span> money.</td></tr>
        </table>

        <div class="label top-gap">Главное правило для всех</div>
        <div class="warn-box">
          <div class="warn-title">⚠️ После IF никогда не ставим WILL или WOULD</div>
          <div class="example">❌ <span class="wrong">If I will find... / If I would have...</span></div>
          <div class="example">✅ <span class="correct">If I find... / If I had... / If I had found...</span></div>
        </div>
      </div>
    </div>

    <div v-show="activeSection === 'signals'" class="section">
      <div class="label">Present Perfect</div>
      <div class="card">
        <div class="rule">Слова-сигналы: <span class="keyword">already, yet, ever, never, just, recently, so far, for, since</span></div>
        <div class="example">✅ I have <span class="keyword">already</span> finished. / Have you <span class="keyword">ever</span> been to Japan? / I haven't done it <span class="keyword">yet</span>.</div>
      </div>

      <div class="label">Past Simple</div>
      <div class="card">
        <div class="rule">Слова-сигналы: <span class="keyword">yesterday, last week/month/year, ago, in 2020, when I was...</span></div>
        <div class="example">✅ I finished it <span class="keyword">last month</span>. / He left <span class="keyword">two years ago</span>.</div>
      </div>

      <div class="label">Past Perfect</div>
      <div class="card">
        <div class="rule">Слова-сигналы: <span class="keyword">before, after, when, by the time, already, just</span> (в контексте двух прошлых событий)</div>
        <div class="example">✅ <span class="keyword">By the time</span> he arrived, I had already left.</div>
        <div class="example">✅ I had finished <span class="keyword">before</span> she called.</div>
      </div>

      <div class="label">Артикли (твоя слабая зона)</div>
      <div class="card">
        <div class="rule"><span class="keyword">a/an</span> — впервые упоминаем, неопределённый предмет: "I am <span class="keyword">a</span> freelancer"</div>
        <div class="rule"><span class="keyword">the</span> — уже известный предмет, конкретный: "I fixed <span class="keyword">the</span> bug"</div>
        <div class="rule"><span class="keyword">без артикля</span> — профессии после "work as": "I work as <span class="keyword">a</span> developer" (НЕ без артикля!)</div>
        <div class="example">❌ <span class="wrong">I work as freelancer</span> → ✅ <span class="correct">I work as a freelancer</span></div>
      </div>
    </div>

    <div v-show="activeSection === 'mistakes'" class="section">
      <div class="label">Твои типичные ошибки из теста</div>
      <table>
        <tr><th>Твой вариант</th><th>Правильно</th><th>Почему</th></tr>
        <tr><td class="wrong keep-red">I saw this movie before</td><td class="correct keep-green">I have seen this movie before</td><td>нет конкретного времени → Present Perfect</td></tr>
        <tr><td class="wrong keep-red">If I will have more time</td><td class="correct keep-green">If I had more time</td><td>will после if запрещено + это Second Conditional</td></tr>
        <tr><td class="wrong keep-red">He don't like coffee</td><td class="correct keep-green">He doesn't like coffee</td><td>для he/she/it → doesn't</td></tr>
        <tr><td class="wrong keep-red">I work as freelancer for 3 years</td><td class="correct keep-green">I have been working as a freelancer for 3 years</td><td>артикль "a" + Pres. Perfect Cont. (длится сейчас)</td></tr>
        <tr><td class="wrong keep-red">I had already forgot</td><td class="correct keep-green">I had already forgotten</td><td>forget → forgot → forgotten (V3)</td></tr>
        <tr><td class="wrong keep-red">I would be worryed</td><td class="correct keep-green">I would be worried</td><td>worry → worried (y → ied)</td></tr>
        <tr><td class="wrong keep-red">he had already leaven</td><td class="correct keep-green">he had already left</td><td>leave → left → left (неправильный глагол)</td></tr>
      </table>

      <div class="label top-gap">Неправильные глаголы, которые тебе нужны</div>
      <table>
        <tr><th>Base</th><th>Past Simple (V2)</th><th>Past Participle (V3)</th></tr>
        <tr><td>forget</td><td>forgot</td><td>forgotten</td></tr>
        <tr><td>leave</td><td>left</td><td>left</td></tr>
        <tr><td>lose</td><td>lost</td><td>lost</td></tr>
        <tr><td>write</td><td>wrote</td><td>written</td></tr>
        <tr><td>send</td><td>sent</td><td>sent</td></tr>
        <tr><td>find</td><td>found</td><td>found</td></tr>
        <tr><td>give</td><td>gave</td><td>given</td></tr>
        <tr><td>know</td><td>knew</td><td>known</td></tr>
        <tr><td>take</td><td>took</td><td>taken</td></tr>
        <tr><td>see</td><td>saw</td><td>seen</td></tr>
      </table>
    </div>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.main-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tab {
  padding: 10px 20px;
  border-radius: var(--radius);
  border: 0.5px solid var(--border-strong);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
}

.tab.active {
  background: var(--surface-2);
  color: var(--text-primary);
  border-color: var(--border-stronger);
}

.tab:hover:not(.active) {
  background: var(--surface-1);
}

.subtabs {
  display: flex;
  gap: 6px;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.subtab {
  padding: 6px 14px;
  border-radius: var(--radius);
  border: 0.5px solid var(--border);
  background: var(--surface-1);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s;
}

.subtab.active {
  background: var(--surface-2);
  color: var(--text-primary);
  border-color: var(--border-strong);
}

.subtab:hover:not(.active) {
  background: var(--surface-2);
}

.card {
  background: var(--surface-2);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.formula {
  font-family: var(--font-mono);
  font-size: 13px;
  background: var(--surface-1);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 8px 12px;
  margin: 8px 0;
  color: var(--text-accent);
  font-weight: 500;
}

.rule {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 6px 0;
  padding-left: 12px;
  border-left: 2px solid var(--border-strong);
}

.example {
  font-size: 13px;
  margin: 6px 0 6px 12px;
  color: var(--text-primary);
}

.muted-note {
  color: var(--text-muted);
  font-size: 12px;
}

.correct {
  color: var(--text-success);
  font-weight: 500;
}

.wrong {
  color: var(--text-danger);
  text-decoration: line-through;
}

.keep-red {
  color: var(--text-danger);
}

.keep-green {
  color: var(--text-success);
}

.badge {
  display: inline-block;
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 999px;
  font-weight: 600;
  margin-left: 8px;
  vertical-align: middle;
}

.badge-0 {
  background: var(--bg-accent);
  color: var(--text-accent);
}

.badge-1 {
  background: var(--bg-success);
  color: var(--text-success);
}

.badge-2 {
  background: var(--bg-warning);
  color: var(--text-warning);
}

.badge-3 {
  background: var(--bg-danger);
  color: var(--text-danger);
}

.badge-blue {
  background: var(--bg-accent);
  color: var(--text-accent);
}

.badge-green {
  background: var(--bg-success);
  color: var(--text-success);
}

.badge-warn {
  background: var(--bg-warning);
  color: var(--text-warning);
}

.warn-box {
  background: var(--bg-danger);
  border: 0.5px solid var(--border-danger);
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 1rem;
}

.warn-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-danger);
  margin-bottom: 6px;
}

.keyword {
  color: var(--text-accent);
  font-weight: 600;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-top: 8px;
  background: var(--surface-2);
  border-radius: 8px;
  overflow: hidden;
}

th {
  text-align: left;
  padding: 10px 12px;
  background: var(--surface-1);
  color: var(--text-secondary);
  font-weight: 600;
  border-bottom: 0.5px solid var(--border-strong);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

td {
  padding: 10px 12px;
  border-bottom: 0.5px solid var(--border);
  color: var(--text-primary);
  vertical-align: top;
  line-height: 1.5;
}

tr:last-child td {
  border-bottom: none;
}

.label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 1.5rem 0 0.75rem;
}

.top-gap {
  margin-top: 1.5rem;
}

@media (max-width: 600px) {
  .wrap {
    padding: 1rem 0.75rem;
  }

  .main-title {
    font-size: 22px;
  }

  .tabs {
    justify-content: flex-start;
  }

  .tab {
    font-size: 13px;
    padding: 8px 14px;
  }

  table {
    font-size: 12px;
  }

  th,
  td {
    padding: 8px 10px;
  }
}
</style>
