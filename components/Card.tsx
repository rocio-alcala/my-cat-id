import { addMonths, addYears, differenceInYears } from "date-fns";
import styles from "../styles/card.module.css";
import { Cat, Periodicity, Vaccine, getVaccinePeriodicity } from "@/types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type CardProps = { cat: Cat; fetchCat: Function };

function getNextVaccineDate(vaccine: Vaccine, vaccineDate: string) {
  const periodicity = getVaccinePeriodicity(vaccine);
  const initialDate = new Date(vaccineDate);

  switch (periodicity) {
    case Periodicity.ANNUAL:
      return addYears(initialDate, 1).toLocaleDateString();
    case Periodicity.MONTHLY:
      return addMonths(initialDate, 1).toLocaleDateString();
  }
}

function getAge(birth: string) {
  const actualDate = new Date();
  const birthDate = new Date(birth);
  let age = differenceInYears(actualDate,birthDate)
  return age;
}



function Card({ cat, fetchCat }: CardProps) {

  async function handleDeleteCard(catId: string) {
    const URL = "http://localhost:3001/cats/" + catId;
    console.log(URL);
    const options = { method: "DELETE", body: URL };
    await fetch(URL, options);
    fetchCat()
  }

  return (
    <div className={styles.card}>
      <h1 className={styles.cardItemTitle}>{cat.name}</h1>
      <div className={styles.cardItem}>
        <p>Date of birth: {cat.birth || "not specified"} </p>
        {cat.birth && (
          <p>
            {cat.name} has {getAge(cat.birth)} years old
          </p>
        )}
      </div>
      <p className={styles.cardItem}>Sex: {cat.sex}</p>
      <p className={styles.cardItem}>Colors: {cat.color}</p>
      <div className={styles.cardItem}>
        <p>Rabies vaccine: {cat.rabies ? "Yes" : "No"}</p>
        {cat.rabiesDate ? (
          <p>
            {cat.name} next rabies vaccine is due for{" "}
            {getNextVaccineDate(Vaccine.RABIES, cat.rabiesDate)}
          </p>
        ) : (
          <p>{cat.name} should get the rabies vaccine</p>
        )}
      </div>
      <div className={styles.cardItem}>
        <p>Triple feline vaccine: {cat.tripleFeline ? "Yes" : "No"}</p>
        {cat.tripleFelineDate ? (
          <p>
            {cat.name} next triple feline vaccine is due for{" "}
            {getNextVaccineDate(Vaccine.TRIPLE_FELINE, cat.tripleFelineDate)}
          </p>
        ) : (
          <p>{cat.name} should get the triple feline vaccine</p>
        )}
      </div>
      <div className={styles.cardItem}>
        <p>VLFe vaccine: {cat.VLFe ? "Yes" : "No"}</p>
        {cat.VLFeDate ? (
          <p>
            {cat.name} next VLFe vaccine is due for{" "}
            {getNextVaccineDate(Vaccine.VLFe, cat.VLFeDate)}
          </p>
        ) : (
          <p>{cat.name} should get the VLFe vaccine</p>
        )}{" "}
      </div>
      <div className={styles.cardItem}>
        <p>Dewormed: {cat.dewormed ? "Yes" : "No"}</p>
        {cat.dewormedDate ? (
          <p>
            {cat.name} next deworm is due for{" "}
            {getNextVaccineDate(Vaccine.DEWORMED, cat.dewormedDate)}
          </p>
        ) : (
          <p>{cat.name} should be deworm</p>
        )}
      </div>
      <div className={styles.cardItem}>
        <button className={styles.button} type="button">
          Edit
        </button>
        <IconButton
          onClick={() => {
            handleDeleteCard(cat.id);;
          }}
          aria-label="delete"
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Card;
