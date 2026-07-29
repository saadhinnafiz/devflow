"use client";

import { DefaultValues, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import z, { email, ZodType } from "zod";
import { SignInSchema } from "@/lib/validations";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({ schema, defaultValues, formType, onSubmit }: AuthFormProps<T>) => {
  // 1. Define form
  const form = useForm<z.infer<typeof schema>>({
    resolver: standardSchemaResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // 2. Define a submit handler

  const handleSubmit: SubmitHandler<T> = async () => {};

  // 3. Button text

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" {...form.register("email")} />
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" type="password" {...form.register("password")} />
      </Field>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default AuthForm;
