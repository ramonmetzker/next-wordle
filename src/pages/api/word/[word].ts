import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const wordValidator = async (req: NextApiRequest, res: NextApiResponse) => {
  const word = req.query.word as string;

  const words: string[] = JSON.parse(
    readFileSync("data/words.json", { encoding: "utf-8" })
  );

  const isValid = words.find((storedWord) => word === storedWord)
    ? true
    : false;

  res.statusCode = 200;
  res.send({ word: word, valid: isValid });
  res.end();
};

export default wordValidator;
