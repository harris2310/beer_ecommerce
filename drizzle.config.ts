import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite", // 'postgresql' | 'mysql' | 'sqlite'a
  dbCredentials: {
    url: "file:./database.sqlite",
  },
});
