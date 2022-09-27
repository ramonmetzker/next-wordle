import prisma from "src/db";
import { NextApiRequest, NextApiResponse } from "next";

const wordHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.headers["x-api-key"];

  if (key !== process.env.API_KEY) {
    res.statusCode = 401;
    res.send({ error: "You're not allowed to perform this" });
    res.end();
    return;
  }

  const today = `${new Date().getDate().toString().padStart(2, "0")}/${(
    new Date().getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${new Date().getFullYear()}`;

  const word = await prisma.word.findFirst({ where: { date: today } });

  if (word) {
    res.statusCode = 200;
    res.send({ word: word.word });
    res.end();
  } else {
    const foundWord = await prisma.word.findFirst({
      where: { NOT: { date: today } },
    });
    const word = await prisma.word.update({
      where: { id: foundWord?.id },
      data: { date: today },
    });

    res.statusCode = 201;
    res.send({ word: word.word });
    res.end();
  }
};

export default wordHandler;
