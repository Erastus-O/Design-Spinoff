import type { Metadata, Viewport } from "next";
import { Silkscreen } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Google Sans Flex, trimmed to the axes the site uses (optical size and weight)
// and to Latin, from the supplied variable font. OFL licence in app/fonts.
const googleSansFlex = localFont({
  src: "./fonts/GoogleSansFlex-Variable.woff2",
  weight: "100 900",
  variable: "--font-google-sans-flex",
});

// Pixel face for the footer wordmark and edge-strip labels.
const silkscreen = Silkscreen({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-silkscreen" });

export const metadata: Metadata = {
  title: "Design Spin-off 2027",
  description:
    "Design Spin-off is Sections' annual design conference, coming to London's Design District in 2027. Topics, speakers, agenda, tickets and sponsorship.",
};

export const viewport: Viewport = {
  themeColor: "#f4f4f1",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${googleSansFlex.variable} ${silkscreen.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
