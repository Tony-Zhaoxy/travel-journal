# 旅行札记

一个代码优先的中文旅行摄影与生活记录网站，适合继续用 Codex 在 GitHub 里直接编辑。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- 轻量 SVG 世界地图
- Vercel 部署结构

## 项目结构

```txt
app/
  countries/[slug]/page.tsx  国家 / 地区详情页模板
  page.tsx                   首页
  globals.css                全局样式
components/
  InteractiveWorldMap.tsx    互动世界地图
  CountryStoryCard.tsx       国家 / 地区卡片
  CountryGrid.tsx            首页旅行索引
  Hero.tsx                   首页首屏
data/
  travels.ts                 旅行数据唯一入口
public/
  photos/                    未来放个人旅行照片的位置
types/
  travel.ts                  旅行数据类型
```

## 本地开发

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 修改国家、地区和简介

主要改 [data/travels.ts](./data/travels.ts)。

每一条数据会同时影响：

- 首页世界地图 marker
- 地图 hover 信息
- 首页国家 / 地区卡片
- 单独详情页
- sitemap

## 上传旅行照片

推荐做法是把照片放进 `public/photos/`，例如：

```txt
public/photos/japan/cover.jpg
public/photos/japan/01.jpg
public/photos/japan/02.jpg
```

然后在 `data/travels.ts` 里把：

```ts
coverImage: "https://..."
```

换成：

```ts
coverImage: "/photos/japan/cover.jpg"
```

如果你想让我来整理照片，可以直接把本地文件夹路径发给我，例如：

```txt
/Users/zhaoxiaoyang/Pictures/Travel/Japan
```

我可以帮你重命名、放进对应目录，并更新数据文件。照片很多的话，建议先按国家或地区分文件夹。

## 部署

当前仓库已经适合 Vercel：

1. 推送到 GitHub。
2. 在 Vercel 绑定该仓库。
3. 设置 `NEXT_PUBLIC_SITE_URL` 为正式网站地址。
4. Vercel 会用默认 Next.js 流程构建。
