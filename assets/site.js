(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  let saved;
  try { saved = localStorage.getItem('tannmay-portfolio-theme'); } catch (_) {}
  const apply = (theme) => {
    root.dataset.theme = theme;
    if (!toggle) return;
    const dark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
    toggle.querySelector('span').textContent = dark ? 'Light' : 'Dark';
  };
  apply(saved === 'dark' ? 'dark' : 'light');
  toggle?.addEventListener('click', () => {
    saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(saved);
    try { localStorage.setItem('tannmay-portfolio-theme', saved); } catch (_) {}
  });
})();
