
import LoginForm from "@/components/formLogin";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between">
      <div className="w-1/2 min-h-screen bg-[url('/img/login-pc.jpg')] bg-cover"></div>
      <div className="w-1/2 flex flex-col items-center py-120">
        <div className="w-4/5 min-h-max max-h-[50%] shadow-lg p-8 rounded">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
