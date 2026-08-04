"use client";

import { Path, useForm } from "react-hook-form";
import { AskQuestionSchema } from "@/lib/validations";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import z from "zod";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "@/components/ui/input";

export default function QuestionForm() {
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: standardSchemaResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = () => {};

  return (
    <form onSubmit={form.handleSubmit(handleCreateQuestion)} className="flex w-full flex-col gap-10">
      <Field>
        <FieldLabel htmlFor="title">Question Title</FieldLabel>
        <Input id="title" {...form.register("title")} />
      </Field>
    </form>
  );
}
