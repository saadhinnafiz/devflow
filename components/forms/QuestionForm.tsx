"use client";

import { Controller, useForm } from "react-hook-form";
import { AskQuestionSchema } from "@/lib/validations";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import z from "zod";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function QuestionForm() {
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: standardSchemaResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
    console.log(data);
  };
  return (
    <form onSubmit={form.handleSubmit(handleCreateQuestion)} className="flex w-full flex-col gap-10">
      <Field>
        <FieldLabel htmlFor="title">Question Title</FieldLabel>
        <Input id="title" {...form.register("title")} />
      </Field>

      <Field>
        <FieldLabel htmlFor="content">Detailed explanation of your problem</FieldLabel>
        <Input id="content" {...form.register("content")} />
      </Field>

      <Controller
        control={form.control}
        name="tags"
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="tags">Tags</FieldLabel>
            <Input
              placeholder="Add tags..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = e.currentTarget.value.trim();
                  if (value && field.value.length < 3 && !field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                    e.currentTarget.value = "";
                  }
                }
              }}
            />

            <div className="mt-2 flex flex-wrap gap-2.5">
              {field.value.map((tag: string) => (
                <div key={tag} className="bg-light-800 flex items-center gap-2 rounded-md px-3 py-1.5 text-sm">
                  {tag}
                  <button type="button" onClick={() => field.onChange(field.value.filter((t: string) => t !== tag))}>
                    x
                  </button>
                </div>
              ))}
            </div>
          </Field>
        )}
      />
      <Button type="submit" className="primary-gradient !text-light-900">
        Ask A Question
      </Button>
    </form>
  );
}
