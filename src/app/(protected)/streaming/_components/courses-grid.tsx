"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CoursesGridProps } from "@/types";

export function CoursesGrid({ courses }: CoursesGridProps) {
  const router = useRouter();

  const handleCourseClick = (courseName: string) => {
    const encodedName = encodeURIComponent(courseName);
    router.push(`/course?name=${encodedName}`);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card
            key={course.id}
            onClick={() => handleCourseClick(course.name)}
            className="group cursor-pointer border border-gray-200 bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 ease-in-out"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FolderOpen className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Curso
                </span>
              </div>

              <CardTitle className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                {course.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Criado em {formatDate(course.createdAt)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-20">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FolderOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum curso encontrado
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Não há cursos disponíveis no momento. Verifique novamente mais
            tarde.
          </p>
        </div>
      )}
    </>
  );
}
