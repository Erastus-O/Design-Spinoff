import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Caveat, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const caveat = Caveat({ subsets: ["latin"], weight: "600", variable: "--font-caveat" });
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });

export const metadata: Metadata = {
  title: "The Design Spin-off 2027",
  description:
    "Design Spin-off is an annual design conference by Sections, bringing Africa's product, design, fintech and policy leaders together in Lagos.",
};

export const viewport: Viewport = {
  themeColor: "#0e1620",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrains.variable} ${caveat.variable} ${archivo.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
