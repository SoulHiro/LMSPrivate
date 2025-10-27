"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import type { AreasGridProps } from "@/types";

export function AreasGrid({ areas }: AreasGridProps) {
  const router = useRouter();

  const handleAreaClick = (areaSlug: string) => {
    router.push(`/area/${areaSlug}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {areas.map((area) => (
          <Card
            key={area.id}
            onClick={() => handleAreaClick(area.slug!)}
            className="group cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg text-primary border border-primary">
                  <FolderOpen className="h-5 w-5 " />
                </div>
                <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {area.courses?.length || 0} cursos
                </span>
              </div>

              <CardTitle className="text-lg font-medium  transition-colors line-clamp-2">
                {area.name}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {areas.length === 0 && (
        <div className="text-center py-20">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FolderOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma área encontrada
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Não há áreas de conhecimento disponíveis no momento. Verifique
            novamente mais tarde.
          </p>
        </div>
      )}
    </>
  );
}
