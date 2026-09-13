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
// PULSANTE STRIPE NELLA HOME — molto visibile accanto a Google Play
// =====================================================================
(function addStripeButtonToExistingStoreCta() {
  const stripeUrl = 'https://buy.stripe.com/3cI6oIcRg2xZ2hC2xw3sI00';
  const googlePlayLinks = Array.from(document.querySelectorAll('a[href*="play.google.com/store/apps?id=it.parloconme.app"]'));
  if (!googlePlayLinks.length || document.querySelector('[data-stripe-home-button="true"]')) return;

  const playLink = googlePlayLinks[googlePlayLinks.length - 1];
  const wrapper = playLink.parentElement;
  if (!wrapper) return;

  const stripeButton = document.createElement('a');
  stripeButton.href = stripeUrl;
  stripeButton.target = '_blank';
  stripeButton.rel = 'noopener noreferrer';
  stripeButton.dataset.stripeHomeButton = 'true';
  stripeButton.textContent = '💳 ACQUISTA L\'APP – 5,99 €';
  stripeButton.style.cssText = [
    'display:inline-flex',
    'align-items:center',
    'justify-content:center',
    'gap:10px',
    'box-sizing:border-box',
    'margin:10px 8px',
    'padding:17px 28px',
    'min-width:270px',
    'min-height:56px',
    'border-radius:16px',
    'background:linear-gradient(135deg,#0b6f64 0%,#168f83 55%,#20a99b 100%)',
    'color:#fff',
    'text-decoration:none',
    'font-weight:900',
    'font-size:1.12rem',
    'letter-spacing:.01em',
    'box-shadow:0 12px 28px rgba(11,111,100,.38)',
    'border:2px solid #07574f',
    'transition:transform .2s ease,box-shadow .2s ease'
  ].join(';');

  stripeButton.addEventListener('mouseenter', () => {
    stripeButton.style.transform = 'translateY(-2px) scale(1.02)';
    stripeButton.style.boxShadow = '0 16px 34px rgba(11,111,100,.45)';
  });
  stripeButton.addEventListener('mouseleave', () => {
    stripeButton.style.transform = 'none';
    stripeButton.style.boxShadow = '0 12px 28px rgba(11,111,100,.38)';
  });

  wrapper.appendChild(stripeButton);
})();

// =====================================================================
// SEZIONE ACQUISTO — STRIPE + GOOGLE PLAY
// =====================================================================
(function addPurchaseSection() {
  if (document.getElementById('scarica')) return;

  const section = document.createElement('section');
  section.id = 'scarica';
  section.setAttribute('aria-labelledby', 'purchase-title');
  section.style.cssText = [
    'padding:clamp(56px,8vw,96px) 20px',
    'background:linear-gradient(180deg,#f7fbfa 0%,#eef8f6 100%)',
    'border-top:1px solid rgba(20,50,60,.08)',
    'border-bottom:1px solid rgba(20,50,60,.08)'
  ].join(';');

  section.innerHTML = `
    <div style="max-width:1080px;margin:0 auto;text-align:center;">
      <p style="margin:0 0 10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#168f83;font-size:.82rem;">Acquista Parlo con Te</p>
      <h2 id="purchase-title" style="margin:0 auto 14px;font-family:'Baloo 2',sans-serif;font-size:clamp(2rem,5vw,3.2rem);line-height:1.05;color:#183b45;">Parlo con Te – Comunico CAA</h2>
      <p style="max-width:720px;margin:0 auto 18px;color:#52636a;font-size:1.05rem;line-height:1.65;">Acquista l'app una sola volta: <strong>5,99 €</strong>. Nessun abbonamento.</p>
      <p style="max-width:760px;margin:0 auto 30px;color:#183b45;font-size:1.15rem;font-weight:800;">Scegli come acquistare e iniziare a usare Parlo con Te.</p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;max-width:900px;margin:0 auto 30px;text-align:left;">
        <article style="background:#fff;border-radius:24px;padding:30px;box-shadow:0 14px 40px rgba(20,60,70,.13);border:2px solid #168f83;position:relative;overflow:hidden;">
          <div style="position:absolute;top:0;left:0;right:0;background:#168f83;color:#fff;text-align:center;font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:7px 10px;">Acquisto online</div>
          <div style="font-size:2.4rem;margin-top:22px;margin-bottom:8px;">💳</div>
          <h3 style="margin:0 0 8px;color:#183b45;font-family:'Baloo 2',sans-serif;font-size:1.65rem;">Acquista con Stripe</h3>
          <p style="margin:0 0 20px;color:#5c6b71;line-height:1.6;font-size:1.02rem;">Pagamento sicuro. <strong>5,99 € una tantum</strong>.<br>Nessun abbonamento.</p>
          <a href="https://buy.stripe.com/3cI6oIcRg2xZ2hC2xw3sI00" target="_blank" rel="noopener noreferrer" aria-label="Acquista l'app Parlo con Te con Stripe al prezzo di 5,99 euro" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;box-sizing:border-box;padding:19px 22px;border-radius:17px;background:linear-gradient(135deg,#07574f 0%,#168f83 55%,#20a99b 100%);color:#fff;text-decoration:none;font-weight:900;font-size:1.18rem;box-shadow:0 12px 28px rgba(11,111,100,.38);border:2px solid #07574f;">💳 ACQUISTA L'APP – 5,99 €</a>
          <p style="margin:12px 0 0;text-align:center;color:#66757b;font-size:.88rem;">Pagamento sicuro tramite Stripe</p>
        </article>

        <article style="background:#fff;border-radius:24px;padding:30px;box-shadow:0 12px 35px rgba(20,60,70,.10);border:1px solid rgba(20,60,70,.07);">
          <div style="font-size:2.4rem;margin-bottom:8px;">▶️</div>
          <h3 style="margin:0 0 8px;color:#183b45;font-family:'Baloo 2',sans-serif;font-size:1.65rem;">Google Play</h3>
          <p style="margin:0 0 20px;color:#5c6b71;line-height:1.6;font-size:1.02rem;">Acquista e installa l'app direttamente dal Google Play Store.</p>
          <a href="https://play.google.com/store/apps/details?id=it.parloconme.app" target="_blank" rel="noopener noreferrer" aria-label="Apri Parlo con Te su Google Play" style="display:inline-flex;align-items:center;justify-content:center;width:100%;box-sizing:border-box;padding:6px 8px;border-radius:12px;background:#fff;text-decoration:none;box-shadow:0 5px 18px rgba(20,60,70,.12);border:1px solid #d9d9d9;overflow:hidden;">
            <img src="https://play.google.com/intl/it_it/badges/static/images/badges/it_badge_web_generic.png" alt="Disponibile su Google Play" style="display:block;width:min(100%,270px);height:auto;max-height:82px;object-fit:contain;">
          </a>
        </article>
      </div>

      <div style="max-width:820px;margin:0 auto;background:#fff;border-radius:20px;padding:22px 26px;text-align:left;border:1px solid rgba(20,60,70,.08);">
        <h3 style="margin:0 0 12px;color:#183b45;font-family:'Baloo 2',sans-serif;font-size:1.35rem;">Come acquistare</h3>
        <ol style="margin:0;padding-left:22px;color:#52636a;line-height:1.75;">
          <li><strong>Dal sito:</strong> premi “Acquista l'app – 5,99 €” e completa il pagamento.</li>
          <li><strong>Su Google Play:</strong> premi il badge Google Play e completa l'acquisto direttamente nello store.</li>
          <li><strong>Importante:</strong> il pagamento tramite Stripe e l'acquisto su Google Play sono due canali distinti. Il pagamento Stripe non sostituisce automaticamente l'acquisto Google Play.</li>
        </ol>
      </div>
    </div>
  `;

  const footer = document.querySelector('footer');
  if (footer) {
    footer.parentNode.insertBefore(section, footer);
  } else {
    document.body.appendChild(section);
  }
})();
