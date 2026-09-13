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

// =====================================================================
// SEZIONE ACQUISTO — inserita direttamente nella sezione #scarica
// =====================================================================
(function setupPurchaseSection() {
  const section = document.getElementById('scarica');
  if (!section) return;

  const stripeUrl = 'https://buy.stripe.com/3cI6oIcRg2xZ2hC2xw3sI00';
  const googlePlayUrl = 'https://play.google.com/store/apps/details?id=it.parloconme.app';
  const googlePlayBadge = 'https://play.google.com/intl/en_us/badges/images/generic/it_badge_web_generic.png';

  section.innerHTML = `
    <div style="max-width:1080px;margin:0 auto;padding:10px 0;text-align:center;">
      <p style="margin:0 0 10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#168f83;font-size:.82rem;">Disponibile su Android</p>
      <h2 id="purchase-title" style="margin:0 auto 12px;font-family:'Baloo 2',sans-serif;font-size:clamp(2rem,5vw,3.1rem);line-height:1.05;color:#183b45;">Parlo con Te – Comunico CAA</h2>
      <p style="max-width:720px;margin:0 auto 28px;color:#52636a;font-size:1.05rem;line-height:1.65;">Scegli il metodo che preferisci per ottenere l'app. <strong>5,99 € una tantum</strong>, senza abbonamento.</p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:24px;max-width:900px;margin:0 auto;text-align:left;">

        <article style="background:#fff;border-radius:24px;padding:30px;box-shadow:0 14px 40px rgba(20,60,70,.14);border:2px solid #168f83;overflow:hidden;">
          <div style="display:inline-block;margin-bottom:12px;padding:7px 12px;border-radius:999px;background:#168f83;color:#fff;font-size:.78rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;">Acquisto dal sito</div>
          <div style="font-size:2.2rem;margin-bottom:5px;">💳</div>
          <h3 style="margin:0 0 8px;color:#183b45;font-family:'Baloo 2',sans-serif;font-size:1.65rem;">Acquista l'app</h3>
          <p style="margin:0 0 20px;color:#5c6b71;line-height:1.6;font-size:1.02rem;">Pagamento sicuro tramite Stripe. <strong>5,99 € una tantum.</strong></p>
          <a href="${stripeUrl}" target="_blank" rel="noopener noreferrer" aria-label="Acquista l'app Parlo con Te a 5,99 euro" style="display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:100%;min-height:60px;padding:16px 20px;border-radius:17px;background:linear-gradient(135deg,#07574f 0%,#168f83 55%,#20a99b 100%);color:#fff;text-decoration:none;font-weight:900;font-size:1.15rem;box-shadow:0 12px 28px rgba(11,111,100,.38);border:2px solid #07574f;">💳 ACQUISTA L'APP – 5,99 €</a>
          <p style="margin:12px 0 0;text-align:center;color:#66757b;font-size:.88rem;">Dopo il pagamento verificheremo l'acquisto e forniremo il codice Google Play.</p>
        </article>

        <article style="background:#fff;border-radius:24px;padding:30px;box-shadow:0 14px 40px rgba(20,60,70,.12);border:2px solid rgba(20,60,70,.10);overflow:hidden;">
          <div style="display:inline-block;margin-bottom:12px;padding:7px 12px;border-radius:999px;background:#eef1f4;color:#183b45;font-size:.78rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;">Google Play</div>
          <div style="font-size:2.2rem;margin-bottom:5px;">▶️</div>
          <h3 style="margin:0 0 8px;color:#183b45;font-family:'Baloo 2',sans-serif;font-size:1.65rem;">Acquista su Google Play</h3>
          <p style="margin:0 0 18px;color:#5c6b71;line-height:1.6;font-size:1.02rem;">Apri direttamente la pagina ufficiale dell'app sul Google Play Store.</p>
          <a href="${googlePlayUrl}" target="_blank" rel="noopener noreferrer" aria-label="Apri Parlo con Te su Google Play" style="display:flex;align-items:center;justify-content:center;width:100%;box-sizing:border-box;padding:10px 8px;border-radius:12px;background:#fff;text-decoration:none;border:1px solid #d7d7d7;box-shadow:0 6px 18px rgba(20,60,70,.12);overflow:hidden;">
            <img src="${googlePlayBadge}" alt="Disponibile su Google Play" style="display:block;width:min(100%,270px);height:auto;max-height:82px;object-fit:contain;">
          </a>
        </article>

      </div>

      <div style="max-width:850px;margin:26px auto 0;padding:18px 22px;background:rgba(255,255,255,.72);border-radius:18px;color:#52636a;line-height:1.65;font-size:.94rem;">
        <strong style="color:#183b45;">Nota:</strong> il pagamento con Stripe e l'acquisto su Google Play sono due modalità distinte. Se acquisti tramite Stripe, il codice Google Play viene fornito manualmente dopo la verifica del pagamento.
      </div>
    </div>
  `;

  section.setAttribute('aria-labelledby', 'purchase-title');
})();
