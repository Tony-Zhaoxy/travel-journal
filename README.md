# Travel Field Notes

A code-first travel photography and life journal built for ongoing Codex-based development.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lightweight SVG world map with data-driven markers
- Vercel-ready project structure

## Project Structure

```txt
app/
  countries/[slug]/page.tsx  Dynamic country story template
  page.tsx                   Landing page
  globals.css                Tailwind entry and global styles
components/
  InteractiveWorldMap.tsx    Lightweight animated map
  CountryStoryCard.tsx       Reusable country card
  CountryGrid.tsx            Landing story index
  Hero.tsx                   Cinematic landing hero
data/
  travels.ts                 Single source of truth for country entries
lib/
  travel.ts                  Data lookup helpers
types/
  travel.ts                  Shared TypeScript types
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Editing Travel Entries

Update `data/travels.ts` to change countries, years, memories, cover images, map coordinates, route labels, highlight tags, and story text. Each entry automatically feeds:

- the interactive map marker and tooltip
- the landing page story card
- the individual country page
- static route generation
- sitemap entries

## Deployment

This repository is ready for Vercel:

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to the production URL for accurate sitemap links.
4. Deploy with the default Next.js build settings.

`vercel.json` pins the expected install, dev, and build commands.
