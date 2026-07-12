<template>
  <main class="cleanup-wrap">
    <div class="sheet">
      <div class="grid2 section-gap">
        <div class="stat-card">
          <p class="stat-label">освобождено сегодня</p>
          <p class="stat-val good">~75 ГБ</p>
        </div>
        <div class="stat-card">
          <p class="stat-label">свободно сейчас</p>
          <p class="stat-val">~41 ГБ</p>
        </div>
      </div>

      <section class="section">
        <div class="section-header">
          <p class="section-title">Windows — PowerShell</p>
          <span class="badge badge-win">раз в месяц</span>
        </div>

        <div class="cmd-block">
          <p class="cmd-label">OneDrive логи (главный жирдяй — 68 ГБ за раз)</p>
          <pre class="cmd-code">Stop-Process -Name OneDrive -Force -ErrorAction SilentlyContinue
Get-ChildItem "$env:LOCALAPPDATA\Microsoft\OneDrive\logs" -Recurse -Filter "*.odl" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue</pre>
          <p class="cmd-note">OneDrive сам перезапустится и создаст новые логи — это нормально</p>
        </div>

        <div class="cmd-block">
          <p class="cmd-label">Temp папки и корзина</p>
          <pre class="cmd-code">Remove-Item -Path "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "C:\Windows\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
Clear-RecycleBin -Force -ErrorAction SilentlyContinue</pre>
        </div>

        <div class="cmd-block">
          <p class="cmd-label">Docker — очистка образов и кэша</p>
          <pre class="cmd-code">docker system prune -a --volumes</pre>
          <p class="cmd-note">Запускать только когда Docker Desktop открыт. Введи y для подтверждения</p>
        </div>

        <div class="cmd-block">
          <p class="cmd-label">WSL — выключить после работы</p>
          <pre class="cmd-code">wsl --shutdown</pre>
          <p class="cmd-note">Делай это каждый раз после окончания работы с Ubuntu — освобождает RAM</p>
        </div>

        <div class="cmd-block">
          <p class="cmd-label">Проверить свободное место</p>
          <pre class="cmd-code">Get-PSDrive C | Select-Object @{N='Used(GB)';E={[math]::Round($_.Used/1GB,1)}}, @{N='Free(GB)';E={[math]::Round($_.Free/1GB,1)}}</pre>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <p class="section-title">Ubuntu WSL — терминал</p>
          <span class="badge badge-wsl">раз в месяц</span>
        </div>

        <div class="cmd-block">
          <p class="cmd-label">Полная чистка одной командой</p>
          <pre class="cmd-code">sudo apt autoremove --purge -y && sudo apt clean && journalctl --vacuum-time=7d</pre>
          <p class="cmd-note">apt мусор + старые пакеты + логи старше 7 дней</p>
        </div>

        <div class="cmd-block">
          <p class="cmd-label">npm кэш</p>
          <pre class="cmd-code">npm cache clean --force</pre>
        </div>

        <div class="cmd-block">
          <p class="cmd-label">Найти тяжелые node_modules</p>
          <pre class="cmd-code">find ~ -name "node_modules" -type d -prune -exec du -sh {} \; 2>/dev/null | sort -rh</pre>
          <p class="cmd-note">Удали node_modules в старых/заброшенных проектах — там легко по 200-500 МБ</p>
        </div>

        <div class="cmd-block">
          <p class="cmd-label">Проверить общий размер Ubuntu</p>
          <pre class="cmd-code">du -h -x --max-depth=1 / 2>/dev/null | sort -rh | head -10</pre>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <p class="section-title">Следить за этим</p>
        </div>

        <div class="warning">
          <span>Android SDK/AVD (~9 ГБ) — если не используешь Flutter/Android разработку, можно удалить через Android Studio</span>
        </div>
        <div class="warning">
          <span>Docker data.vhdx (~19 ГБ) — растет при активном использовании Docker. Чисти образы регулярно через docker system prune</span>
        </div>
        <div class="warning">
          <span>WinDirStat — установлен, запускай раз в пару месяцев чтобы видеть полную картину диска визуально</span>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.cleanup-wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
}

.sheet {
  padding: 1rem 0;
}

.section {
  margin-bottom: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.5px solid var(--border);
}

.section-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 500;
  margin-left: auto;
}

.badge-win {
  background: var(--bg-accent);
  color: var(--text-accent);
}

.badge-wsl {
  background: var(--bg-success);
  color: var(--text-success);
}

.cmd-block {
  background: var(--surface-1);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
}

.cmd-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0 0 4px;
}

.cmd-code {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-primary);
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.cmd-note {
  font-size: 11px;
  color: var(--text-muted);
  margin: 4px 0 0;
}

.warning {
  background: var(--bg-warning);
  border: 0.5px solid var(--border-warning);
  border-radius: var(--radius);
  padding: 0.5rem 0.75rem;
  font-size: 12px;
  color: var(--text-warning);
  margin-bottom: 0.5rem;
}

.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.section-gap {
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--surface-1);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  border: 0.5px solid var(--border);
}

.stat-label {
  font-size: 11px;
  color: var(--text-secondary);
  margin: 0 0 2px;
}

.stat-val {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.good {
  color: var(--text-success);
}

@media (max-width: 480px) {
  .grid2 {
    grid-template-columns: 1fr;
  }
}
</style>
