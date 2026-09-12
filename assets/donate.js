/* ═══════════════════════════════════════════════════════════════════════════
   THE DONATION MODULE

   One file, reused unchanged on every nonprofit site we build. It never
   contains a payment link - it reads one from site-config.js. Setting up a new
   foundation is replacing one URL in one file, and this file is not touched.

   HOW TO USE IT ON A PAGE

     <a data-donate>Donate Now</a>              anywhere - nav, hero, footer
     <a data-donate="Give Today">Give</a>       custom label
     <span data-donate-note></span>             optional "processed by Clover"

   Any element carrying data-donate becomes a working donate control. There is
   no limit on how many, and they all stay in step because they are all driven
   from the same value.

   WHAT IT REFUSES TO DO, AND WHY

   1. It will not open an unset link. If DONATE_URL is empty the buttons go
      grey and say "Donations opening soon". A live donate button that leads to
      a blank page reads, to a donor, as an organisation that cannot be trusted
      with money - which is the opposite of what the button is for. Being
      honestly not-ready-yet costs far less.

   2. It will not open a link that is not https. A donation page is where
      someone types a card number.

   3. It opens in a new tab, always, and with rel="noopener noreferrer". New
      tab because the donor should not lose the page they were reading; the rel
      because without it the page we open can reach back and redirect the tab
      it came from, which on a donation flow is worth ruling out.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var CFG = window.SITE_CONFIG || {};

  var TEXT = {
    ready:     'Donate Now',
    notReady:  'Donations opening soon',
    note:      'Secure payment processed by {processor}. Opens in a new tab.',
    noteSoon:  'Our online donation page is being set up.'
  };

  /* A link we are willing to send a donor to.
     Deliberately strict about the scheme and quiet about the host: Clover
     serves payment links from more than one domain and merchants can put their
     own domain in front, so refusing an unfamiliar host would break a valid
     setup. The scheme is the part that actually protects anybody. */
  function isUsable(url) {
    if (!url || typeof url !== 'string') return false;
    var u = url.trim();
    if (!u) return false;
    try {
      var parsed = new URL(u);
      return parsed.protocol === 'https:';
    } catch (e) {
      return false;
    }
  }

  /* Is this host one Clover is known to serve payment links from? Used only to
     say so on the setup page - never to block a link here. */
  function looksLikeClover(url) {
    try {
      var h = new URL(url).hostname.toLowerCase();
      return /(^|\.)clover\.com$/.test(h) ||
             /(^|\.)clover\.net$/.test(h) ||
             /(^|\.)clovergateway\.com$/.test(h);
    } catch (e) { return false; }
  }

  function donateUrl() {
    return (CFG.DONATE_URL || '').trim();
  }

  function ready() {
    return isUsable(donateUrl());
  }

  function noteText() {
    if (!ready()) return TEXT.noteSoon;
    return TEXT.note.replace('{processor}', CFG.DONATE_PROCESSOR || 'our payment provider');
  }

  function wireOne(el) {
    var custom = el.getAttribute('data-donate');
    var label = (custom && custom.trim()) ? custom.trim() : TEXT.ready;

    /* A placement may give its own wording for the switched-off state.
       "Donations opening soon" is the right sentence in a full-width donation
       section and 212 pixels wide in a sticky header on a phone, where it
       pushed the menu button off the screen. Same meaning, room to be shorter
       where there is no room. */
    var offCustom = el.getAttribute('data-donate-unset');
    var offLabel = (offCustom && offCustom.trim()) ? offCustom.trim() : TEXT.notReady;

    if (ready()) {
      var href = donateUrl();
      if (el.tagName === 'A') {
        el.setAttribute('href', href);
        el.setAttribute('target', '_blank');
        /* Both tokens on purpose. noopener is the one that matters; noreferrer
           is kept for older browsers that only understood that one. */
        el.setAttribute('rel', 'noopener noreferrer');
      } else {
        el.addEventListener('click', function () {
          window.open(href, '_blank', 'noopener,noreferrer');
        });
      }
      el.removeAttribute('aria-disabled');
      el.classList.remove('is-unset');
      if (!el.hasAttribute('data-donate-keep-text')) el.textContent = label;
      el.setAttribute('aria-label', label + ' (opens in a new tab)');
      return;
    }

    /* Not configured. Visibly and honestly switched off. */
    el.classList.add('is-unset');
    el.setAttribute('aria-disabled', 'true');
    el.removeAttribute('href');
    el.removeAttribute('target');
    if (!el.hasAttribute('data-donate-keep-text')) el.textContent = offLabel;
    el.setAttribute('title', 'The donation link has not been set yet.');
    el.addEventListener('click', function (e) {
      e.preventDefault();
    });
  }

  function apply() {
    CFG = window.SITE_CONFIG || {};
    var els = document.querySelectorAll('[data-donate]');
    for (var i = 0; i < els.length; i++) wireOne(els[i]);

    var notes = document.querySelectorAll('[data-donate-note]');
    for (var j = 0; j < notes.length; j++) notes[j].textContent = noteText();

    /* Loud in the console, silent on the page. Whoever is setting the site up
       sees this immediately; a visitor sees a tidy "opening soon" button and
       no error. */
    if (!ready()) {
      var why = donateUrl() ? 'it is not a valid https URL' : 'it is empty';
      console.warn('[donate] DONATE_URL in assets/site-config.js is not usable - ' + why +
                   '. Donate buttons are switched off. Open setup.html for help.');
    } else if (!looksLikeClover(donateUrl())) {
      console.info('[donate] DONATE_URL is not on a clover.com address. That is fine if ' +
                   'the foundation uses its own domain - worth a glance otherwise.');
    }
    return els.length;
  }

  /* Exposed so setup.html can check a pasted link with exactly the same rules
     the live site uses. A checker that is a second implementation only proves
     what the checker thinks. */
  window.DonateModule = {
    apply: apply,
    isUsable: isUsable,
    looksLikeClover: looksLikeClover,
    ready: ready,
    url: donateUrl
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
