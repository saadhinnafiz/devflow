import QuestionForm from "@/components/forms/QuestionForm";

export default function QuestionsPage() {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>

      <div className="mt-10">
        <QuestionForm />
      </div>
    </>
  );
}
