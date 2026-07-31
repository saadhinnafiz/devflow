import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

export default function RightSidebar() {
  const topQuestions = [
    { _id: "1", title: "How do I get started with React?" },
    { _id: "2", title: "What is the difference between React and Angular?" },
    { _id: "3", title: "How do I manage state in a React application?" },
    { _id: "4", title: "What are React hooks and how do I use them?" },
    { _id: "5", title: "How do I optimize performance in a React app?" },
  ];
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky top-0 right-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 max-xl:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>
              <Image src="/icons/chevron-right.svg" alt="chevron" width={20} height={20} className="invert-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
