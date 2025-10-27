import { google } from "googleapis";
import db from "@/db";
import { videosTable } from "@/db/schema";
import fs from "fs";

const credentials = JSON.parse(
  fs.readFileSync("lmsprivate-c5f47ecdeac8.json", "utf8")
);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

async function listFilesRecursively(
  parentDriveId: string,
  parentSlug = "",
  parentDbId?: string
) {
  const res = await drive.files.list({
    q: `'${parentDriveId}' in parents and trashed=false`,
    fields: "files(id, name, mimeType)",
  });

  const files = res.data.files || [];

  for (const file of files) {
    const isFolder = file.mimeType === "application/vnd.google-apps.folder";
    const slug = `${parentSlug}/${file.name
      ?.replace(/^\d+\s*-\s*/, "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")}`;

    try {
      const inserted = await db
        .insert(videosTable)
        .values({
          name: file.name!,
          type: isFolder ? "folder" : "video",
          driveFileId: isFolder ? null : file.id,
          mimeType: file.mimeType,
          pathSlug: slug,
          parentId: parentDbId ?? null,
        })
        .onConflictDoUpdate({
          target: videosTable.pathSlug,
          set: {
            name: file.name!,
            mimeType: file.mimeType,
            parentId: parentDbId ?? null,
          },
        })
        .returning({ id: videosTable.id });
      const currentDbId = inserted?.[0]?.id;
      console.log(
        `Inserido ${file.name} ${
          isFolder ? "como pasta" : "como vídeo"
        } com slug ${slug}`
      );

      if (isFolder) {
        await listFilesRecursively(file.id!, slug, currentDbId);
      }
    } catch (error) {
      console.error(`Erro ao processar ${file.name}:`, error);
    }
  }
}

export async function syncDriveStructure() {
  const rootFolderId = "1nMSyjpyfjKkMzYzOcqRp0Yz-S96K2dwy";
  await listFilesRecursively(rootFolderId, "", undefined);
  console.log("✅ Sincronização concluída.");
}

syncDriveStructure().catch(console.error);
