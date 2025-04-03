import { singlestoreTable, singlestoreSchema, AnySingleStoreColumn, primaryKey, bigint, text, int, timestamp } from "drizzle-orm/singlestore-core"
import { sql } from "drizzle-orm"

export const driveTutorialFilesTable = singlestoreTable("drive_tutorial_files_table", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	ownerId: text("owner_id").notNull(),
	name: text().notNull(),
	size: int().notNull(),
	url: text().notNull(),
	parent: bigint({ mode: "number", unsigned: true }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "drive_tutorial_files_table_id"}),
]);

export const driveTutorialFoldersTable = singlestoreTable("drive_tutorial_folders_table", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	ownerId: text("owner_id").notNull(),
	name: text().notNull(),
	parent: bigint({ mode: "number", unsigned: true }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "drive_tutorial_folders_table_id"}),
]);
