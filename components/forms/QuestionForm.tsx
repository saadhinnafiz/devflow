"use client";

import { useForm } from "react-hook-form";
import { AskQuestionSchema } from "@/lib/validations";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import z from "zod";

export default function QuestionForm() {
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: standardSchemaResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  return (
    <div>
      <h1>question form</h1>
    </div>
  );
}
