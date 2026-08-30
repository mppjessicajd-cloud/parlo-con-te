// ============================================================
// PARLO CON TE – COMUNICO CAA
// JavaScript del sito ufficiale
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScrolling();
  initRevealAnimations();
  initCurrentYear();
});

// ============================================================
// SCORRIMENTO FLUIDO
// ============================================================

function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

// ============================================================
// ANIMAZIONI QUANDO LE SEZIONI ENTRANO NELLO SCHERMO
// ============================================================

function initRevealAnimations() {
  const elements = document.querySelectorAll(
    '.section, .card, .hero'
  );

  if (!elements.length) {
    return;
  }

  // Se il browser non supporta IntersectionObserver,
  // mostriamo normalmente tutti gli elementi.
  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => {
      element.classList.add('visible');
    });

    return;
  }

  elements.forEach((element) => {
    element.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('visible');

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// ============================================================
// ANNO AUTOMATICO NEL FOOTER
// ============================================================

function initCurrentYear() {
  const yearElements = document.querySelectorAll(
    '[data-current-year]'
  );

  if (!yearElements.length) {
    return;
  }

  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

// ============================================================
// SUPPORTO PER MENU MOBILE
// ============================================================

function toggleMobileMenu(button, menu) {
  if (!button || !menu) {
    return;
  }

  const isOpen =
    menu.classList.contains('open');

  menu.classList.toggle('open', !isOpen);

  button.setAttribute(
    'aria-expanded',
    String(!isOpen)
  );
}

// ============================================================
// CHIUSURA MENU QUANDO SI CLICCA SU UN LINK
// ============================================================

function closeMobileMenu(menu, button) {
  if (!menu) {
    return;
  }

  menu.classList.remove('open');

  if (button) {
    button.setAttribute(
      'aria-expanded',
      'false'
    );
  }
}

// ============================================================
// ACCESSIBILITÀ
// ============================================================

// Rispetta l'impostazione del dispositivo per chi
// preferisce ridurre le animazioni.

const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

if (prefersReducedMotion) {
  document.documentElement.classList.add(
    'reduce-motion'
  );
}
