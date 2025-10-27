"use client";

import { ArrowLeft, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { VideoInfo } from "./video-info";
import { VideoLessonsList } from "./video-lessons-list";

interface Video {
  id: string;
  name: string;
  driveFileId: string | null;
  mimeType: string | null;
  createdAt: Date;
  order?: number | null;
  course?: {
    id: string;
    name: string;
    pathSlug: string;
    area?: {
      id: string;
      name: string;
      pathSlug: string;
    };
  } | null;
  module?: {
    id: string;
    name: string;
    pathSlug: string;
  } | null;
}

interface CourseData {
  course: any;
  videos: Video[];
  modules: Array<{
    id: string;
    name: string;
    pathSlug: string;
    videos: Video[];
  }>;
}

interface VideoPlayerClientProps {
  video: Video;
  courseData: CourseData | null;
}

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

  return (
    <div className="space-y-8">
      <div className="space-y-7">
        <Button variant="default" onClick={handleBackToCourse}>
          <ArrowLeft className="h-4 w-4" />
          {video.course ? `Voltar ao curso` : "Voltar"}
        </Button>

        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            {video.course?.area && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/area/${video.course.area.pathSlug}`}>
                    {video.course.area.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            {video.course && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/course/${video.course.pathSlug}`}>
                    {video.course.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            {video.module && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/module/${video.module.pathSlug}`}>
                    {video.module.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{video.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-semibold text-foreground mb-2">
          {video.name}
        </h1>
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
        </div>
      </div>
    </div>
  );
}
