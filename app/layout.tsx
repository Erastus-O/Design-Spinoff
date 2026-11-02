import type { Metadata, Viewport } from "next";
import { Figtree, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Design Spin-off 2027",
  description:
    "Design Spin-off is Sections' annual design conference in Lagos. Topics, speakers, agenda, tickets and sponsorship for the 2027 edition.",
};

export const viewport: Viewport = {
  themeColor: "#1b110b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${figtree.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
