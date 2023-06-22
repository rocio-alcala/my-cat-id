"use client"

import Card from "@/components/Card";
import { Cat } from "@/types";

//se re renderiza en loop cuando accedo a la pagina desde esa ruta

export default async function MyCat() {

  const jsonCats = await fetch("/api/cats");
  const myCats: Cat[] = await jsonCats.json();


  return (
    <div>
      {myCats.length > 0
        ? myCats.map((cat) => <Card cat={cat} key={cat.id}></Card>)
        : "Todavia no agregaste ningun gato"}
    </div>
  );
}
