import { prisma } from "src/db";
import { NextApiRequest, NextApiResponse } from "next";

const wordValidator = async (req: NextApiRequest, res: NextApiResponse) => {
  const word = req.query.word as string;

  const isValid = await prisma.word.findFirst({ where: { word } });

  res.statusCode = 200;
  res.send({ word: word, valid: isValid?.id ? true : false });
  res.end();
};

export default wordValidator;
