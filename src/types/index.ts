// Exportações centralizadas de todos os tipos

// Tipos principais
export type { Video, VideoInfo } from './video';
export type { Course, CourseData, CourseDetailsServerProps, CoursesGridProps, CoursePageProps } from './course';
export type { Area, AreasGridProps, AreaPageProps } from './area';
export type { Module } from './module';

// Props de componentes
export type {
  VideoPlayerClientProps,
  VideoLessonsListProps,
  VideoInfoProps,
  VideoPageProps,
  BreadcrumbItem,
  NavigationBreadcrumbProps
} from './components';