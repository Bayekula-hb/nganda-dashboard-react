import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import SideBarComponent from "@/components/Sidebar";

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
      <body className={`${inter.className} text-sm`}>
        <SideBarComponent>
          {children}
        </SideBarComponent>
      </body>
    </html>
  );
}
