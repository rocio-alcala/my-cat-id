"use client";

import styles from "../styles/form.module.css";
import { Switch, FormControlLabel } from "@mui/material";
import { Cat } from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { catFormSchema } from "@/validations/newCatValidation";
import { useState } from "react";
import Modal from "./Modal";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<Cat>({
    resolver: yupResolver(catFormSchema),
  });

  const name = watch("name");
  const isTripleFelina = watch("tripleFelina");
  const isVLFe = watch("VLFe");
  const isDesparasitado = watch("desparasitado");
  const isRabia = watch("rabia");
  const [openSubmitCatModal, setOpenSubmitCatModal] = useState(false);
  const [openErrorCatModal, setOpenErrorCatModal] = useState(false);

  const onSubmit = (data: Cat) => {
    const JSONcatForm = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONcatForm,
    };
    const post = fetch("/api/cats", options).then((resp) => {
      if (resp.ok) {
        reset();
        setOpenSubmitCatModal(true);
      } else {
        setOpenErrorCatModal(true);
      }
    });
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
        placeholder="Your cat name"
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
        <option value="Male">Male</option>
        <option value="Female">Female</option>
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
      <Modal
        open={openSubmitCatModal}
        setOpen={setOpenSubmitCatModal}
        content={"You add a new cat to your cats"}
      ></Modal>
      <Modal
        open={openErrorCatModal}
        setOpen={setOpenErrorCatModal}
        content={"There was a problem adding your cat, try again"}
      ></Modal>
    </form>
  );
}
