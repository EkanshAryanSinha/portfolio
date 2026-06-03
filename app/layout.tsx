import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ekansh Aryan Sinha | Software Engineer & Quantitative Analyst",
  description:
    "Final-year B.E. ECE & MSc Economics student at BITS Pilani, Hyderabad. Building across backend systems, Python automation, derivatives analytics, and quantitative finance. Open to SDE Fresher and Quant Analyst roles.",
  keywords: [
    "Ekansh Aryan Sinha",
    "Software Engineer",
    "Quantitative Analyst",
    "BITS Pilani",
    "FastAPI",
    "Python",
    "Derivatives",
    "Options",
    "Black-Scholes",
    "Backend Developer",
    "MerQube",
    "Nykaa",
  ],
  authors: [{ name: "Ekansh Aryan Sinha" }],
  openGraph: {
    title: "Ekansh Aryan Sinha | SDE × Quant Analyst",
    description:
      "Backend systems, Python automation, derivatives analytics, and quantitative finance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekansh Aryan Sinha | SDE × Quant Analyst",
    description: "BITS Pilani | MerQube | Nykaa | Python | FastAPI | Derivatives",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-navy-900 text-slate-200 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
