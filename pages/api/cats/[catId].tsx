import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerAddCatForm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const catId = req.query.catId;
    switch (req.method) {
      case "DELETE":
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
      case "PUT":
        const editOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        };
        const editCat = await fetch(
          "http://localhost:3001/cats/" + catId,
          editOptions
        );
        if (editCat.ok) {
          res.status(200).json(editCat);
        } else {
          console.error("@error editing cat", editCat);
          throw new Error("Error editing cat");
        }
    }
  } catch (err) {
    console.error("@error cat api", err);
    res.status(500).json(err);
  }
}
