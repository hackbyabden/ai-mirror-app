import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isPremium: boolean("is_premium").default(false),
  freeScansRemaining: integer("free_scans_remaining").default(3),
  createdAt: timestamp("created_at").defaultNow(),
});

export const scanResults = pgTable("scan_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  scanType: text("scan_type").notNull(), // 'face', 'emotion', 'voice'
  originalImage: text("original_image"),
  processedImage: text("processed_image"),
  results: jsonb("results"), // JSON data for analysis results
  createdAt: timestamp("created_at").defaultNow(),
});

export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  answers: jsonb("answers").notNull(),
  predictions: jsonb("predictions").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dailySecrets = pgTable("daily_secrets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  secret: text("secret").notNull(),
  revealed: boolean("revealed").default(false),
  revealDate: timestamp("reveal_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertScanResultSchema = createInsertSchema(scanResults).pick({
  userId: true,
  scanType: true,
  originalImage: true,
  processedImage: true,
  results: true,
});

export const insertQuizResultSchema = createInsertSchema(quizResults).pick({
  userId: true,
  answers: true,
}).extend({
  predictions: z.any().optional(),
});

export const insertDailySecretSchema = createInsertSchema(dailySecrets).pick({
  userId: true,
  secret: true,
  revealDate: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertScanResult = z.infer<typeof insertScanResultSchema>;
export type ScanResult = typeof scanResults.$inferSelect;

export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type QuizResult = typeof quizResults.$inferSelect;

export type InsertDailySecret = z.infer<typeof insertDailySecretSchema>;
export type DailySecret = typeof dailySecrets.$inferSelect;
