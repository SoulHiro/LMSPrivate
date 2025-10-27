import db from "@/db";
import { areasTable, coursesTable, modulesTable, videosTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// Função para buscar todas as áreas com contagem de cursos
export const getAreas = async () => {
  const areas = await db.query.areasTable.findMany({
    orderBy: (areasTable, { asc }) => [asc(areasTable.name)],
    with: {
      courses: true,
    },
  });
  
  // Mapear para incluir o slug e contagem de cursos
  return areas.map(area => ({
    ...area,
    slug: area.pathSlug || area.id, // Usar pathSlug se disponível, senão usar id
    courses: area.courses || [],
  }));
};

// Função para buscar cursos de uma área específica
export const getCoursesByArea = async (areaSlug: string) => {
  // Primeiro, encontrar a área pelo slug
  const area = await db.query.areasTable.findFirst({
    where: (areasTable, { eq }) => eq(areasTable.pathSlug, areaSlug),
  });

  if (!area) {
    return null; // Área não encontrada
  }

  const courses = await db.query.coursesTable.findMany({
    where: (coursesTable, { eq }) => eq(coursesTable.areaId, area.id),
    orderBy: (coursesTable, { asc }) => [asc(coursesTable.name)],
    with: {
      area: true,
    },
  });
  
  // Mapear para incluir o slug correto
  const coursesWithSlug = courses.map(course => ({
    ...course,
    slug: course.pathSlug || course.id,
  }));

  return {
    area,
    courses: coursesWithSlug,
  };
};

// Função para buscar todos os cursos (mantida para compatibilidade)
export const getCursos = async () => {
  const cursos = await db.query.coursesTable.findMany({
    orderBy: (coursesTable, { asc }) => [asc(coursesTable.name)],
    with: {
      area: true,
    },
  });
  return cursos;
};

// Função para buscar detalhes completos de um curso
export const getCourseVideos = async (courseSlug: string) => {
  // Primeiro, encontrar o curso pelo slug
  const curso = await db.query.coursesTable.findFirst({
    where: (coursesTable, { eq }) => eq(coursesTable.pathSlug, courseSlug),
    with: {
      area: true,
    },
  });

  if (!curso) {
    return {
      course: null,
      videos: [],
      modules: []
    };
  }

  // Buscar vídeos diretos do curso (sem módulo)
  const directVideos = await db.query.videosTable.findMany({
    where: (videosTable, { and, eq, isNull }) => 
      and(
        eq(videosTable.courseId, curso.id),
        isNull(videosTable.moduleId)
      ),
    orderBy: (videosTable, { asc }) => [asc(videosTable.order), asc(videosTable.name)],
  });

  // Buscar módulos do curso
  const modules = await db.query.modulesTable.findMany({
    where: (modulesTable, { eq }) => eq(modulesTable.courseId, curso.id),
    orderBy: (modulesTable, { asc }) => [asc(modulesTable.order), asc(modulesTable.name)],
  });

  // Para cada módulo, buscar seus vídeos
  const modulesWithVideos = await Promise.all(
    modules.map(async (module) => {
      const moduleVideos = await db.query.videosTable.findMany({
        where: (videosTable, { eq }) => eq(videosTable.moduleId, module.id),
        orderBy: (videosTable, { asc }) => [asc(videosTable.order), asc(videosTable.name)],
      });
      
      return {
        ...module,
        videos: moduleVideos
      };
    })
  );

  return {
    course: curso,
    videos: directVideos,
    modules: modulesWithVideos
  };
};

// Função para buscar um vídeo específico
export const getVideo = async (videoId: string) => {
  const video = await db.query.videosTable.findFirst({
    where: (videosTable, { eq }) => eq(videosTable.id, videoId),
    with: {
      course: {
        with: {
          area: true,
        },
      },
      module: true,
    },
  });

  return video;
};

// Função para buscar vídeos de um módulo específico
export const getModuleVideos = async (moduleId: string) => {
  const videos = await db.query.videosTable.findMany({
    where: (videosTable, { eq }) => eq(videosTable.moduleId, moduleId),
    orderBy: (videosTable, { asc }) => [asc(videosTable.order), asc(videosTable.name)],
  });

  return videos;
};

// Função para buscar um módulo específico com seus vídeos
export const getModuleWithVideos = async (moduleId: string) => {
  const module = await db.query.modulesTable.findFirst({
    where: (modulesTable, { eq }) => eq(modulesTable.id, moduleId),
    with: {
      course: {
        with: {
          area: true,
        },
      },
    },
  });

  if (!module) return null;

  const videos = await getModuleVideos(moduleId);

  return {
    ...module,
    videos,
  };
};
