import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import trips from "./db.js";

async function init() {
  const app = express();
  const port = process.env.PORT || 4000;

  app.use(cors());
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.get("/trips", (req, res) => {
    let keywords = req.query.keywords;

    if (!keywords) {
      return res.status(200).json({ data: trips });
    }

    const keywordToArray = keywords.split(" ");
    const result = trips.filter((item) => {
      const filterKeyword = keywordToArray.every((filter) => {
        const filterResult =
          item.title.includes(filter) ||
          item.description.includes(filter) ||
          item.tags.includes(filter);
        return filterResult;
      });
      return filterKeyword;
    });

    return res.status(200).json({
      data: result,
    });
  });

  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
}

init();
