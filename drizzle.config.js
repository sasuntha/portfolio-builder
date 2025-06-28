import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_AEWzLrj5G6Hk@ep-old-hat-a8j7zonl-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
});
