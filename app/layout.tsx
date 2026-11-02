import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sora = localFont({
  src: "./fonts/Sora-VariableFont_wght.ttf",
  weight: "100 800",
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Design Spin-off 2027",
  description:
    "Design Spin-off is Sections' annual design conference, coming to London's Design District in 2027. Topics, speakers, agenda, tickets and sponsorship.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
