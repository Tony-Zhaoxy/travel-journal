import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Travel Journal",
    template: "%s | Travel Journal"
  },
  description: "A personal travel photography journal with an interactive world map.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Travel Journal",
    description: "A quiet map of visited places, photo notes, routes, and memories.",
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
