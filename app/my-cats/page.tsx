"use client"

import Card from "@/components/Card";
import { Cat } from "@/types";
import styles from "../../styles/card.module.css";

//se re renderiza en loop cuando accedo a la pagina desde esa ruta

export default async function MyCat() {

  const jsonCats = await fetch("/api/cats");
  const myCats: Cat[] = await jsonCats.json();


  return (
    <div className={styles.container} >
      {myCats.length > 0
        ? myCats.map((cat) => <Card cat={cat} key={cat.id}></Card>)
        : <p>No cats found</p>}
    </div>
  );
}
