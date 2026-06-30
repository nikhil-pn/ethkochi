# eatkochi 🍌⟠

The promotional website for **ethKochi** — an Ethereum hackathon in Kochi,
Kerala (*God's Own Country*). A deliberately brain-rotted teaser site: a
parental-advisory gate, a can-can soundtrack, a counting "time you've wasted"
timer, and a `/chips` easter egg.

🔗 **Repo:** https://github.com/nikhil-pn/eatkochi

> ℹ️ This is the hackathon's marketing site. It is **not** related to any
> assistant/agent ("eva-bot") tooling.

---

## Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4**
- `next/font` (Geist Sans)

> ⚠️ Next.js 16 has breaking changes vs older versions. See `AGENTS.md` and check
> `node_modules/next/dist/docs/` before writing framework code.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3001  (binds 0.0.0.0:3001)
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
app/
  layout.tsx          # root layout — SEO metadata + viewport
  page.tsx            # home / teaser (client component)
  chips/page.tsx      # "free chips?" troll + contribute page
  globals.css         # Tailwind import + theme tokens + scribble animation
  favicon.ico         # icons, generated from public/assets/vector.png …
  icon.png            #   … (favicon.ico + icon.png + apple-icon.png are
  apple-icon.png      #   auto-wired by Next's metadata file conventions)
  opengraph-image.png # social share cards (1200×630)
  twitter-image.png
public/assets/        # logos, hero video, soundtrack, images
next.config.ts        # allowedDevOrigins (dev), poweredByHeader: false
```

---

## Brand guidelines

### Name & tagline
- **Event name:** **ethKochi** (stylized lowercase "eth" + "Kochi"). Malayalam
  lockup used on packaging art: **ETH കൊച്ചി**.
- **Project / repo codename:** `eatkochi` (the "eat Kochi" food pun).
- **Tagline:** *An Ethereum hackathon in God's Own Country.*

### Colors

| Role | Hex | Usage |
|------|-----|-------|
| Gold (primary accent) | `#f0a010` | CTAs, links, eyebrows, highlights |
| Gold — hover | `#ffb733` | hover state on gold buttons/links |
| Black | `#000000` | primary background, theme-color |
| Near-black | `#0a0a0a` | OG image / dark surfaces |
| White | `#ffffff` | text on dark; `/chips` background |
| Ink | `#171717` | body text on light surfaces |

### Typography
- **Geist Sans** via `next/font` (CSS var `--font-sans`); fallback `Arial`.
- **Eyebrows / labels:** uppercase, wide letter-spacing (e.g. `tracking-[0.35em]`).
- (Geist Mono was removed — it was never rendered.)

### Logo & assets (`public/assets/`)
- `vector.png` — the orange ⟠ Ethereum diamond. **Favicon / icon source — keep it.**
- `eatkochi-logo.png` — primary wordmark/logo (home hero + OG image).
- `elephant-logo.png` — the elephant mark (top-left on the gate).
- `chips-3.png` — the three "ETH കൊച്ചി Banana Chips" packets (the running gag).
- `coming-soon.png` — "coming soon" lockup.
- `parental-advisory.jpg` — the Explicit-Content gate label.
- `laura_video.mp4` — hero background video · `cancan_trimmed.mp3` — soundtrack.

### Voice & tone
Irreverent, meme-y, "brain-rot" humour with a Kerala / Malayalam wink. Profanity
and edgy jokes are on-brand — there is literally a parental-advisory gate.
Playful, self-aware, slightly unhinged. **Never corporate.**

---

## Contributing

PRs welcome — fork, branch, open a PR. There's a **surprise gift for contributors
on conference day** 😉

Before submitting, make sure both pass:

```bash
npx tsc --noEmit
npm run lint
```

## SEO / deployment notes
- Set `NEXT_PUBLIC_SITE_URL` to the production domain so Open Graph / canonical
  URLs resolve absolutely (defaults to `https://ethkochi.com`).
- Icons, Open Graph and Twitter images are wired via Next's metadata **file
  conventions** in `app/` — no manual `<link>`/`<meta>` tags required.
