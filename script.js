(() => {
  const QUERY = 'Oil portrait of a 16th century Italian noble family';
  const WAIT_BEFORE_TYPING = 2500; // ms of blinking caret before typing starts
  const WAIT_BEFORE_ENTER = 700;   // ms pause after the last letter

  const browser = document.getElementById('browser');
  const search = document.getElementById('search');
  const results = document.getElementById('results');
  const typed = document.getElementById('typed');
  const caret = search.querySelector('.search__caret');

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let started = false;

  async function runSearch() {
    started = true;
    await sleep(WAIT_BEFORE_TYPING);

    caret.classList.add('is-typing');
    for (const ch of QUERY) {
      typed.textContent += ch;
      // human-ish rhythm: a little slower after spaces
      await sleep(55 + Math.random() * 70 + (ch === ' ' ? 60 : 0));
    }
    caret.classList.remove('is-typing');

    await sleep(WAIT_BEFORE_ENTER);

    // "Enter": the results page replaces the search page
    search.classList.remove('is-active');
    results.classList.add('is-active');
  }

  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting && !started) {
      obs.disconnect();
      runSearch();
    }
  }, { threshold: 0.6 }).observe(browser);

  /* ---------- Image viewer ---------- */
  const viewer = document.getElementById('viewer');
  const vImg = document.getElementById('viewer-img');
  const vTitle = document.getElementById('viewer-title');
  const vSource = document.getElementById('viewer-source');
  const vFav = document.getElementById('viewer-fav');
  let selected = null;

  function open(thumb) {
    if (selected) selected.classList.remove('is-selected');
    selected = thumb;
    thumb.classList.add('is-selected');

    vImg.src = thumb.querySelector('img').src;
    vTitle.textContent = thumb.dataset.title;
    vSource.textContent = thumb.dataset.source;
    vFav.textContent = thumb.dataset.source.charAt(0);

    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
  }

  function close() {
    if (selected) selected.classList.remove('is-selected');
    selected = null;
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
  }

  results.querySelectorAll('.thumb').forEach((t) =>
    t.addEventListener('click', () => (t === selected ? close() : open(t)))
  );
  document.getElementById('viewer-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();
