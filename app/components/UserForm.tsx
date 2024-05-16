"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { registerUser } from "../actions/actions";
import { UserCreate, UserCreateSchema } from "../validations/userValidation";

export default function UserRegistrationForm() {
  const form = useForm<UserCreate>({ resolver: yupResolver(UserCreateSchema) });

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: UserCreate) => {
    await registerUser(data);
    form.reset();
  };

  return (
    <form
      className="w-96 flex flex-col gap-2"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <input {...form.register("email")} type="text" placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        {...form.register("password")}
        type="text"
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button>Register</button>
    </form>
  );
}
