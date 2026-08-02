import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to learn react?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn nextjs?",
    tags: [
      { _id: "1", name: "nextjs" },
      { _id: "2", name: "javascript" },
    ],
    author: { _id: "2", name: "Jane Doe" },
    upvotes: 8,
    answers: 3,
    views: 50,
    createdAt: new Date(),
  },
  {
    _id: "3",
    title: "How to learn typescript?",
    tags: [
      { _id: "1", name: "typescript" },
      { _id: "2", name: "javascript" },
    ],
    author: { _id: "3", name: "Alice Doe" },
    upvotes: 5,
    answers: 2,
    views: 30,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
  const { query = "" } = await searchParams;
  const filteredQuestions = questions.filter((question) => question.title.toLowerCase().includes(query?.toLowerCase()));
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          nativeButton={false}
          className="primary-gradient !text-light-900 min-h-[46px] px-4 py-3"
          render={<Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>}
        />
      </section>
      <section className="mt-11">
        <LocalSearch route="/" imgSrc="/icons/search.svg" placeholder="Search for questions..." otherClasses="flex-1" />
      </section>
      HomeFilter
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h2 key={question._id}>{question.title}</h2>
        ))}
      </div>
    </>
  );
}
