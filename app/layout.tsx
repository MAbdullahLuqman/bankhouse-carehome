import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({ src: "../public/fonts/inter-latin.woff2", variable: "--font-inter", weight: "400 700", display: "swap", fallback: ["Arial"] });
const lora = localFont({ src: "../public/fonts/lora-latin.woff2", variable: "--font-lora", weight: "400 600", display: "swap", fallback: ["Georgia"] });

export const metadata: Metadata = {
  title: { default: "Bank House Care Home | A Place to Call Home", template: "%s | Bank House Care Home" },
  description: "Explore care options, everyday life and the next steps in finding a care home for your family at Bank House Care Home."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={`${inter.variable} ${lora.variable} w-full max-w-[100vw] overflow-x-hidden font-sans antialiased`}>{children}</body>
    </html>
  );
}
