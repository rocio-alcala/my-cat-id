import * as yup from "yup"

export const catFormSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(3,"Minimal characters is 3"),
  sex: yup.string().required("Sex is required"),
  raza: yup.string().required("Raza is required"),

})