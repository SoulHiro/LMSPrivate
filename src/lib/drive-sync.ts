import { google } from "googleapis";
import db from "@/db";
import { areasTable, coursesTable, modulesTable, videosTable } from "@/db/schema";
import fs from "fs";

const credentials = JSON.parse(
  fs.readFileSync("lmsprivate-c5f47ecdeac8.json", "utf8")
);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

// Função para criar slug a partir do nome
function createSlug(name: string): string {
  return name
    .replace(/^\d+\s*-\s*/, "") // Remove numeração inicial
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

// Função para processar áreas (FrontEnd, BackEnd, Carreira)
async function processAreas(rootFolderId: string) {
  const res = await drive.files.list({
    q: `'${rootFolderId}' in parents and trashed=false and mimeType='application/vnd.google-apps.folder'`,
    fields: "files(id, name, mimeType)",
  });

  const areas = res.data.files || [];

  for (const area of areas) {
    const areaSlug = createSlug(area.name!);
    
    try {
      const insertedArea = await db
        .insert(areasTable)
        .values({
          name: area.name!,
          driveFileId: area.id,
          pathSlug: areaSlug,
        })
        .onConflictDoUpdate({
          target: areasTable.pathSlug,
          set: {
            name: area.name!,
            driveFileId: area.id,
          },
        })
        .returning({ id: areasTable.id });

      const areaId = insertedArea[0].id;
      console.log(`✅ Área processada: ${area.name}`);

      // Processar cursos dentro da área
      await processCourses(area.id!, areaId, areaSlug);
    } catch (error) {
      console.error(`❌ Erro ao processar área ${area.name}:`, error);
    }
  }
}

// Função para processar cursos dentro de uma área
async function processCourses(areaFolderId: string, areaId: string, areaSlug: string) {
  const res = await drive.files.list({
    q: `'${areaFolderId}' in parents and trashed=false and mimeType='application/vnd.google-apps.folder'`,
    fields: "files(id, name, mimeType)",
  });

  const courses = res.data.files || [];

  for (const course of courses) {
    const courseSlug = createSlug(course.name!);
    
    try {
      const insertedCourse = await db
        .insert(coursesTable)
        .values({
          name: course.name!,
          areaId: areaId,
          driveFileId: course.id,
          pathSlug: courseSlug,
        })
        .onConflictDoUpdate({
          target: coursesTable.pathSlug,
          set: {
            name: course.name!,
            areaId: areaId,
            driveFileId: course.id,
          },
        })
        .returning({ id: coursesTable.id });

      const courseId = insertedCourse[0].id;
      console.log(`  📚 Curso processado: ${course.name}`);

      // Verificar se o curso tem módulos ou vídeos diretos
      await processModulesAndVideos(course.id!, courseId, courseSlug);
    } catch (error) {
      console.error(`❌ Erro ao processar curso ${course.name}:`, error);
    }
  }
}
// Função para processar módulos e vídeos dentro de um curso
async function processModulesAndVideos(courseFolderId: string, courseId: string, courseSlug: string) {
  const res = await drive.files.list({
    q: `'${courseFolderId}' in parents and trashed=false`,
    fields: "files(id, name, mimeType)",
    orderBy: "name",
  });

  const items = res.data.files || [];
  let videoOrder = 1;
  let moduleOrder = 1;

  for (const item of items) {
    const isFolder = item.mimeType === "application/vnd.google-apps.folder";
    const isVideo = item.mimeType?.includes("video") || item.name?.match(/\.(mp4|avi|mov|wmv|flv|webm)$/i);

    if (isFolder) {
      // É um módulo
      const moduleSlug = `${courseSlug}/${createSlug(item.name!)}`;
      
      try {
        const insertedModule = await db
          .insert(modulesTable)
          .values({
            name: item.name!,
            courseId: courseId,
            driveFileId: item.id,
            pathSlug: moduleSlug,
            order: moduleOrder++,
          })
          .onConflictDoUpdate({
            target: modulesTable.pathSlug,
            set: {
              name: item.name!,
              courseId: courseId,
              driveFileId: item.id,
              order: moduleOrder - 1,
            },
          })
          .returning({ id: modulesTable.id });

        const moduleId = insertedModule[0].id;
        console.log(`    📁 Módulo processado: ${item.name}`);

        // Processar vídeos dentro do módulo
        await processVideosInModule(item.id!, moduleId, courseId, moduleSlug);
      } catch (error) {
        console.error(`❌ Erro ao processar módulo ${item.name}:`, error);
      }
    } else if (isVideo) {
      // É um vídeo direto do curso (sem módulo)
      const videoSlug = `${courseSlug}/${createSlug(item.name!)}`;
      
      try {
        await db
          .insert(videosTable)
          .values({
            name: item.name!,
            type: "video",
            driveFileId: item.id,
            mimeType: item.mimeType,
            moduleId: null, // Vídeo direto do curso
            courseId: courseId,
            pathSlug: videoSlug,
            order: videoOrder++,
          })
          .onConflictDoUpdate({
            target: videosTable.pathSlug,
            set: {
              name: item.name!,
              mimeType: item.mimeType,
              courseId: courseId,
              order: videoOrder - 1,
            },
          });

        console.log(`      🎥 Vídeo processado: ${item.name}`);
      } catch (error) {
        console.error(`❌ Erro ao processar vídeo ${item.name}:`, error);
      }
    }
  }
}

// Função para processar vídeos dentro de um módulo
async function processVideosInModule(moduleFolderId: string, moduleId: string, courseId: string, moduleSlug: string) {
  const res = await drive.files.list({
    q: `'${moduleFolderId}' in parents and trashed=false`,
    fields: "files(id, name, mimeType)",
    orderBy: "name",
  });

  const videos = res.data.files || [];
  let videoOrder = 1;

  for (const video of videos) {
    const isVideo = video.mimeType?.includes("video") || video.name?.match(/\.(mp4|avi|mov|wmv|flv|webm)$/i);
    
    if (isVideo) {
      const videoSlug = `${moduleSlug}/${createSlug(video.name!)}`;
      
      try {
        await db
          .insert(videosTable)
          .values({
            name: video.name!,
            type: "video",
            driveFileId: video.id,
            mimeType: video.mimeType,
            moduleId: moduleId,
            courseId: courseId,
            pathSlug: videoSlug,
            order: videoOrder++,
          })
          .onConflictDoUpdate({
            target: videosTable.pathSlug,
            set: {
              name: video.name!,
              mimeType: video.mimeType,
              moduleId: moduleId,
              courseId: courseId,
              order: videoOrder - 1,
            },
          });

        console.log(`        🎬 Vídeo do módulo processado: ${video.name}`);
      } catch (error) {
        console.error(`❌ Erro ao processar vídeo do módulo ${video.name}:`, error);
      }
    }
  }
}

export async function syncDriveStructure() {
  const rootFolderId = "1nMSyjpyfjKkMzYzOcqRp0Yz-S96K2dwy";
  console.log("🚀 Iniciando sincronização da estrutura do Drive...");
  
  try {
    await processAreas(rootFolderId);
    console.log("✅ Sincronização concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante a sincronização:", error);
  }
}

syncDriveStructure().catch(console.error);
