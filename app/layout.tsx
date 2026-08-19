import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "写给你的七夕情书",
  description: "一封装着我们回忆的信。",
  robots: { index: false, follow: false },
  openGraph: {
    title: "写给你的七夕情书",
    description: "拆开一封信，慢慢读完我们的故事。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "写给你的七夕情书",
    description: "拆开一封信，慢慢读完我们的故事。",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
