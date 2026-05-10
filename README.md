# Travel Journal

A code-first personal travel photography journal with a minimalist interactive world map as the homepage entrance.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Image-based world map with data-driven markers
- Vercel-ready deployment structure

## Project Structure

```txt
app/
  countries/[slug]/page.tsx  Country / region detail template
  page.tsx                   Homepage
  globals.css                Global styles
components/
  InteractiveWorldMap.tsx    Clickable world map hero
  CountryStoryCard.tsx       Travel story card
  CountryGrid.tsx            Story index
  Hero.tsx                   First viewport map entrance
data/
  travels.ts                 Single editable travel data source
public/
  images/world-map-minimal.png
  photos/                    Future personal travel photos
types/
  travel.ts                  Shared travel data types
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Editing Travel Entries

Edit [data/travels.ts](./data/travels.ts). Each entry controls:

- map marker position
- marker tooltip
- homepage travel card
- country detail page
- sitemap entry

## Adding Photos

Put personal photos in `public/photos/`, for example:

```txt
public/photos/japan/cover.jpg
public/photos/japan/01.jpg
public/photos/japan/02.jpg
```

Then change `coverImage` in `data/travels.ts`:

```ts
coverImage: "/photos/japan/cover.jpg"
```

The current gallery blocks are placeholders, ready to be replaced with real photo arrays later.

## Deployment

This repository is ready for Vercel:

1. Push to GitHub.
2. Import or connect the repository in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to the production URL.
4. Deploy with the default Next.js settings.
