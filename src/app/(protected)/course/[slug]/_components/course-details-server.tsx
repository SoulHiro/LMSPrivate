"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FolderOpen, FileVideo, ChevronDown } from "lucide-react";
import { BackButton } from "@/components/back-button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import type { CourseDetailsServerProps } from "@/types";

export function CourseDetailsServer({ courseData }: CourseDetailsServerProps) {
  const router = useRouter();

  const handleVideoClick = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };
  if (!courseData.course) {
    return (
      <section>
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center">
            <FolderOpen className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Curso não encontrado</h3>
            <p className="max-w-md mx-auto">
              O curso não foi encontrado ou não existe.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <BackButton type="home" />

      <header className="flex items-start justify-between">
        <h1 className="text-3xl font-semibold">{courseData.course.name}</h1>
        <span className="text-3xl font-semibold">Módulos do Curso</span>
      </header>

      <Separator />

      {courseData.videos.length > 0 && (
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.videos.map((video) => (
              <Card
                key={video.id}
                data-video-card
                data-video-id={video.id}
                className="border border-border cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => handleVideoClick(video.id)}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg">
                      <FileVideo className="h-5 w-5" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full">
                      {video.mimeType || "video"}
                    </span>
                  </div>
                  <CardTitle
                    className="text-sm font-medium line-clamp-2"
                    data-video-title
                  >
                    {video.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}

      {courseData.modules.length > 0 && (
        <section className="space-y-4">
          {courseData.modules.map((module) => (
            <Collapsible key={module.id} defaultOpen={false}>
              <Card className="border py-0">
                <CollapsibleTrigger asChild className="py-4">
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg">
                          <FolderOpen className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg font-medium">
                          {module.name}
                        </CardTitle>
                      </div>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                {module.videos.length > 0 && (
                  <CollapsibleContent>
                    <CardContent className="py-8">
                      <div className="space-y-3">
                        {module.videos.map((video) => (
                          <article
                            key={video.id}
                            data-module-video
                            data-video-id={video.id}
                            className="p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                            onClick={() => handleVideoClick(video.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded">
                                <FileVideo className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className="text-sm font-medium line-clamp-2"
                                  data-module-video-title
                                >
                                  {video.name}
                                </p>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                )}
              </Card>
            </Collapsible>
          ))}
        </section>
      )}

      {courseData.videos.length === 0 && courseData.modules.length === 0 && (
        <section className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center">
            <FileVideo className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Nenhum conteúdo encontrado</h3>
            <p className="max-w-md mx-auto">
              Este curso ainda não possui vídeos ou módulos disponíveis.
            </p>
          </div>
        </section>
      )}
    </section>
  );
}
