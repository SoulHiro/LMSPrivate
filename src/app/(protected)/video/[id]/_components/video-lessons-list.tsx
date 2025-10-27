"use client";

import { PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Video {
  id: string;
  name: string;
  order?: number | null;
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

interface VideoLessonsListProps {
  courseData: CourseData | null;
  currentVideoId: string;
}

export function VideoLessonsList({
  courseData,
  currentVideoId,
}: VideoLessonsListProps) {
  const router = useRouter();

  const handleVideoClick = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  const getAllVideos = () => {
    if (!courseData) return [];

    const allVideos: Video[] = [];
    allVideos.push(...courseData.videos);

    courseData.modules.forEach((module) => {
      allVideos.push(...module.videos);
    });

    return allVideos.sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  const allVideos = getAllVideos();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Aulas do Curso</h2>

      {allVideos.length > 0 ? (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {allVideos.map((courseVideo, index) => (
            <Button
              key={courseVideo.id}
              variant={courseVideo.id === currentVideoId ? "default" : "ghost"}
              onClick={() => handleVideoClick(courseVideo.id)}
              className={`w-full text-left p-3 h-auto justify-start ${
                courseVideo.id === currentVideoId
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0 mt-1">
                  <PlayCircle className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {courseVideo.name}
                  </p>
                  {courseVideo.module && (
                    <p className="text-xs opacity-75 truncate">
                      {courseVideo.module.name}
                    </p>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <PlayCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Nenhuma aula encontrada
          </p>
        </div>
      )}
    </div>
  );
}
