import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "旅行札记",
    template: "%s | 旅行札记"
  },
  description: "一个以互动世界地图进入的个人旅行摄影与生活记录网站。",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "旅行札记",
    description: "用地图、照片和短句整理去过的地方。",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
