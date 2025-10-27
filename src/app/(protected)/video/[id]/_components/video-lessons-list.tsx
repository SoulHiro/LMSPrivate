"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { findCurrentVideoModule } from "@/lib/video-utils";
import type { VideoLessonsListProps } from "@/types";

export function VideoLessonsList({
  courseData,
  currentVideoId,
}: VideoLessonsListProps) {
  const router = useRouter();

  const handleVideoClick = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  const currentVideoModule = findCurrentVideoModule(courseData, currentVideoId);

  if (!courseData) {
    return (
      <div className="w-full max-w-sm">
        <div className="text-center py-8">
          <PlayCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Nenhuma aula encontrada
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <h2 className="text-lg font-semibold text-foreground px-2">
        {currentVideoModule
          ? `Módulo: ${currentVideoModule.name}`
          : "Aulas do Curso"}
      </h2>

      <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {!currentVideoModule && courseData.videos.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground px-2">
              Aulas Avulsas
            </h3>
            {courseData.videos
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((video) => (
                <Button
                  key={video.id}
                  variant={video.id === currentVideoId ? "default" : "ghost"}
                  onClick={() => handleVideoClick(video.id)}
                  className={`w-full text-left p-3 h-auto justify-start ${
                    video.id === currentVideoId
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3 w-full min-w-0">
                    <div className="shrink-0">
                      <PlayCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {video.name}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
          </div>
        )}

        {currentVideoModule && (
          <div className="space-y-2">
            <div className="space-y-1">
              {currentVideoModule.videos
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((video) => (
                  <Button
                    key={video.id}
                    variant={video.id === currentVideoId ? "default" : "ghost"}
                    onClick={() => handleVideoClick(video.id)}
                    className={`w-full text-left p-3 h-auto justify-start ${
                      video.id === currentVideoId
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full min-w-0">
                      <div className="shrink-0">
                        <PlayCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {video.name}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
            </div>
          </div>
        )}

        {(!currentVideoModule && courseData.videos.length === 0) ||
        (currentVideoModule && currentVideoModule.videos.length === 0) ? (
          <div className="text-center py-8">
            <PlayCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Nenhuma aula encontrada
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
