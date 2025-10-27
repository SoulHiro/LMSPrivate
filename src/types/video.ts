// Tipos relacionados a vídeos

export interface Video {
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

export interface VideoInfo {
  id: string;
  name: string;
  mimeType: string | null;
  createdAt: Date;
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