import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// Initialize Roboto font with desired subsets and weights
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Weave - Fashion Made Simple",
  description: "The app designed to make fashion simple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  );
}
