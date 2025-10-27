import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  numeric,
  uuid,
  foreignKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const accountsTable = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verificationsTable = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// Tabela de Áreas (FrontEnd, BackEnd, Carreira)
export const areasTable = pgTable("areas", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  driveFileId: text("drive_file_id"),
  pathSlug: text("path_slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabela de Cursos (Acessibilidade com React, SEO para Devs, etc.)
export const coursesTable = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  areaId: uuid("area_id")
    .notNull()
    .references(() => areasTable.id, { onDelete: "cascade" }),
  driveFileId: text("drive_file_id"),
  pathSlug: text("path_slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabela de Módulos (01 - Navegando pelo SEO, 02 - Crawling and Indexing, etc.)
export const modulesTable = pgTable("modules", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => coursesTable.id, { onDelete: "cascade" }),
  driveFileId: text("drive_file_id"),
  pathSlug: text("path_slug").notNull().unique(),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabela de Vídeos (aulas individuais)
export const videosTable = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  driveFileId: text("drive_file_id"),
  mimeType: text("mime_type"),
  moduleId: uuid("module_id")
    .references(() => modulesTable.id, { onDelete: "cascade" }),
  courseId: uuid("course_id")
    .references(() => coursesTable.id, { onDelete: "cascade" }),
  pathSlug: text("path_slug").notNull().unique(),
  order: integer("order").default(0),
  duration: integer("duration"), // duração em segundos
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const videosProgressTable = pgTable("video_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  videoId: uuid("video_id")
    .notNull()
    .references(() => videosTable.id, { onDelete: "cascade" }),
  lastPosition: numeric("last_position").default("0"),
  isCompleted: boolean("is_completed").default(false).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relações das Áreas
export const areasRelations = relations(areasTable, ({ many }) => ({
  courses: many(coursesTable),
}));

// Relações dos Cursos
export const coursesRelations = relations(coursesTable, ({ one, many }) => ({
  area: one(areasTable, {
    fields: [coursesTable.areaId],
    references: [areasTable.id],
  }),
  modules: many(modulesTable),
  videos: many(videosTable), // vídeos diretos do curso (sem módulo)
}));

// Relações dos Módulos
export const modulesRelations = relations(modulesTable, ({ one, many }) => ({
  course: one(coursesTable, {
    fields: [modulesTable.courseId],
    references: [coursesTable.id],
  }),
  videos: many(videosTable),
}));

// Relações dos Vídeos
export const videosRelations = relations(videosTable, ({ one, many }) => ({
  module: one(modulesTable, {
    fields: [videosTable.moduleId],
    references: [modulesTable.id],
  }),
  course: one(coursesTable, {
    fields: [videosTable.courseId],
    references: [coursesTable.id],
  }),
  progresses: many(videosProgressTable),
}));

export const videosProgressRelations = relations(
  videosProgressTable,
  ({ one }) => ({
    video: one(videosTable, {
      fields: [videosProgressTable.videoId],
      references: [videosTable.id],
    }),
  })
);
