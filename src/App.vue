<template>
  <div class="app-shell">
    <header class="topbar">
      <nav class="nav">
        <RouterLink to="/" class="brand">MoosebroLab</RouterLink>
        <div class="links">
          <RouterLink to="/english" class="link">English</RouterLink>
          <RouterLink to="/japanese" class="link">Japanese</RouterLink>
          <RouterLink to="/chemistry" class="link">Chemistry</RouterLink>
          <RouterLink to="/workouts" class="link">Workouts</RouterLink>
          <RouterLink to="/cleanup" class="link">Cleanup</RouterLink>
        </div>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100dvh;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(8px);
  background: color-mix(in srgb, var(--panel) 92%, transparent);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.nav {
  max-width: 1100px;
  margin: 0 auto;
  height: 66px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.12rem;
  font-weight: 700;
}

.links {
  display: flex;
  gap: 8px;
}

.link {
  text-decoration: none;
  color: var(--text-secondary);
  padding: 8px 10px;
  border-radius: var(--radius);
  border: 1px solid transparent;
}

.link:hover {
  background: var(--surface-1);
  border-color: var(--border);
}

.link.router-link-active {
  background: var(--bg-accent);
  color: var(--text-accent);
  border-color: var(--border-strong);
}
</style>
