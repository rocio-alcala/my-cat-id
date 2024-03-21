"use client";

import Card from "@/components/Card";
import { Cat } from "@/types";
import styles from "../../styles/card.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

type ApiCats = {
  [key: string]: Cat;
};

export default function MyCat() {
  const [myCats, setMyCats] = useState<Cat[]>([]);

  async function fetchCats() {
    const jsonCats = await fetch(
      "https://mycat-fff1c-default-rtdb.firebaseio.com/cats.json"
    );
    const myCats: ApiCats = await jsonCats.json(); //la api devuelve un objeto con el id de key de cada gato
    //por eso transformo el objeto en la estructura de array corespondiente para poder iterarlo en un map
    function transformMyCatsToArray(myCats: ApiCats) {
      let myCatInArray: Cat[] = [];
      Object.entries(myCats).forEach((cat) => {
        const id = cat[0];
        cat[1].id = id;
        myCatInArray.push(cat[1]);
      });
      return myCatInArray;
    }

    setMyCats(transformMyCatsToArray(myCats));
  }

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className={styles.cardcontainer}>
      {myCats.length > 0 ? (
        myCats.map((cat) => (
          <Card fetchCat={fetchCats} cat={cat} key={cat.id}></Card>
        ))
      ) : (
        <div className={styles.container}>
          <h1 className={styles.nocats}>No cats found</h1>
          <p className={styles.nocats}>You can add your cats </p>
          <div className={styles.nocats}>
            <Link href="/add-cat">here</Link>
          </div>
        </div>
      )}
    </div>
  );
}
