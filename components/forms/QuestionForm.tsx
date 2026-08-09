"use client";

import { Controller, useForm } from "react-hook-form";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { AskQuestionSchema } from "@/lib/validations";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import z from "zod";
import { Field, FieldLabel, FieldDescription, FieldError } from "../ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import TagCards from "../cards/TagCards";
import type { MDXEditorMethods } from "@mdxeditor/editor";

const Editor = dynamic(() => import("../editor"), { ssr: false });

export default function QuestionForm() {
  const editorRef = useRef<MDXEditorMethods>(null);

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
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
            <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
              Question Title <span className="text-primary-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
            />
            <FieldDescription className="body-regular text-light-500 mt-2.5">
              Be specific and imagine you&apos;re asking a question to another person.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="content"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
            <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
              Detailed explanation of your problem <span className="text-primary-500">*</span>
            </FieldLabel>
            <Editor markdown={field.value} editorRef={editorRef} onChange={field.onChange} />
            <FieldDescription className="body-regular text-light-500 mt-2.5">
              Introduce the problem and expand on what you&apos;ve put in the title.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="tags"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex w-full flex-col gap-3">
            <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
              Tags <span className="text-primary-500">*</span>
            </FieldLabel>
            <div>
              <Input
                placeholder="Add tags..."
                className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = e.currentTarget.value.trim();
                    const normalizedValue = value.toLowerCase();
                    const normalizedTags = field.value.map((t: string) => t.toLowerCase());

                    if (value && field.value.length < 5 && !normalizedTags.includes(normalizedValue)) {
                      field.onChange([...field.value, value]);
                      e.currentTarget.value = "";
                      form.clearErrors("tags");
                    } else if (field.value.length >= 5) {
                      form.setError("tags", { type: "manual", message: "You can add up to 5 tags only" });
                    } else if (normalizedTags.includes(normalizedValue)) {
                      form.setError("tags", { type: "manual", message: "Tag already exists" });
                    }
                  }
                }}
              />

              {field.value.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {field.value.map((tag: string) => (
                    <TagCards
                      key={tag}
                      _id={tag}
                      name={tag}
                      compact
                      remove
                      isButton
                      handleRemove={() => field.onChange(field.value.filter((t: string) => t !== tag))}
                    />
                  ))}
                </div>
              )}
            </div>
            <FieldDescription className="body-regular text-light-500 mt-2.5">
              Add up to 5 tags to describe what your question is about. You need to press enter to add a tag.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="mt-16 flex justify-end">
        <Button type="submit" className="primary-gradient !text-light-900 w-fit">
          Ask A Question
        </Button>
      </div>
    </form>
  );
}
