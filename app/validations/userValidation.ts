import * as Yup from "yup";

export const UserCreateSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short")
    .max(15, "Too long")
    .required("Required"),
});

export type UserCreate = Yup.InferType<typeof UserCreateSchema>;
