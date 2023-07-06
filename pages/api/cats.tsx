import { NextApiRequest, NextApiResponse } from "next";
import { uuid } from 'uuidv4';

//para proxima clase errores

export default async function handlerAddCatForm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const newCat = { ...req.body, id: uuid() };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCat),
        };
        const response = await fetch("http://localhost:3001/cats", options);

        if (response.ok) {
          res.status(200).json({ data: req.body });
        } else {
          throw new Error("Error posting cat");
        }
        break;
      case "GET":
        const jsonCats = await fetch("http://localhost:3001/cats");
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
