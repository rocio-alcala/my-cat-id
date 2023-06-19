"use client";

import { useState } from "react";
import styles from "../styles/form.module.css";
import { Switch, FormControlLabel } from "@mui/material";
import { cat } from "@/types";

//hook form, validation, handling post, end point get 

export default function Form() {
  const [ficha, setFicha] = useState<cat>({
    name: "",
    raza: "",
    sexo: "hembra",
    tripleFelina: false,
    rabia: false,
    VLFe: false,
    desparasitado: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); ///VALIDAR EL FORM
    const JSONcatForm = JSON.stringify(ficha);//PUEDE HACER UN PUSH A UN ARRAY DE GATOS? O DEBO ENVIAR A UNA API Y DESPUES HACER UN FETCH???
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONcatForm,
    };
    fetch("/api/form",options)
  };

  console.log("@ficha", ficha)

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label} htmlFor="nombre">
        Nombre
      </label>
      <input
        className={styles.input}
        type="text"
        id="nombre"
        name="nombre"
        placeholder="Ingresa el nombre de tu gato"
        value={ficha.name}
        onChange={(ev) => setFicha({ ...ficha, name: ev.target.value })}
      ></input>
      <label className={styles.label} htmlFor="raza">
        Raza
      </label>
      <input
        onChange={(ev) => setFicha({ ...ficha, raza: ev.target.value })}
        className={styles.input}
        placeholder="Ingresa raza de tu gato"
        type="text"
        id="raza"
        name="raza"
        value={ficha.raza}
      ></input>
      <label className={styles.label} htmlFor="sexo">
        Sexo
      </label>
      <select
        onChange={(ev) => setFicha({ ...ficha, sexo: ev.target.value })}
        className={styles.input}
        id="sexo"
        name="sexo"
        value={ficha.sexo}
      >
        <option value="macho">Macho</option>
        <option value="hembra">Hembra</option>
      </select>
      <label className={styles.label} htmlFor="fecha de nacimiento">
        Fecha de nacimiento
      </label>
      <input
        className={styles.input}
        type="date"
        id="fecha de nacimiento"
        name="fecha de nacimiento"
        onChange={(ev) =>
          setFicha({ ...ficha, fechaDeNacimiento: ev.target.value })
        }
      ></input>
      <FormControlLabel
        className={styles.label}
        control={
          <Switch
            name="gilad"
            color="warning"
            onChange={() =>
              setFicha({ ...ficha, tripleFelina: !ficha.tripleFelina })
            }
          />
        }
        label="Vacuna Triple felina"
      />
      {ficha.tripleFelina ? (
        <>
          <label
            className={styles.label}
            htmlFor="fecha de vacunacion tripleFelina"
          >
            Fecha de vacunacion - Triple felina
          </label>
          <input
            className={styles.input}
            type="date"
            id="fecha de vacunacion tripleFelina"
            name="fecha de vacunacion tripleFelina"
            onChange={(ev) =>
              setFicha({ ...ficha, fechaTripleFelina: ev.target.value })
            }
          ></input>
        </>
      ) : null}
      <FormControlLabel
        className={styles.label}
        control={
          <Switch
            name="gilad"
            color="warning"
            onChange={() => setFicha({ ...ficha, rabia: !ficha.rabia })}
          />
        }
        label="Vacuna rabia"
      />
      {ficha.rabia ? (
        <>
          <label className={styles.label} htmlFor="fecha de vacunacion rabia">
            Fecha de vacunacion - Rabia
          </label>
          <input
            className={styles.input}
            type="date"
            id="fecha de vacunacion rabia"
            name="fecha de vacunacion rabia"
            onChange={(ev) =>
              setFicha({ ...ficha, fechaRabia: ev.target.value })
            }
          ></input>
        </>
      ) : null}
      <FormControlLabel
        className={styles.label}
        control={
          <Switch
            name="gilad"
            color="warning"
            onChange={() => setFicha({ ...ficha, VLFe: !ficha.VLFe })}
          />
        }
        label="Vacunado con VLFe"
      />
      {ficha.VLFe ? (
        <>
          <label className={styles.label} htmlFor="fecha de vacunacion VLFe">
            Fecha de vacunacion - VLFe
          </label>
          <input
            className={styles.input}
            type="date"
            id="fecha de vacunacion VLFe"
            name="fecha de vacunacion VLFe"
            onChange={(ev) =>
              setFicha({ ...ficha, fechaVLFe: ev.target.value })
            }
          ></input>
        </>
      ) : null}
      <FormControlLabel
        className={styles.label}
        control={
          <Switch
            name="gilad"
            color="warning"
            onChange={() =>
              setFicha({ ...ficha, desparasitado: !ficha.desparasitado })
            }
          />
        }
        label="Desparasitado"
      />
      {ficha.desparasitado ? (
        <>
          <label className={styles.label} htmlFor="fecha de desparasitacion">
            Fecha de ultima desparasitacion
          </label>
          <input
            className={styles.input}
            type="date"
            id="fecha de desparasitacion"
            name="fecha de desparasitacion"
            onChange={(ev) =>
              setFicha({ ...ficha, fechaDesparasitado: ev.target.value })
            }
          ></input>
        </>
      ) : null}
      <input
        className={styles.input}
        type="file"
        id="imagen"
        name="imagen"
        accept="image/*"
      />
      <button className={styles.button} type="submit">
        Enviar
      </button>
    </form>
  );
}
