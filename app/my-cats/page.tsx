"use client";

import Card from "@/components/Card";
import { Cat } from "@/types";
import styles from "../../styles/card.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function MyCat() {


  const jsonCats = await fetch("/api/cats");
  const myCats: Cat[] = await jsonCats.json();


  return (
   <div className={styles.cardcontainer}>
      {myCats.length > 0 ? (
        myCats.map((cat) => <Card cat={cat} key={cat.id}></Card>)
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
