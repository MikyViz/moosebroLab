<template>
  <main class="home">
    <h1 class="title">MoosebroLab</h1>
    <p class="subtitle">Выбери нужную страницу проекта:</p>
    <nav class="cards">
      <RouterLink to="/english" class="card">
        <h2>English</h2>
        <p>Английская грамматика</p>
      </RouterLink>
      <RouterLink to="/japanese" class="card">
        <h2>Japanese</h2>
        <p>Хирагана, радикалы, грамматика и квиз</p>
      </RouterLink>
      <RouterLink to="/chemistry" class="card">
        <h2>Chemistry</h2>
        <p>Конспекты и демонстрация: вода и лёд</p>
      </RouterLink>
      <RouterLink to="/workouts" class="card">
        <h2>Workouts</h2>
        <p>Анатомия по паттернам и недельная программа</p>
      </RouterLink>
      <RouterLink to="/cleanup" class="card">
        <h2>Cleanup</h2>
        <p>Monthly cleanup cheatsheet</p>
      </RouterLink>
    </nav>
  </main>
</template>

<style scoped>
.home {
  max-width: 1100px;
  margin: 0 auto;
  padding: 42px 20px;
}

.title {
  margin: 0 0 8px;
  font-size: 2.1rem;
  color: var(--text-primary);
}

.subtitle {
  margin: 0 0 24px;
  color: var(--text-secondary);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.card {
  border: 1px solid var(--border);
  border-radius: var(--border-radius-lg);
  padding: 18px;
  text-decoration: none;
  color: var(--text-primary);
  background: linear-gradient(180deg, var(--surface-2), var(--surface-1));
  box-shadow: var(--shadow-card);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  border-color: var(--border-stronger);
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.card h2 {
  margin: 0 0 8px;
  font-size: 1.2rem;
}

.card p {
  margin: 0;
  color: var(--text-secondary);
}
</style>
