"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function CourseDetailsClient() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
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
