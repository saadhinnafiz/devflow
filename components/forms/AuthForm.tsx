"use client";

import { DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import z, { ZodType } from "zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
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
    <form className="mt-10 space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
      {Object.keys(defaultValues).map((fieldName) => (
        <Field key={fieldName} className="flex w-full flex-col gap-2.5">
          <FieldLabel className="paragraph-medium text-dark400_light700" htmlFor={fieldName}>
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
          </FieldLabel>
          <Input
            required
            id={fieldName}
            type={fieldName === "password" ? "password" : "text"}
            {...form.register(fieldName as Path<T>)}
            className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border"
          />
        </Field>
      ))}

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="primary-gradient paragraph-medium rounded-2 font-inter !text-light-900 min-h-12 w-full cursor-pointer px-4 py-3 transition-transform active:scale-[0.98]"
      >
        {form.formState.isSubmitting ? (buttonText === "Sign In" ? "Signing In..." : "Signing Up...") : buttonText}
      </Button>

      {formType === "SIGN_IN" ? (
        <p>
          Don&apos;t have an account?{" "}
          <Link className="paragraph-semibold primary-text-gradient" href={ROUTES.SIGN_UP}>
            Sign Up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link className="paragraph-semibold primary-text-gradient" href={ROUTES.SIGN_IN}>
            Sign In
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
