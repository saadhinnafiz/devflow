"use client";

import { Controller, useForm } from "react-hook-form";
import { AskQuestionSchema } from "@/lib/validations";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import z from "zod";
import { Field, FieldLabel, FieldDescription, FieldError } from "../ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function QuestionForm() {
  // Set up the form: validated against AskQuestionSchema, starting with empty fields
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: standardSchemaResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  // Runs only after validation passes — for now, just logs the result
  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleCreateQuestion)} className="flex w-full flex-col gap-10">
      {/* TITLE FIELD */}
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
            <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
              Question Title <span className="text-primary-500">*</span>
            </FieldLabel>

            {/* {...field} wires value/onChange/onBlur/ref straight into the input */}
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
            />

            <FieldDescription className="body-regular text-light-500 mt-2.5">
              Be specific and imagine you&apos;re asking a question to another person.
            </FieldDescription>

            {/* Only shows up if this field failed Zod validation */}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* CONTENT FIELD — same pattern as title; will later become a rich-text editor */}
      <Controller
        control={form.control}
        name="content"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
            <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
              Detailed explanation of your problem <span className="text-primary-500">*</span>
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
            />

            <FieldDescription className="body-regular text-light-500 mt-2.5">
              Introduce the problem and expand on what you&apos;ve put in the title.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* TAGS FIELD — an array, not a plain string, so it needs custom add/remove logic */}
      <Controller
        control={form.control}
        name="tags"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex w-full flex-col gap-3">
            <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
              Tags <span className="text-primary-500">*</span>
            </FieldLabel>
            <div>
              {/* This input is NOT bound to field.value directly — it's just for typing a new tag */}
              <Input
                placeholder="Add tags..."
                className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // stop Enter from submitting the whole form
                    const value = e.currentTarget.value.trim();
                    // only add if: not empty, under 3 tags, not a duplicate
                    if (value && field.value.length < 3 && !field.value.includes(value)) {
                      field.onChange([...field.value, value]); // add tag to the array
                      e.currentTarget.value = ""; // clear the input box
                    }
                  }
                }}
              />

              {/* Render each current tag as a removable pill */}
              <div className="mt-2.5 flex flex-wrap gap-2.5">
                {field.value.map((tag: string) => (
                  <div
                    key={tag}
                    className="bg-light-800 dark:bg-dark-300 flex items-center gap-2 rounded-md px-3 py-1.5 text-sm"
                  >
                    {tag}
                    <button
                      type="button" // prevents this button from submitting the form
                      onClick={() => field.onChange(field.value.filter((t: string) => t !== tag))} // remove this one tag
                      className="cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <FieldDescription className="body-regular text-light-500 mt-2.5">
              Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* SUBMIT BUTTON — right-aligned, width fits its text */}
      <div className="mt-16 flex justify-end">
        <Button type="submit" className="primary-gradient !text-light-900 w-fit">
          Ask A Question
        </Button>
      </div>
    </form>
  );
}
