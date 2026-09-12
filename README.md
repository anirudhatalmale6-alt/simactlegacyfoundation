# SImACT Legacy Foundation — live site

This is the Foundation's own copy, served at **simactlegacyfoundation.org**.

The reusable template it came from lives in `foundation-site-template` and keeps
its own preview URL. Two separate repositories on purpose: a repo can carry only
one custom domain, and the template has to stay usable for the next foundation.

---

# Foundation site template

A five-section website for a nonprofit, built so that setting up the next one is
**editing one file** rather than writing code. First use: SImACT Legacy Foundation.

```
index.html              the site
setup.html              helper: paste the Clover link, it checks it
assets/site-config.js   ← the only file you edit
assets/donate.js        the donation module — never edited
assets/logo.jpg         the organisation's logo
```

## Setting up the donation button

1. In the **Clover dashboard**: Ecommerce → Payment links → Create new → URL.
2. Choose **Variable** so the donor types their own amount.
3. Copy the URL Clover gives you.
4. Open `assets/site-config.js` and put it between the quotes:

```js
  DONATE_URL: "https://...",
```

That is the whole setup. Every Donate button on the site — header, hero,
donation section, footer — reads from that one line.

`setup.html` does the same thing with a check and a preview: paste the link, it
tells you whether it will work, and writes out the exact line to copy.

### What happens if it is left empty

The Donate buttons **switch themselves off** — they go grey and read "Donations
opening soon" instead of linking nowhere. A donate button that leads to a broken
page tells a donor the organisation cannot be trusted with money. Being honestly
not-ready-yet costs far less than that.

The buttons also refuse a link that is not `https`. A donation page is where
somebody types a card number.

## Reusing this for another organisation

1. Copy the folder.
2. Replace `assets/logo.jpg`.
3. Edit `assets/site-config.js` — name, tagline, contact details, the figures,
   and the new Clover link.

Nothing else is touched. `donate.js`, `index.html` and `setup.html` stay as they
are. This is tested: the test suite runs the whole site twice, once as SImACT
and once as a different foundation, and checks that only the config changed.

## The figures

Every number on the page comes from `SITE_CONFIG.STATS`, and each one is quoted
from the organisation's own document. **Do not invent one.** A stat left empty is
dropped from the page rather than rendered as a blank tile — the road length is
currently empty because the foundation's own content document still says "XX kms".

`ORG_TAX_STATUS` is empty on purpose. A 501(c)(3) claim or an EIN goes on a
donor-facing page only once the IRS determination letter is in hand.

## Photography

The page is designed to work **without photographs** — typography, rules, and a
sunrise-over-water motif drawn in CSS from the logo. The brief asked for dignity
rather than poverty imagery, and stock photography of Haiti is mostly the latter.

When the organisation's own photographs arrive, the three project cards have
marked photo slots (`.card-top`) that take a `background-image` with no other
change.

## Before launch

- Check the Donate button in all four places.
- Click one: it must open Clover **in a new tab** showing the organisation's name.
- Make **one real donation of a small amount** and confirm it lands in Clover's
  Transactions. A link that looks right and does not settle is the failure worth
  finding before launch.
- Refund that test donation from the Clover dashboard.
