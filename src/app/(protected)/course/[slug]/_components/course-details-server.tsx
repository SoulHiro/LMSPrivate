import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Calendar, FileVideo } from "lucide-react";
import { CourseDetailsClient } from "./course-details-client";
import { Separator } from "@/components/ui/separator";
import type { CourseDetailsServerProps } from "@/types";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

export function CourseDetailsServer({ courseData }: CourseDetailsServerProps) {
  if (!courseData.course) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center py-20">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FolderOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Curso não encontrado
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            O curso não foi encontrado ou não existe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CourseDetailsClient />

      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-semibold">{courseData.course.name}</h1>
        <span className="text-3xl font-semibold">Módulos do Curso</span>
      </div>

      <Separator className="my-4" />
      {courseData.videos.length > 0 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.videos.map((video) => (
              <Card
                key={video.id}
                data-video-card
                data-video-id={video.id}
                className="border border-border"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg">
                      <FileVideo className="h-5 w-5 " />
                    </div>
                    <span className="text-xs  px-2 py-1 rounded-full">
                      {video.mimeType || "video"}
                    </span>
                  </div>
                  <CardTitle
                    className="text-sm font-medium text-gray-900 line-clamp-2"
                    data-video-title
                  >
                    {video.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(video.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {courseData.modules.length > 0 && (
        <div>
          <div className="space-y-8">
            {courseData.modules.map((module) => (
              <Card key={module.id} className="border border-gray-200 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FolderOpen className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-medium text-gray-900">
                        {module.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {module.videos.length} vídeos • Criado em{" "}
                        {formatDate(module.createdAt)}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {module.videos.length > 0 && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {module.videos.map((video) => (
                        <div
                          key={video.id}
                          data-module-video
                          data-video-id={video.id}
                          className="p-4 border border-gray-100 rounded-lg"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-gray-100 rounded">
                              <FileVideo className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-sm font-medium text-gray-900 line-clamp-2"
                                data-module-video-title
                              >
                                {video.name}
                              </p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(video.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {courseData.videos.length === 0 && courseData.modules.length === 0 && (
        <div className="text-center py-20">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileVideo className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum conteúdo encontrado
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Este curso ainda não possui vídeos ou módulos disponíveis.
          </p>
        </div>
      )}
    </div>
  );
}
