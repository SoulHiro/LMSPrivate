"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  findCurrentVideoModule,
  findAdjacentModules,
  getFirstVideoFromModule,
  getLastVideoFromModule,
} from "@/lib/video-utils";
import type { VideoModuleNavigationProps } from "@/types";

export function VideoModuleNavigation({
  courseData,
  currentVideoId,
}: VideoModuleNavigationProps) {
  const router = useRouter();

  const currentVideoModule = useMemo(() => {
    return findCurrentVideoModule(courseData, currentVideoId);
  }, [courseData, currentVideoId]);

  const { previousModule, nextModule } = useMemo(() => {
    return findAdjacentModules(courseData, currentVideoModule);
  }, [courseData, currentVideoModule]);

  const handlePreviousModule = () => {
    if (previousModule) {
      const lastVideo = getLastVideoFromModule(previousModule);
      if (lastVideo) {
        router.push(`/video/${lastVideo.id}`);
      }
    }
  };

  const handleNextModule = () => {
    if (nextModule) {
      const firstVideo = getFirstVideoFromModule(nextModule);
      if (firstVideo) {
        router.push(`/video/${firstVideo.id}`);
      }
    }
  };

  // Não mostrar navegação se não há módulos adjacentes
  if (!previousModule && !nextModule) {
    return null;
  }

  return (
    <div className="w-full max-w-sm mt-4 pt-4 border-t border-border">
      <div className="flex flex-col gap-2">
        {previousModule && (
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousModule}
            disabled={!previousModule}
            className="flex-1 justify-start gap-2 py-4"
          >
            <ChevronLeft className="h-3 w-3" />
            <div className="flex flex-col items-start min-w-0">
              <span className="text-muted-foreground">Anterior</span>
              {previousModule && (
                <span className="truncate max-w-full">
                  {previousModule.name}
                </span>
              )}
            </div>
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={handleNextModule}
          disabled={!nextModule}
          className="flex-1 justify-end gap-2 py-4"
        >
          <div className="flex flex-col items-end min-w-0">
            <span className="text-muted-foreground">Próximo</span>
            {nextModule && (
              <span className="truncate max-w-full">{nextModule.name}</span>
            )}
          </div>
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
