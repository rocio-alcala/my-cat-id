import { NextApiRequest, NextApiResponse } from "next";
const DATABASE_URL = process.env.DATABASE_URL || "http://localhost:3001/cats/"

export default async function handlerAddCatForm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const catId = req.query.catId;
    switch (req.method) {
      case "DELETE":
        const deleteOptions = { method: "DELETE" };
        const deleteCat = await fetch(DATABASE_URL + catId, deleteOptions);
        if (deleteCat.ok) {
          res.status(200).json(deleteCat);
        } else {
          throw new Error("Error deleting cat");
        }
      case "PUT":
        const editOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        };
        const editCat = await fetch(DATABASE_URL + catId, editOptions);
        if (editCat.ok) {
          res.status(200).json(editCat);
        } else {
          throw new Error("Error editing cat");
        }
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
