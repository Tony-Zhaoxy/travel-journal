# 旅行札记

一个 code-first 的个人旅行摄影与生活记录网站。首页用极简世界地图作为入口，标记点和旅行卡片都由同一个数据文件驱动。

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Image-based world map with hand-tuned marker positions
- Vercel-ready deployment structure

## Project Structure

```txt
app/
  countries/[slug]/page.tsx  国家 / 地区详情模板
  page.tsx                   首页
  globals.css                Global styles
components/
  InteractiveWorldMap.tsx    可点击的首页世界地图
  CountryStoryCard.tsx       旅行记录卡片
  CountryGrid.tsx            记录列表
  Hero.tsx                   首屏地图入口
data/
  travels.ts                 唯一需要优先编辑的旅行数据源
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

- map marker position through `mapPosition`
- marker tooltip
- homepage travel card
- country / region detail page
- sitemap entry

The current list follows Tony's latest visited countries, regions, and U.S. states:
Singapore, England, Wales, Scotland, Northern Ireland, Gibraltar, Netherlands, Germany, France, Finland, Spain, Iceland, Belgium, Egypt, Japan, Denmark, Sweden, Norway, Czech Republic, California, Nevada, Arizona, Utah, and Hawaii.

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
