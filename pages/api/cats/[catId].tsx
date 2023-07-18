import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerAddCatForm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "DELETE":
        const catId = req.query.catId;
        const deleteOptions = { method: "DELETE" };
        const deleteCat = await fetch(
          "http://localhost:3001/cats/" + catId,
          deleteOptions
        );
        if (deleteCat.ok) {
          res.status(200).json(deleteCat);
        } else {
          console.error("@error deleting cat", deleteCat);
          throw new Error("Error deleting cat");
        }
    }
  } catch (err) {
    console.error("@error cat api", err);
    res.status(500).json(err);
  }
}
