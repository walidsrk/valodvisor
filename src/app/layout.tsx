import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valodvisor - Your Valorant Grinding Advisor",
  description: "Get personalized advice on character selection, positioning, and economy management for Valorant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
