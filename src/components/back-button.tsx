"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  type?: "back" | "home";
}

export function BackButton({ type = "back" }: BackButtonProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (type === "back") {
      router.back();
    } else if (type === "home") {
      router.push("/");
    }
  };

  return (
    <div>
      <Button variant="default" onClick={handleBackClick}>
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>
    </div>
  );
}
