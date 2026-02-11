import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valodvisor | Tactical Valorant Advisor",
  description: "Agent recommendations, positioning guides, and economy management for Valorant players.",
  keywords: ["Valorant", "tactical", "agent", "guide", "economy", "gaming"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0f] text-[#ece8e1] antialiased">
        {children}
      </body>
    </html>
  );
}
