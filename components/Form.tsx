"use client";

import styles from "../styles/form.module.css";
import { Switch, FormControlLabel } from "@mui/material";
import { Cat } from "@/types";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"


// validation

export default function Form() {

  const catFormSchema = yup.object().shape({
    name: yup.string().required("Name is requiered").min(3,"Minimal caracters is 3"),
    sex: yup.string().required("Sex is requiered"),
    raza: yup.string().required("Raza is requiered"),

  })
  const { register, handleSubmit, formState: {errors}, watch } = useForm<Cat>({
    resolver: yupResolver(catFormSchema)
  });

  const isTripleFelina = watch("tripleFelina");
  const isVLFe = watch("VLFe");
  const isDesparasitado = watch("desparasitado");
  const isRabia = watch("rabia");

  const onSubmit = (data: Cat) => {
    const JSONcatForm = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONcatForm,
    };
    fetch("/api/cats", options);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label className={styles.label} htmlFor="name">
        Name
      </label>
      <input
        className={styles.input}
        type="text"
        id="name"
        placeholder="Ingresa el nombre de tu gato"
        {...register("name")}
      ></input>
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      <label className={styles.label} htmlFor="raza">
        Raza
      </label>
      <input
        className={styles.input}
        placeholder="Ingresa raza de tu gato"
        type="text"
        id="raza"
        {...register("raza")}
      ></input>
      {errors.raza && <p className={styles.error}>{errors.raza.message}</p>}
      <label className={styles.label} htmlFor="sex">
        Sex
      </label>
      <select className={styles.input} id="sex" {...register("sex")}>
        <option value="macho">Macho</option>
        <option value="hembra">Hembra</option>
      </select>
      {errors.sex && <p className={styles.error}>{errors.sex.message}</p>}
      <label className={styles.label} htmlFor="birth">
        Birth
      </label>
      <input
        className={styles.input}
        type="date"
        id="birth"
        {...register("birth")}
      ></input>
      <FormControlLabel
        className={styles.label}
        control={
          <Switch
            id="tripleFelina"
            color="warning"
            {...register("tripleFelina")}
          />
        }
        label="tripleFelina"
      />
      {isTripleFelina ? (
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
            id="tripleFelinaDate"
            {...register("tripleFelinaDate")}
          ></input>
        </>
      ) : null}
      <FormControlLabel
        className={styles.label}
        control={<Switch id="rabia" color="warning" {...register("rabia")} />}
        label="rabia"
      />
      {isRabia ? (
        <>
          <label className={styles.label} htmlFor="fecha de vacunacion rabia">
            Fecha de vacunacion - Rabia
          </label>
          <input
            className={styles.input}
            type="date"
            id="rabiaDate"
            {...register("rabiaDate")}
          ></input>
        </>
      ) : null}
      <FormControlLabel
        className={styles.label}
        control={<Switch id="VLFe" color="warning" {...register("VLFe")} />}
        label="VLFe"
      />
      {isVLFe ? (
        <>
          <label className={styles.label} htmlFor="fecha de vacunacion VLFe">
            Fecha de vacunacion - VLFe
          </label>
          <input
            className={styles.input}
            type="date"
            id="VLFeDate"
            {...register("VLFeDate")}
          ></input>
        </>
      ) : null}
      <FormControlLabel
        className={styles.label}
        control={
          <Switch
            id="desparasitado"
            color="warning"
            {...register("desparasitado")}
          />
        }
        label="desparasitado"
      />
      {isDesparasitado ? (
        <>
          <label className={styles.label} htmlFor="fecha de desparasitacion">
            Fecha de ultima desparasitacion
          </label>
          <input
            className={styles.input}
            type="date"
            id="desparasitadoDate"
            {...register("desparasitadoDate")}
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
