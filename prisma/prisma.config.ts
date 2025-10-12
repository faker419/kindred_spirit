// prisma/prisma.config.ts
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma", // path to your schema
  migrations: {
    seed: `tsx db/seed.ts`,
  },
});
