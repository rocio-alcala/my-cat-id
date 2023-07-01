import styles from "../styles/card.module.css";

function Card({cat}) {
    return (
      <div className={styles.card}>
        <h1>{cat.name}</h1>
        <p>Fecha de nacimiento: {cat.fechaDeNacimiento}</p>
        <p>Sexo: {cat.sexo}</p>
        <p>Vacunado rabia: {cat.rabia}</p>
        <p>Vacunado triple felina: {cat.tripleFelina}</p>
        <p>Vacunado VLFe: {cat.VLFe}</p>
        <p>Raza: {cat.raza}</p>
      </div>
    );
  }
  
  export default Card;