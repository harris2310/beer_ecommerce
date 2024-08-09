import sqlite from "better-sqlite3";
import Database from "better-sqlite3";
import { userTable, sessionTable } from "./schema";
import { drizzle } from "drizzle-orm/better-sqlite3";

const sqliteDB = new Database("database.sqlite");
const db = drizzle(sqliteDB);

export default db;
