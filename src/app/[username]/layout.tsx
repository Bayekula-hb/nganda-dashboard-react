"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";
import SideBarComponent from "@/components/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Nganda Tableau de Bord",
//   description: "Nganda Tableau de Bord",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  useEffect(()=>{
    if( window){
      if(! localStorage.getItem("token") ){
        router.push("/")
      }
    }
  }, []);

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
