import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mahdi.is-a.dev"),
  title: "Mahdi Hazrati — Frontend Developer",
  description:
    "Portfolio of Mahdi Hazrati — React, Next.js, and polished web experiences. Open source, chai-powered development.",
  openGraph: {
    title: "Mahdi Hazrati — Frontend Developer",
    description:
      "Building fast, accessible interfaces with React and Next.js.",
    url: "https://mahdi.is-a.dev",
    siteName: "mahdi.is-a.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          defer
          src="https://platform.analytick.ir/script.js"
          data-website-id="670d2eb1-20f0-4521-9b5b-afcd8e028287"
        />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
