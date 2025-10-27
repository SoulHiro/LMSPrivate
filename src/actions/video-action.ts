import db from "@/db";

export const getAreas = async () => {
  const areas = await db.query.areasTable.findMany({
    orderBy: (areasTable, { asc }) => [asc(areasTable.name)],
    with: {
      courses: true,
    },
  });

  return areas.map((area) => ({
    ...area,
    slug: area.pathSlug || area.id,
    courses: area.courses || [],
  }));
};

export const getCoursesByArea = async (areaSlug: string) => {
  const area = await db.query.areasTable.findFirst({
    where: (areasTable, { eq }) => eq(areasTable.pathSlug, areaSlug),
  });

  if (!area) {
    return null;
  }

  const courses = await db.query.coursesTable.findMany({
    where: (coursesTable, { eq }) => eq(coursesTable.areaId, area.id),
    orderBy: (coursesTable, { asc }) => [asc(coursesTable.name)],
    with: {
      area: true,
    },
  });

  const coursesWithSlug = courses.map((course) => ({
    ...course,
    slug: course.pathSlug || course.id,
  }));

  return {
    area,
    courses: coursesWithSlug,
  };
};

export const getCursos = async () => {
  const cursos = await db.query.coursesTable.findMany({
    orderBy: (coursesTable, { asc }) => [asc(coursesTable.name)],
    with: {
      area: true,
    },
  });
  return cursos;
};

export const getCourseVideos = async (courseSlug: string) => {
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
      modules: [],
    };
  }

  const directVideos = await db.query.videosTable.findMany({
    where: (videosTable, { and, eq, isNull }) =>
      and(eq(videosTable.courseId, curso.id), isNull(videosTable.moduleId)),
    orderBy: (videosTable, { asc }) => [
      asc(videosTable.order),
      asc(videosTable.name),
    ],
  });

  const modules = await db.query.modulesTable.findMany({
    where: (modulesTable, { eq }) => eq(modulesTable.courseId, curso.id),
    orderBy: (modulesTable, { asc }) => [
      asc(modulesTable.order),
      asc(modulesTable.name),
    ],
  });

  const modulesWithVideos = await Promise.all(
    modules.map(async (module) => {
      const moduleVideos = await db.query.videosTable.findMany({
        where: (videosTable, { eq }) => eq(videosTable.moduleId, module.id),
        orderBy: (videosTable, { asc }) => [
          asc(videosTable.order),
          asc(videosTable.name),
        ],
      });

      return {
        ...module,
        videos: moduleVideos,
      };
    })
  );

  return {
    course: curso,
    videos: directVideos,
    modules: modulesWithVideos,
  };
};

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

export const getModuleVideos = async (moduleId: string) => {
  const videos = await db.query.videosTable.findMany({
    where: (videosTable, { eq }) => eq(videosTable.moduleId, moduleId),
    orderBy: (videosTable, { asc }) => [
      asc(videosTable.order),
      asc(videosTable.name),
    ],
  });

  return videos;
};

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
