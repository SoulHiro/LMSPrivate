// Tipos relacionados a módulos

export interface Module {
  id: string;
  name: string;
  pathSlug: string;
  createdAt: Date;
  videos: Array<{
    id: string;
    name: string;
    driveFileId: string | null;
    mimeType: string | null;
    createdAt: Date;
    order?: number | null;
  }>;
}