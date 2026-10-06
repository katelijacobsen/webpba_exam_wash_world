import type { Metadata } from "next";
import type { ReactNode } from "react";
import { gilroy } from "./fonts/fonts";
import Providers from "./global/utils/Providers";
import Menu from "./global/components/Menu";
import "./global/styles/global.css";

export const metadata: Metadata = {
  title: "Wash World",
  description: "Bilvask abonnement — find en vask, administrér dine biler og dit medlemskab.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="da" className={gilroy.variable}>
      <body>
        <a href="#main-content" className="skip-link">Spring til indhold</a>
        <Providers>
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Menu />
        </Providers>
      </body>
    </html>
  );
}
