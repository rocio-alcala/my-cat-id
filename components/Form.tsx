"use client";

import styles from "../styles/form.module.css";
import { Switch, FormControlLabel } from "@mui/material";
import { Cat } from "@/types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { catFormSchema } from "@/validations/newCatValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function notification(content: string) {
  toast.info(content);
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
  } = useForm<Omit<Cat, "id">>({
    resolver: yupResolver(catFormSchema),
  });

  const isTripleFeline = watch("tripleFeline");
  const isVLFe = watch("VLFe");
  const isDewormed = watch("dewormed");
  const isRabies = watch("rabies");

  const onSubmit = (data: Omit<Cat, "id">) => {
    const JSONcatForm = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONcatForm,
    };
    fetch("/api/cats", options).then((resp) => {
      if (resp.ok) {
        reset();
        notification(`You added ${data.name} to your cats`);
      } else {
        notification("There was a problem adding " + data.name + ", try again");
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
      <label className={styles.label} htmlFor="color">
        Color
      </label>
      <input
        className={styles.input}
        placeholder="What color is your cat"
        type="text"
        id="color"
        {...register("color")}
      ></input>
      {errors.color && <p className={styles.error}>{errors.color.message}</p>}
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
      <Controller
        control={control}
        {...register("tripleFeline")}
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            className={styles.label}
            control={
              <Switch
                id="tripleFeline"
                color="warning"
                {...field}
                checked={field.value}
              />
            }
            label="Triple feline vaccine"
          />
        )}
      />

      {isTripleFeline ? (
        <>
          <label className={styles.label} htmlFor="tripleFelineDate">
            Last triple filene vaccine date
          </label>
          <input
            className={styles.input}
            type="date"
            id="tripleFelineDate"
            {...register("tripleFelineDate")}
          ></input>
        </>
      ) : null}
      <Controller
        control={control}
        defaultValue={false}
        {...register("rabies")}
        render={({ field }) => (
          <FormControlLabel
            className={styles.label}
            control={
              <Switch
                id="rabies"
                color="warning"
                {...field}
                checked={field.value}
              />
            }
            label="Rabies vaccine"
          />
        )}
      />
      {isRabies ? (
        <>
          <label className={styles.label} htmlFor="rabiesDate">
            Last rabies vaccine date
          </label>
          <input
            className={styles.input}
            type="date"
            id="rabiesDate"
            {...register("rabiesDate")}
          ></input>
        </>
      ) : null}
      <Controller
        control={control}
        defaultValue={false}
        {...register("VLFe")}
        render={({ field }) => (
          <FormControlLabel
            className={styles.label}
            control={
              <Switch
                id="VLFe"
                color="warning"
                {...field}
                checked={field.value}
              />
            }
            label="VLFe vaccine"
          />
        )}
      />
      {isVLFe ? (
        <>
          <label className={styles.label} htmlFor="VLFeDate">
            Last VLFe vaccine date
          </label>
          <input
            className={styles.input}
            type="date"
            id="VLFeDate"
            {...register("VLFeDate")}
          ></input>
        </>
      ) : null}
      <Controller
        control={control}
        defaultValue={false}
        {...register("dewormed")}
        render={({ field }) => (
          <FormControlLabel
            className={styles.label}
            control={
              <Switch
                id="dewormed"
                color="warning"
                {...field}
                checked={field.value}
              />
            }
            label="Dewormed"
          />
        )}
      />
      {isDewormed ? (
        <>
          <label className={styles.label} htmlFor="dewormedDate">
            Last dewormed date
          </label>
          <input
            className={styles.input}
            type="date"
            id="dewormedDate"
            {...register("dewormedDate")}
          ></input>
        </>
      ) : null}
      <button className={styles.button} type="submit">
        Submit
      </button>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </form>
  );
}
