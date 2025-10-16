import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User roles for ConfoUP platform
export type UserRole = "entreprise" | "particulier" | "bureau";

// Users table with role-based access
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  role: text("role").notNull(), // 'entreprise' | 'particulier' | 'bureau'
  firebaseUid: text("firebase_uid").unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Entreprise-specific profile data
export const entrepriseProfiles = pgTable("entreprise_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  companyName: text("company_name").notNull(),
  sector: text("sector").notNull(),
  registrationNumber: text("registration_number"),
  activityType: text("activity_type"),
  location: text("location"),
  contactPerson: text("contact_person"),
});

// Bureau d'Étude profile data
export const bureauProfiles = pgTable("bureau_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  organizationName: text("organization_name").notNull(),
  legalIdentity: text("legal_identity"),
});

// BO (Bulletin Officiel) Documents
export const boDocuments = pgTable("bo_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  titleAr: text("title_ar"),
  reference: text("reference").notNull().unique(),
  publishDate: timestamp("publish_date").notNull(),
  category: text("category").notNull(), // e.g., 'regulatory', 'legal', 'tax', etc.
  sector: text("sector"), // business sector this affects
  contentFr: text("content_fr").notNull(),
  contentAr: text("content_ar"),
  summaryFr: text("summary_fr"), // AI-generated summary in French
  summaryAr: text("summary_ar"), // AI-generated summary in Arabic
  priority: text("priority").notNull().default("medium"), // 'urgent', 'medium', 'low'
  pdfUrl: text("pdf_url"),
});

// Alerts for users about relevant BO documents
export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  boDocumentId: varchar("bo_document_id").notNull().references(() => boDocuments.id),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Favorites for Particulier users
export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  boDocumentId: varchar("bo_document_id").notNull().references(() => boDocuments.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Entreprise Boxes (managed by Bureau d'Étude)
export const entrepriseBoxes = pgTable("entreprise_boxes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bureauUserId: varchar("bureau_user_id").notNull().references(() => users.id),
  companyName: text("company_name").notNull(),
  sector: text("sector").notNull(),
  registrationNumber: text("registration_number"),
  activityType: text("activity_type"),
  location: text("location"),
  status: text("status").default("active"), // 'active' | 'inactive'
  createdAt: timestamp("created_at").defaultNow(),
});

// Box-specific alerts
export const boxAlerts = pgTable("box_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  boxId: varchar("box_id").notNull().references(() => entrepriseBoxes.id),
  boDocumentId: varchar("bo_document_id").notNull().references(() => boDocuments.id),
  isResolved: boolean("is_resolved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  displayName: true,
  role: true,
  firebaseUid: true,
});

export const insertEntrepriseProfileSchema = createInsertSchema(entrepriseProfiles).omit({
  id: true,
});

export const insertBureauProfileSchema = createInsertSchema(bureauProfiles).omit({
  id: true,
});

export const insertBoDocumentSchema = createInsertSchema(boDocuments).omit({
  id: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true,
});

export const insertEntrepriseBoxSchema = createInsertSchema(entrepriseBoxes).omit({
  id: true,
  createdAt: true,
});

export const insertBoxAlertSchema = createInsertSchema(boxAlerts).omit({
  id: true,
  createdAt: true,
});

// TypeScript types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertEntrepriseProfile = z.infer<typeof insertEntrepriseProfileSchema>;
export type EntrepriseProfile = typeof entrepriseProfiles.$inferSelect;

export type InsertBureauProfile = z.infer<typeof insertBureauProfileSchema>;
export type BureauProfile = typeof bureauProfiles.$inferSelect;

export type InsertBoDocument = z.infer<typeof insertBoDocumentSchema>;
export type BoDocument = typeof boDocuments.$inferSelect;

export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;

export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof favorites.$inferSelect;

export type InsertEntrepriseBox = z.infer<typeof insertEntrepriseBoxSchema>;
export type EntrepriseBox = typeof entrepriseBoxes.$inferSelect;

export type InsertBoxAlert = z.infer<typeof insertBoxAlertSchema>;
export type BoxAlert = typeof boxAlerts.$inferSelect;

// Extended types for joined data
export type AlertWithDocument = Alert & { document: BoDocument };
export type BoxAlertWithDocument = BoxAlert & { document: BoDocument };
export type BoxWithAlerts = EntrepriseBox & { alerts: BoxAlertWithDocument[] };
