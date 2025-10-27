// Tipos relacionados a cursos

export interface Course {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  driveFileId: string | null;
  pathSlug: string;
  areaId: string;
  slug?: string; // Para compatibilidade com alguns componentes
  description?: string;
  area?: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    driveFileId: string | null;
    pathSlug: string;
  } | null;
}

export interface CourseData {
  course: Course | null;
  videos: Array<{
    id: string;
    name: string;
    driveFileId: string | null;
    mimeType: string | null;
    createdAt: Date;
    order?: number | null;
  }>;
  modules: Array<{
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
  }>;
}

// Props para componentes
export interface CourseDetailsServerProps {
  courseData: CourseData;
}

export interface CoursesGridProps {
  courses: Course[];
}

export interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}