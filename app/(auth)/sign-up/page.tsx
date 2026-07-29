"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validations";

export default function SignUp() {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ name: "", username: "", email: "", password: "" }}
      onSubmit={async (data) => Promise.resolve({ success: true, data })}
    />
  );
}
