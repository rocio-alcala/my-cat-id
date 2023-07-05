
import styles from "../styles/card.module.css";
import { Cat } from "@/types";

type CardTypes = { cat: Cat };

function Card({ cat }: CardTypes) {
  function getNextVaccineDate(vaccineDate: string | undefined) {
    if (typeof vaccineDate == "string") {
      const initialDate: Date = new Date(vaccineDate);
      const newDate: string = new Date(
        initialDate.getFullYear() + 1,
        initialDate.getMonth(),
        initialDate.getDate()
      ).toLocaleDateString();
      return newDate;
    }
  }

  return (
    <div className={styles.card}>
      <h1>{cat.name}</h1>
      <p>Date of birth: {cat.birth || "not specified"} </p>
      <p>Sex: {cat.sex}</p>
      <p>Rabies vaccine: {cat.rabia ? "Yes" : "No"}</p>
      {cat.rabia ? (
        <p>
          {cat.name} next rabies vaccine is due for
          {getNextVaccineDate(cat.rabiaDate)}
        </p>
      ) : (
        <p>{cat.name} should get the rabies vaccine</p>
      )}
      <p>Triple feline vaccine: {cat.tripleFelina ? "Yes" : "No"}</p>
      {cat.tripleFelina ? (
        <p>{cat.name} next triple feline vaccine is due for</p>
      ) : (
        <p>{cat.name} should get triple feline vaccine</p>
      )}
      <p>VLFe vaccine: {cat.VLFe ? "Yes" : "No"}</p>
      {cat.VLFe ? (
        <p>
          {cat.name} next VLFe vaccine is due for
          {getNextVaccineDate(cat.VLFeDate)}
        </p>
      ) : (
        <p>{cat.name} should get this VLFe vaccine</p>
      )}
      <p>Raza: {cat.raza}</p>
    </div>
  );
}

export default Card;
