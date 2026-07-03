/**
 * Essências & Aromas — Alternância Modo Claro / Escuro
 * Coloca em: JS/theme-toggle.js
 * Inclui em cada página antes do </body>:
 *   <script src="../JS/theme-toggle.js"></script>
 */
(function () {
  var STORAGE_KEY = 'ea-theme';

  function getTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    // Por defeito: modo claro (o teu design original)
    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateBtn(theme);
  }

  function updateBtn(theme) {
    var btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    if (theme === 'dark') {
      btn.textContent = '☀️';
      btn.title = 'Mudar para modo claro';
      btn.setAttribute('aria-label', 'Mudar para modo claro');
    } else {
      btn.textContent = '🌙';
      btn.title = 'Mudar para modo escuro';
      btn.setAttribute('aria-label', 'Mudar para modo escuro');
    }
  }

  function createBtn() {
    if (document.getElementById('theme-toggle-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.className = 'theme-toggle-btn';
    btn.type = 'button';
    document.body.appendChild(btn);
  }

  function bindClick() {
    var btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Aplica tema antes do render (evita flash)
  applyTheme(getTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      createBtn();
      bindClick();
      updateBtn(getTheme());
    });
  } else {
    createBtn();
    bindClick();
    updateBtn(getTheme());
  }
})();