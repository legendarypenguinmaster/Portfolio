# Diamond IT

Marketing site for Diamond IT, built with Next.js (App Router), Tailwind CSS v4, and shadcn/ui.
Dark theme with a yellow accent (`--color-brand` in `globals.css`); headings use Plus Jakarta Sans, body text Noto Sans.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Contact form

The form posts to `POST /api/contact`, which validates the inquiry, posts it to Slack, and keeps a
local copy in `data/inquiries.json`. Add a `.env` file:

```
SLACK_BOT_TOKEN=xoxb-...
SLACK_CHANNEL=C0123456789
```

## Structure

```
src/
  app/
    layout.tsx            Root layout, fonts, metadata, toaster
    page.tsx              Landing page (composes the sections)
    icon.svg              Favicon
    globals.css           Tailwind + shadcn theme tokens, brand/ink colors, animations
    api/contact/route.ts  Contact form handler (Slack + local log)
  components/
    sections/             Hero, About, Services, WhyChoose, Process, Engagement, MarqueeBand, Faq, Contact
    brand.tsx             Design primitives: PillButton, Eyebrow, SectionTitle, Burst, Silk
    reveal.tsx            Scroll fade-in wrapper (respects reduced motion)
    ui/                   shadcn/ui components
    contact-form.tsx      Client-side form
    site-header.tsx       Sticky header + mobile menu
    site-footer.tsx
  lib/
    site.ts               Site name, nav, contact email
    contact.ts            Shared validation for client and server
```

Add more shadcn components with `npx shadcn@latest add <component>`.
