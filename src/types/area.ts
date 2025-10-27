// Tipos relacionados a áreas

export interface Area {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  driveFileId: string | null;
  pathSlug: string;
  slug?: string; // Para compatibilidade com alguns componentes
  courses?: Array<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    driveFileId: string | null;
    pathSlug: string;
    areaId: string;
  }>;
}

// Props para componentes
export interface AreasGridProps {
  areas: Area[];
}

export interface AreaPageProps {
  params: Promise<{
    slug: string;
  }>;
}