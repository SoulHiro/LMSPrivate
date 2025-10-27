import type { VideoLessonsListProps, Module } from "@/types";

type CourseData = VideoLessonsListProps["courseData"];

type Video = Module["videos"][0];

/**
 * Encontra o módulo que contém um vídeo específico
 * @param courseData - Dados do curso
 * @param videoId - ID do vídeo a ser procurado
 * @returns O módulo que contém o vídeo ou null se não encontrado
 */
export function findCurrentVideoModule(
  courseData: CourseData,
  videoId: string
): Module | null {
  if (!courseData) return null;

  for (const module of courseData.modules) {
    const videoInModule = module.videos.find((video) => video.id === videoId);
    if (videoInModule) {
      return module;
    }
  }

  return null;
}

/**
 * Ordena módulos por ordem (order)
 * @param modules - Array de módulos
 * @returns Array de módulos ordenados
 */
export function sortModulesByOrder(modules: Module[]): Module[] {
  return [...modules].sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Ordena vídeos por ordem (order)
 * @param videos - Array de vídeos
 * @returns Array de vídeos ordenados
 */
export function sortVideosByOrder(videos: Video[]): Video[] {
  return [...videos].sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Encontra os módulos anterior e próximo baseado no módulo atual
 * @param courseData - Dados do curso
 * @param currentModule - Módulo atual
 * @returns Objeto com módulo anterior e próximo
 */
export function findAdjacentModules(
  courseData: CourseData | null,
  currentModule: Module | null
): { previousModule: Module | null; nextModule: Module | null } {
  if (!courseData || !currentModule || courseData.modules.length === 0) {
    return { previousModule: null, nextModule: null };
  }

  const sortedModules = sortModulesByOrder(courseData.modules);
  const currentIndex = sortedModules.findIndex(
    (m) => m.id === currentModule.id
  );

  if (currentIndex === -1) {
    return { previousModule: null, nextModule: null };
  }

  const previousModule =
    currentIndex > 0 ? sortedModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex < sortedModules.length - 1
      ? sortedModules[currentIndex + 1]
      : null;

  return { previousModule, nextModule };
}

/**
 * Obtém dados completos de navegação para um vídeo
 * @param courseData - Dados do curso
 * @param currentVideoId - ID do vídeo atual
 * @returns Dados de navegação incluindo módulo atual e adjacentes
 */
export function getVideoNavigationData(
  courseData: CourseData,
  currentVideoId: string
): {
  currentModule: Module | null;
  previousModule: Module | null;
  nextModule: Module | null;
} {
  const currentModule = findCurrentVideoModule(courseData, currentVideoId);

  if (!currentModule) {
    return { currentModule: null, previousModule: null, nextModule: null };
  }

  const { previousModule, nextModule } = findAdjacentModules(
    courseData,
    currentModule
  );

  return {
    currentModule,
    previousModule,
    nextModule,
  };
}

/**
 * Obtém o primeiro vídeo de um módulo (ordenado por order)
 * @param module - Módulo
 * @returns Primeiro vídeo do módulo ou null se não houver vídeos
 */
export function getFirstVideoFromModule(module: Module): Video | null {
  if (!module.videos.length) return null;

  const sortedVideos = sortVideosByOrder(module.videos);
  return sortedVideos[0];
}

/**
 * Obtém o último vídeo de um módulo (ordenado por order)
 * @param module - Módulo
 * @returns Último vídeo do módulo ou null se não houver vídeos
 */
export function getLastVideoFromModule(module: Module): Video | null {
  if (!module.videos.length) return null;

  const sortedVideos = sortVideosByOrder(module.videos);
  return sortedVideos[sortedVideos.length - 1];
}
