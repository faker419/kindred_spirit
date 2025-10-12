import { PrismaClient } from "@prisma/client";
import { seedMoods } from "./seeds/moods.ts";
import { seedTopics } from "./seeds/topics.ts";

const prisma = new PrismaClient();

async function main() {
  //await seedMoods(prisma);
  await seedTopics(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
