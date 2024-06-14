// import { type Config } from "drizzle-kit";

import { env } from "~/env";

// export default {
  // schema: "./src/server/db/schema.ts",
  // driver: "pg",
  // dbCredentials: {
    // connectionString: env.POSTGRES_URL,
  // },
  // tablesFilter: ["dunder-mifflin-x-salah-yudin_*"],
// } satisfies Config;

import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql", // "postgresql" | "mysql"
    schema: "./src/server/db/schema.ts",
    dbCredentials: {
      url: env.POSTGRES_URL,
    }
})