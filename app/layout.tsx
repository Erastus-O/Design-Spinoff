import type { Metadata, Viewport } from "next";
import { Silkscreen } from "next/font/google";
import localFont from "next/font/local";
import { Bend } from "@/components/ui/bend";
import "./globals.css";

const sora = localFont({
  src: "./fonts/Sora-VariableFont_wght.ttf",
  weight: "100 800",
  variable: "--font-sora",
});

// Pixel face for the footer wordmark.
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
    <html lang="en" className={`${sora.variable} ${silkscreen.variable}`}>
      <body className="font-sans antialiased">
        {/* The whole site scrolls on the face of a cube: its top and bottom fold over
            virtual edges and flatten at the scroll ends (browsers with HTML-in-canvas;
            elsewhere it is a plain full-height scroller). */}
        <Bend
          zone={120}
          angle={65}
          rounding={150}
          perspective={1000}
          ease={240}
          smoothing={0.23}
          tumble={0.5}
          tilt={0.5}
          direction="in"
          top
          bottom
          className="bend-site h-dvh"
        >
          {children}
        </Bend>
      </body>
    </html>
  );
}
