"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface Video {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
  mimeType?: string | null;
}

interface Module {
  id: string;
  name: string;
  createdAt: Date;
  videos: Video[];
}

interface Course {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  driveFileId: string | null;
  pathSlug: string;
  areaId: string;
  area?: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    driveFileId: string | null;
    pathSlug: string;
  };
}

interface CourseData {
  course: Course | null;
  videos: Video[];
  modules: Module[];
}

interface CourseDetailsClientProps {
  courseData: CourseData;
}

export function CourseDetailsClient({ courseData }: CourseDetailsClientProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleVideoClick = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  useEffect(() => {
    const videoCards = document.querySelectorAll('[data-video-card]');
    const moduleVideos = document.querySelectorAll('[data-module-video]');
    
    const handleCardClick = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const videoId = target.getAttribute('data-video-id');
      if (videoId) {
        handleVideoClick(videoId);
      }
    };

    videoCards.forEach(card => {
      card.addEventListener('click', handleCardClick);
      card.classList.add('cursor-pointer', 'transition-all', 'duration-200', 'ease-in-out');
    });
    
    moduleVideos.forEach(video => {
      video.addEventListener('click', handleCardClick);
      video.classList.add('cursor-pointer', 'transition-all', 'duration-200');
    });

    return () => {
      videoCards.forEach(card => {
        card.removeEventListener('click', handleCardClick);
      });
      moduleVideos.forEach(video => {
        video.removeEventListener('click', handleCardClick);
      });
    };
  }, []);

  if (!courseData.course) {
    return (
      <div className="mb-6">
        <Button variant="ghost" onClick={handleBackClick}>
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <Button variant="ghost" onClick={handleBackClick}>
        <ArrowLeft className="h-4 w-4" />
        Voltar aos cursos
      </Button>
    </div>
  );
}