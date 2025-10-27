"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CoursesGridProps } from "@/types";
import { Calendar, FolderOpen, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function CoursesGrid({ courses }: CoursesGridProps) {
  const router = useRouter();

  const handleCourseClick = (courseSlug: string) => {
    const slug = courseSlug.startsWith("/") ? courseSlug.slice(1) : courseSlug;
    router.push(`/course/${slug}`);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            onClick={() => handleCourseClick(course.slug!)}
            className="group cursor-pointer gap-0"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 text-primary border border-primary rounded-lg">
                  <PlayCircle className="h-5 w-5" />
                </div>
                <Badge>Curso</Badge>
              </div>

              <CardTitle className="text-lg font-medium line-clamp-2">
                {course.name}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Criado em {formatDate(course.createdAt)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-20">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FolderOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum curso encontrado
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Não há cursos disponíveis nesta área no momento.
          </p>
        </div>
      )}
    </>
  );
}
