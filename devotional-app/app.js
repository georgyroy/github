'use strict';

/* ─── Data ──────────────────────────────────────────────────────── */
const PRAYERS = [
  {
    title: 'A Morning Offering',
    text:
      `Lord, I offer You this day —\nevery thought, word, and deed.\nMay all I do be done for Your glory,\nand may Your grace guide each step I take.\n\nGrant me wisdom to choose what is right,\ncourage to do what is good,\nand a heart ever open to Your love.\n\nIn Jesus' name, Amen.`,
    reflection:
      'Begin today with intention. Before the noise of the world rushes in, sit quietly for a moment and remember: this day is a gift. You are not alone in it.',
  },
  {
    title: 'A Prayer for Peace',
    text:
      `Prince of Peace, still the storms within me.\nWhere there is anxiety, bring calm.\nWhere there is confusion, bring clarity.\nWhere there is heaviness, bring lightness of spirit.\n\nLet Your peace, which surpasses all understanding,\nguard my heart and mind today.\n\nAmen.`,
    reflection:
      'Peace is not the absence of difficulty but the presence of God within it. Breathe deeply. You are held.',
  },
  {
    title: 'A Prayer for Strength',
    text:
      `Almighty God, I come to You weary,\nbut trusting in Your promise —\nthat those who wait on You shall renew their strength.\n\nFill me with the power of Your Spirit.\nLet me not grow faint, but press on\nwith joy and endurance, knowing that\nYou who began a good work in me\nwill carry it to completion.\n\nAmen.`,
    reflection:
      'Your weakness is not an obstacle to God — it is an invitation for His strength to be made perfect. Lean in.',
  },
  {
    title: 'A Prayer of Gratitude',
    text:
      `Father, how good You have been to me.\nBefore I ask for anything today,\nI pause to give thanks —\nfor life, for breath, for mercy new every morning.\n\nYou have been faithful.\nHelp me remember that when the day grows hard.\nMay gratitude be the posture of my heart\nin every season.\n\nAmen.`,
    reflection:
      'Gratitude is a spiritual discipline. It reorients the soul away from what is lacking toward the abundance already present.',
  },
  {
    title: 'A Prayer for Others',
    text:
      `Lord, today I lift up those I love\nand those I find hard to love.\n\nFor the weary, bring rest.\nFor the broken, bring healing.\nFor the lost, bring a light to guide them home.\n\nUse me, however small my part,\nto be an instrument of Your grace.\n\nAmen.`,
    reflection:
      'Intercession is love in action. When you pray for someone, you are participating in God\'s work in their life.',
  },
];

const SCRIPTURES = [
  {
    verse: 'I can do all things through Christ who strengthens me.',
    ref: 'Philippians 4:13',
    meditation:
      'This is not a promise of unlimited human potential — it is a declaration of dependence. Paul wrote it from prison. The "all things" he speaks of includes suffering, contentment in lack, and endurance through hardship. The source is Christ. The strength is His.',
  },
  {
    verse: 'The Lord is my shepherd; I shall not want.',
    ref: 'Psalm 23:1',
    meditation:
      'A shepherd does not manage sheep from a distance. He walks with them, knows them by name, and lays down his life for them. To say "the Lord is my shepherd" is to say: I belong to someone who is present, attentive, and good.',
  },
  {
    verse: 'For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life.',
    ref: 'John 3:16',
    meditation:
      'The grammar matters: past tense, completed action. God loved. God gave. Not conditionally, not reluctantly — completely. This is the foundation. Every prayer, every hope, every act of faith rests on this single, astonishing fact.',
  },
  {
    verse: 'Trust in the Lord with all your heart, and do not lean on your own understanding.',
    ref: 'Proverbs 3:5',
    meditation:
      'Our understanding is limited by what we can see. God\'s understanding encompasses all of history, all outcomes, all hearts. To trust Him is not to abandon reason but to anchor reason in a larger wisdom than our own.',
  },
  {
    verse: 'Come to me, all who labor and are heavy laden, and I will give you rest.',
    ref: 'Matthew 11:28',
    meditation:
      'Jesus does not say "sort yourself out and come to me." He speaks to the tired, the burdened, the undone. The invitation is unconditional and the promise is simple: rest. Not merely sleep, but the deep rest of a soul that has stopped striving and started trusting.',
  },
  {
    verse: 'Be still, and know that I am God.',
    ref: 'Psalm 46:10',
    meditation:
      'In a world of relentless noise, stillness is countercultural. Yet it is in stillness that we come to know — not just believe in our heads, but deeply know — that God is God. That He is in control. That we do not have to be.',
  },
  {
    verse: 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.',
    ref: 'Jeremiah 29:11',
    meditation:
      'These words were spoken to exiles — people far from home, facing uncertainty. The assurance was not "things will be easy" but "you have not been forgotten." God\'s plans for you are not punitive. They are purposeful. Hope is not wishful thinking; it is trust in a good God.',
  },
];

const WEEKLY_VERSES = [
  { ref: 'Romans 8:28',       snippet: 'All things work together for good…' },
  { ref: 'Isaiah 41:10',      snippet: 'Fear not, for I am with you…' },
  { ref: 'Jeremiah 29:11',    snippet: 'Plans for welfare and not for evil…' },
  { ref: 'John 14:6',         snippet: 'I am the way, the truth, and the life…' },
  { ref: '1 Corinthians 13:4',snippet: 'Love is patient, love is kind…' },
  { ref: 'Philippians 4:6',   snippet: 'Do not be anxious about anything…' },
  { ref: 'Matthew 5:9',       snippet: 'Blessed are the peacemakers…' },
];

/* ─── State ─────────────────────────────────────────────────────── */
let currentPrayerIndex = todayIndex(PRAYERS);
let requests = loadRequests();

/* ─── Helpers ───────────────────────────────────────────────────── */
function todayIndex(arr) {
  const d = new Date();
  return (d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate()) % arr.length;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2600);
}

function loadRequests() {
  try { return JSON.parse(localStorage.getItem('dg_requests') || '[]'); }
  catch { return []; }
}

function saveRequests() {
  localStorage.setItem('dg_requests', JSON.stringify(requests));
}

/* ─── Prayer Tab ────────────────────────────────────────────────── */
function renderPrayer() {
  const p = PRAYERS[currentPrayerIndex];
  document.getElementById('prayer-title').textContent = p.title;
  document.getElementById('prayer-text').textContent   = p.text;
  document.getElementById('reflection-text').textContent = p.reflection;
  document.getElementById('prayer-counter').textContent =
    `${currentPrayerIndex + 1} / ${PRAYERS.length}`;
}

document.getElementById('prev-prayer').addEventListener('click', () => {
  currentPrayerIndex = (currentPrayerIndex - 1 + PRAYERS.length) % PRAYERS.length;
  renderPrayer();
});

document.getElementById('next-prayer').addEventListener('click', () => {
  currentPrayerIndex = (currentPrayerIndex + 1) % PRAYERS.length;
  renderPrayer();
});

/* ─── Scripture Tab ─────────────────────────────────────────────── */
function renderScripture() {
  const s = SCRIPTURES[todayIndex(SCRIPTURES)];
  document.getElementById('scripture-verse').textContent = s.verse;
  document.getElementById('scripture-ref').textContent   = s.ref;
  document.getElementById('meditation-text').textContent = s.meditation;

  const list = document.getElementById('verse-list');
  list.innerHTML = '';
  WEEKLY_VERSES.forEach(v => {
    const li = document.createElement('li');
    li.className = 'verse-item';
    li.innerHTML = `
      <span class="verse-dot"></span>
      <span class="verse-ref">${v.ref}</span>
      <span class="verse-snippet">${v.snippet}</span>
    `;
    list.appendChild(li);
  });
}

/* ─── Prayer Requests ───────────────────────────────────────────── */
const textarea = document.getElementById('request-input');
const charCount = document.getElementById('char-count');

textarea.addEventListener('input', () => {
  charCount.textContent = 500 - textarea.value.length;
});

document.getElementById('submit-request').addEventListener('click', () => {
  const text = textarea.value.trim();
  if (!text) { showToast('Please write your prayer request first.'); return; }

  const name = document.getElementById('request-name').value.trim() || 'Anonymous';
  const req = { id: Date.now(), text, name, ts: Date.now(), prayCount: 0, prayed: false };
  requests.unshift(req);
  saveRequests();

  textarea.value = '';
  document.getElementById('request-name').value = '';
  charCount.textContent = '500';
  showToast('Your request has been added. \u2764\ufe0f');
  renderRequests();
});

function renderRequests() {
  const container = document.getElementById('requests-list');
  const empty     = document.getElementById('empty-state');
  container.innerHTML = '';

  if (requests.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  requests.forEach((req, i) => {
    const card = document.createElement('div');
    card.className = 'request-card';
    card.innerHTML = `
      <div class="request-card-header">
        <span class="request-author">${escHtml(req.name)}</span>
        <span class="request-time">${timeAgo(req.ts)}</span>
      </div>
      <p class="request-body">${escHtml(req.text)}</p>
      <div class="request-actions">
        <button class="pray-btn${req.prayed ? ' prayed' : ''}" data-idx="${i}" aria-label="I prayed for this">
          <span class="pray-icon">&#9770;</span>
          ${req.prayed ? 'Prayed' : 'I\'ll pray'} &middot; ${req.prayCount}
        </button>
        <button class="delete-btn" data-idx="${i}" aria-label="Remove request">Remove</button>
      </div>
    `;
    container.appendChild(card);
  });

  // Pray buttons
  container.querySelectorAll('.pray-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = +btn.dataset.idx;
      if (!requests[idx].prayed) {
        requests[idx].prayed = true;
        requests[idx].prayCount++;
        saveRequests();
        showToast('Thank you for praying. \uD83D\uDE4F');
        renderRequests();
      }
    });
  });

  // Delete buttons
  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = +btn.dataset.idx;
      requests.splice(idx, 1);
      saveRequests();
      renderRequests();
    });
  });
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ─── Tabs ──────────────────────────────────────────────────────── */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.tab;
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.toggle('active', t === tab);
      t.setAttribute('aria-selected', t === tab);
    });
    document.querySelectorAll('.tab-panel').forEach(p => {
      p.classList.toggle('active', p.id === `tab-${id}`);
    });
  });
});

/* ─── Init ──────────────────────────────────────────────────────── */
document.getElementById('today-date').textContent = formatDate(new Date());
renderPrayer();
renderScripture();
renderRequests();
