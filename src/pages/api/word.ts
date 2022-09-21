import { readFileSync, writeFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { Word } from "src/types/word";

const wordHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.headers["x-api-key"];

  if (key !== process.env.API_KEY) {
    res.statusCode = 401;
    res.send({ error: "You're not allowed to perform this" });
    res.end();
    return;
  }

  const today = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;

  const words: Word[] = JSON.parse(
    readFileSync("data/words_db.json", { encoding: "utf-8" })
  );

  const word = words.find((word) => word.date === today);

  if (word) {
    res.statusCode = 200;
    res.send({ word: word.word });
    res.end();
  } else {
    const selectedWord = words[Math.trunc(Math.random() * words.length)];
    const wordIndex = words.findIndex(
      (word) => selectedWord.word === word.word
    );
    words[wordIndex] = { ...words[wordIndex], date: today };

    writeFileSync(
      "data/words_db.json",
      Buffer.from(JSON.stringify(words), "utf-8")
    );

    res.statusCode = 201;
    res.send({ word: selectedWord.word });
    res.end();
  }
};

export default wordHandler;
