interface Props {
  question: Question;
}
export default function QuestionCard({
  question: { _id, title, tags, author, upvotes, answers, views, createdAt },
}: Props) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
