/* ═══════════════════════════════════════════════════════════════════════════
   THE ONLY FILE YOU EDIT TO SET UP A NEW SITE.

   Everything that changes from one foundation to the next lives here. The
   pages and the donation module read from it and are never edited.

   To point this site at a different Clover account, change ONE line: the
   DONATE_URL below. Nothing else, anywhere.
   ═══════════════════════════════════════════════════════════════════════════ */

window.SITE_CONFIG = {

  /* ─────────────────────────────────────────────────────────────────────────
     1. THE DONATION LINK.  ← paste the Clover Payment Link between the quotes

     Where it comes from: in the Clover dashboard, go to Ecommerce, then
     Payment links, then Create new, then URL. Choose "Variable" so the donor
     types their own amount. Clover gives you a URL. Copy it and paste it here.

     Leave it empty and the Donate buttons stay switched off on purpose - they
     go grey and read "Donations opening soon" instead of taking a visitor to a
     broken page. A donate button that leads nowhere costs a foundation more
     than one that is honestly not ready yet.

     There is a helper page next to this file - open setup.html in a browser,
     paste the link, and it checks it and writes this line out for you.
     ───────────────────────────────────────────────────────────────────────── */
  DONATE_URL: "https://www.clover.com/pay-widgets/029243bb-4101-4bfa-94c8-bc65ac846577",

  /* Where the money goes, in words. Shown under the donate button so a donor
     knows who is taking the payment before they click away to Clover. */
  DONATE_PROCESSOR: "Clover",

  /* ─────────────────────────────────────────────────────────────────────────
     2. THE ORGANISATION
     ───────────────────────────────────────────────────────────────────────── */
  ORG_NAME: "SImACT Legacy Foundation",
  ORG_SHORT: "SImACT Legacy Foundation",
  ORG_TAGLINE: "Building Today. Empowering Tomorrow. Leaving a Legacy.",
  ORG_LOGO: "assets/logo.jpg",
  ORG_DOMAIN: "simactlegacyfoundation.org",

  /* ⛔ A 501(c)(3) claim, an EIN, or a "donations are tax deductible" line goes
     here ONLY when the IRS determination letter is in hand. Printing it early
     is a statement to donors that cannot be taken back. Left empty on purpose. */
  ORG_TAX_STATUS: "",

  /* ─────────────────────────────────────────────────────────────────────────
     3. CONTACT
     A blank line is simply not shown, so an address you do not have yet does
     not appear as an empty row.
     ───────────────────────────────────────────────────────────────────────── */
  CONTACT_ADDRESS_US: "2687 Bedford Avenue, Brooklyn, NY 11210, United States",
  CONTACT_ADDRESS_HT: "",
  CONTACT_HOURS: "Monday - Friday, 8:00 am to 4:00 pm",
  /* Not published until it is confirmed to exist and to be monitored - the
     content document asks "do we have this set up already?". An address on a
     contact page that nobody reads is worse than no address. */
  CONTACT_EMAIL: "",
  CONTACT_PHONE: "",
  /* A WhatsApp number turns on a WhatsApp button in the contact section. In
     digits with the country code, no plus and no spaces - e.g. "50912345678".
     Left empty means no button, rather than a button that goes nowhere. */
  CONTACT_WHATSAPP: "",

  /* ─────────────────────────────────────────────────────────────────────────
     4. THE NUMBERS
     Every one of these is quoted from the foundation's own content document.
     ⛔ Do not invent one. An unverified figure on a donor-facing page is the
     kind of mistake that is repeated by other people afterwards.
     Leave a value empty and its tile is left out of the page entirely.
     ───────────────────────────────────────────────────────────────────────── */
  STATS: [
    { value: "12+",       label: "Years of sustained service" },
    { value: "$500,000+", label: "Contributed to community development" },
    /* The content document has this as "XX kms" - still blank at their end.
       Filled in the day they give us the number; until then no empty tile. */
    { value: "",          label: "Kilometres of road built and improved" },
    { value: "6",         label: "Sectors of investment" }
  ],

  /* ─────────────────────────────────────────────────────────────────────────
     5. THEME
     80 percent navy and neutral, 20 percent accent - their brief was firm on
     this. Do not use every logo colour in every section.
     ───────────────────────────────────────────────────────────────────────── */
  THEME: {
    navy:   "#0B1E4B",
    navyDeep: "#06132F",
    red:    "#C8102E",
    green:  "#1B7F4C",
    ocean:  "#1B6CA8",
    sand:   "#F4F1EA",
    ink:    "#16233F",
    muted:  "#5B6B87"
  }
};
