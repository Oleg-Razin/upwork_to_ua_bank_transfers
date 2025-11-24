import type { Metadata } from "next";
import { Montserrat, Nunito_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from '@next/third-parties/google'

import Header from "./ui/organisms/Header";
import Footer from "./ui/organisms/Footer";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Калькулятор виводу коштів з Upwork в Україну",
  description: "Розрахуйте точну суму до отримання після комісій Upwork, курсів ПриватБанку та Монобанку, з урахуванням податків (5% ПДФО + 1.5% військовий збір)",
  keywords: "Upwork, фріланс, калькулятор, Україна, курс валют, податки, ПДФО, військовий збір",
  openGraph: {
    title: "Калькулятор виводу коштів з Upwork",
    description: "Точний розрахунок суми до отримання з урахуванням всіх комісій та податків",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <GoogleTagManager gtmId="GTM-MM3DSB5G" />
      <body
        className={`${montserrat.variable} ${nunitoSans.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
