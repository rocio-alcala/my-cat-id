"use client";

import Card from "@/components/Card";
import { Cat } from "@/types";
import styles from "../../styles/card.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyCat() {
  const [myCats, setMyCats] = useState<Cat[]>([]);

  async function fetchCats() {
    const jsonCats = await fetch("/api/cats");
    const myCats: Cat[] = await jsonCats.json();
    setMyCats(myCats);
    console.log("@mycats",myCats)
  }

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className={styles.cardcontainer}>
      {myCats.length > 0 ? (
        myCats.map((cat) => <Card fetchCat={fetchCats} cat={cat} key={cat.id}></Card>)
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
