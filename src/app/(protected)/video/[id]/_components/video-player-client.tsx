"use client";

import { ArrowLeft, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationBreadcrumb,
  createVideoBreadcrumbs,
} from "@/components/navigation-breadcrumb";
import { VideoInfo } from "./video-info";
import { VideoLessonsList } from "./video-lessons-list";
import { VideoModuleNavigation } from "./video-module-navigation";
import type { VideoPlayerClientProps } from "@/types";

export function VideoPlayerClient({
  video,
  courseData,
}: VideoPlayerClientProps) {
  const router = useRouter();

  const handleBackToCourse = () => {
    if (video.course) {
      router.push(`/course/${video.course.pathSlug}`);
    } else {
      router.back();
    }
  };

  const videoUrl = video.driveFileId
    ? `https://drive.google.com/file/d/${video.driveFileId}/preview`
    : null;

  const breadcrumbItems = createVideoBreadcrumbs(video);

  return (
    <div className="space-y-8">
      <div className="space-y-7">
        <Button variant="default" onClick={handleBackToCourse}>
          <ArrowLeft className="h-4 w-4" />
          {video.course ? `Voltar ao curso` : "Voltar"}
        </Button>

        <NavigationBreadcrumb items={breadcrumbItems} className="mb-4" />

        <div className="flex flex-row justify-start w-full">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            {video.name}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="relative aspect-video">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                width="100%"
                height="100%"
                allow="autoplay"
                className="w-full h-full rounded-lg"
                allowFullScreen
                title={video.name}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted rounded-lg">
                <div className="text-center">
                  <PlayCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-foreground">
                    Vídeo não disponível
                  </p>
                  <p className="text-sm text-muted-foreground">
                    O arquivo de vídeo não foi encontrado
                  </p>
                </div>
              </div>
            )}
          </div>

          <VideoInfo video={video} />
        </div>

        <div className="lg:col-span-1">
          <VideoLessonsList courseData={courseData} currentVideoId={video.id} />
          <VideoModuleNavigation
            courseData={courseData}
            currentVideoId={video.id}
          />
        </div>
      </div>
    </div>
  );
}
