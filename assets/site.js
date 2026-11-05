// Theme lamp and "show all" lists. Everything on the page works without this
// file: lists start fully expanded and the site stays in light mode.
(() => {
  const root = document.documentElement;
  const KEY = 'tannmay-portfolio-theme';

  // Theme: light by default; an explicit choice is the only thing stored.
  const lamp = document.querySelector('[data-theme-toggle]');
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (!lamp) return;
    const dark = theme === 'dark';
    lamp.textContent = dark ? 'Lamp on' : 'Lamp off';
    lamp.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) {}
  applyTheme(saved === 'dark' ? 'dark' : 'light');
  lamp?.addEventListener('click', () => {
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
