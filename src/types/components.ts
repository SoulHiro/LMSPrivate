// Tipos para props de componentes específicos

import type { Video, VideoInfo } from './video';
import type { CourseData } from './course';

// Props para componentes de vídeo
export interface VideoPlayerClientProps {
  video: Video;
  courseData: CourseData | null;
}

export interface VideoLessonsListProps {
  courseData: CourseData | null;
  currentVideoId: string;
}

export interface VideoInfoProps {
  video: VideoInfo;
}

export interface VideoPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Props para breadcrumb
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

export interface NavigationBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}