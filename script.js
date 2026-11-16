(() => {
  const QUERY = 'Oil portrait of a 16th century Italian noble family';
  const WAIT_BEFORE_TYPING = 2500; // ms of blinking caret before typing starts
  const WAIT_BEFORE_ENTER = 700;   // ms pause after the last letter

  /* Planted images: column (0 = leftmost of 8) and position in that column,
     matching where they sit in the Figma "result" frame. */
  const PLANTED = [
    { col: 7, slot: 0, src: 'assets/r1.jpg', ratio: 227 / 282, title: 'Lucia Casalini Torelli, Portrait of the Italian Noble Family', source: 'Pamono' },
    { col: 5, slot: 0, src: 'assets/r2.jpg', ratio: 232 / 282, title: 'Portrait of Eleanor of Toledo - Wikipedia', source: 'Wikipedia' },
    { col: 2, slot: 0, src: 'assets/r3.jpg', ratio: 230 / 301, title: 'Portrait Noble Woman Italian School Painting', source: '1stDibs' },
    { col: 0, slot: 0, src: 'assets/r4.jpg', ratio: 227 / 301, title: 'Italian School, 16th Century portrait of a noble', source: 'Selling Antiques' },
    { col: 7, slot: 2, src: 'assets/r5.jpg', ratio: 228 / 305, title: 'A Renaissance oil painting from Florence', source: 'Wikipedia' },
    { col: 4, slot: 1, src: 'assets/r6.jpg', ratio: 228 / 354, title: 'Lucia Casalini Torelli, Portrait of the Italian Noble', source: 'Pamono' },
  ];

  const search = document.getElementById('search');
  const results = document.getElementById('results');
  const grid = document.getElementById('grid');
  const typed = document.getElementById('typed');
  const caret = search.querySelector('.search__caret');
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- Results grid (Google-style masonry) ---------- */
  // family portraits first, as the query asks for a "noble family"
  const isFamily = (t) => /family|daughter|son\b|sisters|child|page/i.test(t);
  const pool = [...window.GRID_ITEMS]
    .map((it) => ({ ...it, ratio: Math.min(1.35, Math.max(0.62, it.w / it.h)) }))
    .sort((a, b) => isFamily(b.title) - isFamily(a.title));

  function card(item) {
    const b = document.createElement('button');
    b.className = 'result';
    b.type = 'button';
    b.dataset.src = item.src;
    b.dataset.title = item.title;
    b.dataset.source = item.source;
    b.innerHTML =
      `<span class="result__img" style="aspect-ratio:${item.ratio}"><img src="${item.src}" alt="" loading="lazy"></span>` +
      `<span class="result__title"></span>` +
      `<span class="result__source"><span class="src"></span><span class="result__fav"></span></span>`;
    b.querySelector('.result__title').textContent = item.title;
    b.querySelector('.src').textContent = item.source;
    b.querySelector('.result__fav').textContent = item.source.charAt(0);
    return b;
  }

  function layout(nCols) {
    grid.innerHTML = '';
    const cols = Array.from({ length: nCols }, () => {
      const el = document.createElement('div');
      el.className = 'col';
      grid.appendChild(el);
      return { el, h: 0, n: 0 };
    });
    // map the 8-column Figma positions onto however many columns we have
    const planted = PLANTED.map((p) => ({ ...p, col: Math.round((p.col * (nCols - 1)) / 7) }));
    const add = (c, item) => {
      c.el.appendChild(card(item));
      c.h += 1 / item.ratio + 0.18; // image height + caption, in column widths
      c.n += 1;
    };
    let i = 0;
    while (i < pool.length) {
      const c = cols.reduce((a, b) => (b.h < a.h ? b : a)); // shortest column next
      const ci = cols.indexOf(c);
      const pi = planted.findIndex((p) => p.col === ci && p.slot <= c.n);
      if (pi !== -1) add(c, planted.splice(pi, 1)[0]);
      else add(c, pool[i++]);
    }
    planted.forEach((p) => add(cols[p.col], p)); // safety: never drop a planted image
  }

  let currentCols = 0;
  const wantedCols = () => (viewer.classList.contains('is-open') ? 5 : 8);
  function relayout() {
    const n = wantedCols();
    if (n === currentCols) return;
    currentCols = n;
    const sel = selected && selected.dataset.src;
    layout(n);
    if (sel) {
      selected = grid.querySelector(`.result[data-src="${sel}"]`);
      if (selected) selected.classList.add('is-selected');
    }
  }

  /* ---------- Search animation ---------- */
  let started = false;
  async function runSearch() {
    started = true;
    await sleep(WAIT_BEFORE_TYPING);

    caret.classList.add('is-typing');
    for (const ch of QUERY) {
      typed.textContent += ch;
      await sleep(55 + Math.random() * 70 + (ch === ' ' ? 60 : 0));
    }
    caret.classList.remove('is-typing');

    await sleep(WAIT_BEFORE_ENTER);

    // "Enter": the results page replaces the search page, scrolled to its top
    relayout();
    const top = search.getBoundingClientRect().top + window.scrollY;
    search.hidden = true;
    results.hidden = false;
    window.scrollTo({ top, behavior: 'instant' });
  }

  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting && !started) {
      obs.disconnect();
      runSearch();
    }
  }, { threshold: 0.6 }).observe(search);

  /* ---------- Image viewer ---------- */
  const viewer = document.getElementById('viewer');
  const vImg = document.getElementById('viewer-img');
  const vTitle = document.getElementById('viewer-title');
  const vSource = document.getElementById('viewer-source');
  const vFav = document.getElementById('viewer-fav');
  let selected = null;

  function open(btn) {
    if (selected) selected.classList.remove('is-selected');
    selected = btn;
    btn.classList.add('is-selected');

    vImg.src = btn.dataset.src;
    vTitle.textContent = btn.dataset.title;
    vSource.textContent = btn.dataset.source;
    vFav.textContent = btn.dataset.source.charAt(0);

    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    results.classList.add('has-viewer');
    relayout();
    if (selected) selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function close() {
    if (selected) selected.classList.remove('is-selected');
    selected = null;
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    results.classList.remove('has-viewer');
    relayout();
  }

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.result');
    if (!btn) return;
    if (btn === selected) close();
    else open(btn);
  });
  document.getElementById('viewer-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // the panel is pinned to the screen, so close it when the results page scrolls away
  new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting && viewer.classList.contains('is-open')) close();
  }).observe(results);
})();
