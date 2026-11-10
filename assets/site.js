// Theme toggle and "show all" lists. Everything on the page works without this
// file: lists start fully expanded and the site stays in light mode.
(() => {
  const root = document.documentElement;
  const KEY = 'tannmay-portfolio-theme';

  // Theme: light by default; an explicit choice is the only thing stored.
  // The sun and moon icons are swapped in CSS; here we only keep the label right.
  const toggle = document.querySelector('[data-theme-toggle]');
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (!toggle) return;
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
  };
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) {}
  applyTheme(saved === 'dark' ? 'dark' : 'light');
  toggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(KEY, next); } catch (_) {}
  });

  // Long lists: collapse to the selection once the script is running.
  document.querySelectorAll('[data-toggle-list]').forEach((button) => {
    const list = document.getElementById(button.dataset.toggleList);
    if (!list) return;
    const set = (open) => {
      list.classList.toggle('is-collapsed', !open);
      button.setAttribute('aria-expanded', String(open));
      button.textContent = open ? button.dataset.less : button.dataset.more;
    };
    set(false);
    button.hidden = false;
    button.addEventListener('click', () => set(list.classList.contains('is-collapsed')));
  });
})();
