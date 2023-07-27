import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

const DATABASE_URL = process.env.DATABASE_URL || "http://localhost:3001/cats/"

//para proxima clase errores

export default async function handlerAddCatForm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const newCat = { ...req.body, id: v4() };
        const postOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCat),
        };
        const response = await fetch(DATABASE_URL, postOptions);

        if (response.ok) {
          res.status(200).json({ data: req.body });
        } else {
          throw new Error("Error posting cat");
        }
        break;
      case "GET":
        const jsonCats = await fetch(DATABASE_URL);
        const cats = await jsonCats.json();
        if (jsonCats.ok) {
          res.status(200).json(cats);
        } else {
          throw new Error("Error fetching cats");
        }
        break;
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
