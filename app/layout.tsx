import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Travel Field Notes",
    template: "%s | Travel Field Notes"
  },
  description:
    "A personal travel photography atlas and life journal built as a code-first Next.js project.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Travel Field Notes",
    description:
      "A minimalist, cinematic travel photography journal with an interactive world map.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
