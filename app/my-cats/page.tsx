"use client"

import Card from "@/components/Card";
import { cat } from "@/types";

export default async function MyCat() {

  const jsonCats = await fetch("http://localhost:3001/cats")
  const myCats:[cat] =  await jsonCats.json()
  
console.log("@mycats", myCats);

  return <div>{myCats.length>0 ? myCats.map((cat)=><Card cat={cat} key={cat.name}></Card>) : "Todavia no agregaste ningun gato"}</div>;
}
