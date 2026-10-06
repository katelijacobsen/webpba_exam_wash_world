import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { gilroy } from "./fonts/fonts";
import Providers from "./global/utils/Providers";
import "./global/styles/global.css";

export const metadata: Metadata = {
  title: {
    default: "Wash World",
    template: "%s · Wash World",
  },
  description: "Bilvask abonnement — find en vask, administrér dine biler og dit medlemskab.",
};

export const viewport: Viewport = {
  themeColor: "#f7f7f5",
  // Lets the floating nav respect the iPhone home indicator (env(safe-area-inset-*))
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="da" className={gilroy.variable}>
      <body>
        {/* Every layout below renders an element with id="main-content" */}
        <a href="#main-content" className="skip-link">Spring til indhold</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
