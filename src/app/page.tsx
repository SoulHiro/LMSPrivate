"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-9xl">Hello World</h1>
      <Button onClick={() => router.push("/auth/login")}>Login</Button>
    </div>
  );
}
