// =====================================================================
// DATI PITTOGRAMMI DI ESEMPIO (demo "Prova Comunica")
// =====================================================================
const PICTOGRAMS = [
  { emoji: '🙋', label: 'Io' },
  { emoji: '💭', label: 'Voglio' },
  { emoji: '💧', label: 'Acqua' },
  { emoji: '🍎', label: 'Mela' },
  { emoji: '🎲', label: 'Giocare' },
  { emoji: '🆘', label: 'Aiuto' },
  { emoji: '✅', label: 'Sì' },
  { emoji: '❌', label: 'No' },
  { emoji: '🙏', label: 'Grazie' },
  { emoji: '😊', label: 'Felice' },
  { emoji: '🛑', label: 'Basta' },
  { emoji: '🚻', label: 'Bagno' },
];

// =====================================================================
// STATO DEMO
// =====================================================================
let sentence = [];

const sentenceBar = document.getElementById('sentenceBar');
const sentencePlaceholder = document.getElementById('sentencePlaceholder');
const pictogramGrid = document.getElementById('pictogramGrid');
const speakBtn = document.getElementById('speakBtn');
const clearBtn = document.getElementById('clearBtn');
const speechHint = document.getElementById('speechHint');

function renderPictograms() {
  pictogramGrid.innerHTML = '';
  PICTOGRAMS.forEach((p) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pictogram-btn';
    btn.innerHTML = `<span class="emoji" aria-hidden="true">${p.emoji}</span><span>${p.label}</span>`;
    btn.addEventListener('click', () => addWord(p));
    pictogramGrid.appendChild(btn);
  });
}

function addWord(p) {
  sentence.push(p);
  renderSentence();
}

function renderSentence() {
  sentenceBar.innerHTML = '';

  if (sentence.length === 0) {
    sentenceBar.appendChild(sentencePlaceholder);
    speakBtn.disabled = true;
    clearBtn.disabled = true;
    return;
  }

  sentence.forEach((p) => {
    const chip = document.createElement('span');
    chip.className = 'sentence-chip';
    chip.innerHTML = `<span aria-hidden="true">${p.emoji}</span> ${p.label}`;
    sentenceBar.appendChild(chip);
  });

  speakBtn.disabled = false;
  clearBtn.disabled = false;
}

function clearSentence() {
  sentence = [];
  renderSentence();
}

function speakSentence() {
  const text = sentence.map((p) => p.label).join(' ');

  if (!('speechSynthesis' in window)) {
    speechHint.hidden = false;
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'it-IT';
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

if (pictogramGrid) {
  renderPictograms();
  renderSentence();
  speakBtn.addEventListener('click', speakSentence);
  clearBtn.addEventListener('click', clearSentence);
}

// =====================================================================
// SCROLL REVEAL (IntersectionObserver)
// =====================================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}
