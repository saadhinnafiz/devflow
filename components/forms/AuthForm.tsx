"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { SignInSchema } from "@/lib/validations";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function AuthForm() {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: standardSchemaResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof SignInSchema>) {}

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
}
