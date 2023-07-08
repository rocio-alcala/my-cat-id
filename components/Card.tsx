import { addMonths, addYears } from "date-fns";
import styles from "../styles/card.module.css";
import { Cat, Periodicity, Vaccine, getVaccinePeriodicity } from "@/types";

type CardTypes = { cat: Cat };

export function getNextVaccineDate(vaccine: Vaccine, vaccineDate: string) {
  const periodicity = getVaccinePeriodicity(vaccine);
  const initialDate = new Date(vaccineDate);

  switch (periodicity) {
    case Periodicity.ANNUAL:
      return addYears(initialDate, 1).toLocaleDateString();
    case Periodicity.MONTHLY:
      return addMonths(initialDate, 1).toLocaleDateString();
  }
}

function Card({ cat }: CardTypes) {
  function getAge(birth: string) {
    const actualDate = new Date();
    const birthDate = new Date(birth);
    let age = actualDate.getFullYear() - birthDate.getFullYear();
    if (actualDate.getMonth() < birthDate.getMonth()) {
      age = age - 1;
    } else if (actualDate.getMonth() === birthDate.getMonth()) {
      if (actualDate.getDate() < birthDate.getDate() + 1) {
        age = age - 1;
      }
    }
    return age;
  }

  return (
    <div className={styles.card}>
      <h1>{cat.name}</h1>
      <p>Date of birth: {cat.birth || "not specified"} </p>
      {cat.birth && (
        <p>
          {cat.name} has {getAge(cat.birth)} years old
        </p>
      )}
      <p>Sex: {cat.sex}</p>
      <p>Rabies vaccine: {cat.rabies ? "Yes" : "No"}</p>
      {cat.rabiesDate ? (
        <p>
          {cat.name} next rabies vaccine is due for{" "}
          {getNextVaccineDate(Vaccine.RABIES, cat.rabiesDate)}
        </p>
      ) : (
        <p>{cat.name} should get the rabies vaccine</p>
      )}
      <p>Triple feline vaccine: {cat.tripleFeline ? "Yes" : "No"}</p>
      {cat.tripleFelineDate ? (
        <p>
          {cat.name} next triple feline vaccine is due for{" "}
          {getNextVaccineDate(Vaccine.TRIPLE_FELINE, cat.tripleFelineDate)}
        </p>
      ) : (
        <p>{cat.name} should get the triple feline vaccine</p>
      )}
      <p>VLFe vaccine: {cat.VLFe ? "Yes" : "No"}</p>
      {cat.VLFeDate ? (
        <p>
          {cat.name} next VLFe vaccine is due for{" "}
          {getNextVaccineDate(Vaccine.VLFe, cat.VLFeDate)}
        </p>
      ) : (
        <p>{cat.name} should get the VLFe vaccine</p>
      )}
      {cat.dewormedDate ? (
        <p>
          {cat.name} next deworm is due for{" "}
          {getNextVaccineDate(Vaccine.DEWORMED, cat.dewormedDate)}
        </p>
      ) : (
        <p>{cat.name} should be deworm</p>
      )}
      <p>Colors: {cat.color}</p>
    </div>
  );
}

export default Card;
