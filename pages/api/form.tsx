import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "postcss";

//cambiar nombre tienen que ser plural

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

  const newCat = {...req.body, id : req.body.name }

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
      throw new Error("Error en la solicitud");
    }
  } catch (err) {
    res.status(500).json("errorrrrr");
  }
}
