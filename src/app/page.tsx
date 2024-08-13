"use client"
import LoginForm from "@/components/formLogin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if( window ){
      if(localStorage.getItem("token")){
        router.push(`${localStorage.getItem("lastName")}/home`);
      }
    }
  }, []);

  return (
    <main className="bg-[url('/img/login-pc.jpg')] flex flex-col items-center justify-center sm:bg-white sm:flex min-h-screen sm:items-center sm:justify-between">
      <div className="hidden sm:w-1/2 min-h-screen bg-[url('/img/login-pc.jpg')] bg-cover"></div>
      <div className="w-5/6 sm:w-1/2 sm:flex sm:flex-col sm:items-center sm:py-120">
        <div className="sm:w-4/5 min-h-max max-h-[50%] shadow-lg p-8 rounded bg-white">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
