import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nganda Tableau de Bord",
  description: "Nganda Tableau de Bord",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
