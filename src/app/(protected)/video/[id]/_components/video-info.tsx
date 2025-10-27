import { Badge } from "@/components/ui/badge";
import { Calendar, FolderOpen } from "lucide-react";
import type { VideoInfoProps } from "@/types";

export function VideoInfo({ video }: VideoInfoProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">
        Informações do Vídeo
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Tipo de arquivo</p>
          <Badge variant="secondary">{video.mimeType || "video"}</Badge>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Data de criação</p>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(video.createdAt)}</span>
          </div>
        </div>

        {video.course && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Curso</p>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <span>{video.course.name}</span>
            </div>
          </div>
        )}

        {video.module && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Módulo</p>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <span>{video.module.name}</span>
            </div>
          </div>
        )}
      </div>

      {video.course?.area && (
        <div>
          <p className="text-sm text-muted-foreground mb-1">Área</p>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
            <span>{video.course.area.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
