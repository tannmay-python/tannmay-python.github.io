// The library: a shelf of spines drawn to page count, plus search and shelf filters.
// Without this file the full list still shows; only the spines and filters need it.
(() => {
  const items = [...document.querySelectorAll('.books li')];
  const spinesEl = document.getElementById('spines');
  const wrap = document.querySelector('.spines-wrap');
  const tip = document.getElementById('spine-tip');
  const tools = document.querySelector('.cat-tools');
  const search = document.getElementById('cat-search');
  const chips = [...document.querySelectorAll('.chip')];
  const shelves = [...document.querySelectorAll('.cat-shelf')];
  const empty = document.getElementById('cat-empty');
  if (!items.length || !spinesEl) return;

  // Same string, same number: spines keep their height and tone on every visit.
  const hash = (s) => {
    let h = 2166136261;
    for (const c of s) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); }
    return (h >>> 0) / 4294967295;
  };
  const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['’‘]/g, '').toLowerCase();

  const spines = items.map((li) => {
    const sp = document.createElement('span');
    sp.className = 'spine';
    if ('reading' in li.dataset) sp.classList.add('reading');
    sp.style.setProperty('--w', Number(li.dataset.pages) || 260);
    sp.style.setProperty('--h', (60 + hash(li.id) * 40).toFixed(1) + '%');
    sp.style.setProperty('--o', (0.2 + hash(li.id + '~') * 0.5).toFixed(2));
    sp.dataset.target = li.id;
    li.dataset.search = fold(li.dataset.search);
    spinesEl.appendChild(sp);
    return sp;
  });

  const showTip = (sp) => {
    const li = document.getElementById(sp.dataset.target);
    const title = li.querySelector('.bk-title').firstChild.textContent.trim();
    const author = li.querySelector('.bk-author').textContent.trim();
    const pages = Number(li.dataset.pages);
    const tt = document.createElement('span');
    tt.className = 'tt';
    tt.textContent = title;
    const tm = document.createElement('span');
    tm.className = 'tm';
    tm.textContent = [author, pages ? pages.toLocaleString('en-IN') + ' pages' : ''].filter(Boolean).join(' · ');
    tip.replaceChildren(tt, ...(tm.textContent ? [tm] : []));
    tip.hidden = false;
    const w = wrap.getBoundingClientRect();
    const s = sp.getBoundingClientRect();
    const half = tip.offsetWidth / 2;
    tip.style.left = Math.max(half, Math.min(w.width - half, s.left + s.width / 2 - w.left)) + 'px';
  };
  spinesEl.addEventListener('mouseover', (ev) => {
    const sp = ev.target.closest('.spine');
    if (sp) showTip(sp);
  });
  spinesEl.addEventListener('mouseleave', () => { tip.hidden = true; });

  // Filters
  let shelf = 'all';
  let q = '';
  const apply = () => {
    let shown = 0;
    items.forEach((li, i) => {
      const ok = (shelf === 'all' || li.dataset.shelf === shelf) && (!q || li.dataset.search.includes(q));
      li.hidden = !ok;
      spines[i].classList.toggle('on', ok);
      if (ok) shown += 1;
    });
    shelves.forEach((s) => { s.hidden = !s.querySelector('li:not([hidden])'); });
    spinesEl.classList.toggle('filtered', shelf !== 'all' || q !== '');
    empty.hidden = shown > 0;
  };
  const setShelf = (value) => {
    shelf = value;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.shelf === value)));
    apply();
  };
  chips.forEach((c) => c.addEventListener('click', () => setShelf(c.dataset.shelf)));
  search.addEventListener('input', () => { q = fold(search.value.trim()); apply(); });
  tools.hidden = false;

  // Click a spine: jump to that book (clearing any filter hiding it) and flash it.
  spinesEl.addEventListener('click', (ev) => {
    const sp = ev.target.closest('.spine');
    if (!sp) return;
    const li = document.getElementById(sp.dataset.target);
    if (li.hidden) { search.value = ''; q = ''; setShelf('all'); }
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    li.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
    li.classList.add('flash');
    setTimeout(() => li.classList.remove('flash'), 1200);
  });
})();
