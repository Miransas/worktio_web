import { pgTable, text, timestamp, integer, primaryKey, uuid, jsonb } from "drizzle-orm/pg-core";

// "users" değil, tam olarak "user" olmalı
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

// "accounts" değil, tam olarak "account" olmalı
export const accounts = pgTable("account", {
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (account) => ({
  compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
}));

// "sessions" değil, tam olarak "session" olmalı
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});


export const flows = pgTable("flows", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull().default("İsimsiz Flow"),
  nodes: jsonb("nodes").notNull().default([]),
  edges: jsonb("edges").notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Flow = typeof flows.$inferSelect;
export type NewFlow = typeof flows.$inferInsert

export const executions = pgTable("executions", {
  id: uuid("id").defaultRandom().primaryKey(),
  flowId: uuid("flow_id").notNull().references(() => flows.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  status: text("status").notNull().default("running"), // running | success | error
  results: jsonb("results").default({}),
  duration: integer("duration"), // ms
  createdAt: timestamp("created_at").defaultNow(),
});

export type Execution = typeof executions.$inferSelect;
export type NewExecution = typeof executions.$inferInsert;


///// EOL 
export const agents = pgTable("agents", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull().default("Yeni Agent"),
  systemPrompt: text("system_prompt").notNull().default("Sen yardımcı bir asistansın."),
  model: text("model").notNull().default("gemini-pro"), // gemini-pro | gpt-4o
  tools: jsonb("tools").notNull().default([]), // ["web_search","code","gmail","http","flow"]
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  agentId: uuid("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  role: text("role").notNull(), // user | assistant | tool
  content: text("content").notNull(),
  toolCall: jsonb("tool_call").default(null), // tool çağrısı detayı
  createdAt: timestamp("created_at").defaultNow(),
});

export type Agent = typeof agents.$inferSelect;
export type Message = typeof messages.$inferSelect;