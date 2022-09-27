import { PrismaClient } from "@prisma/client";
import words from "./data/words.json";

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  const data = words.map((word: string) => ({
    word: word,
    dateAdded: new Date(),
    date: "",
  }));

  const bulkWords = await prisma.word.createMany({
    data: data,
  });

  console.log(bulkWords);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export {};
