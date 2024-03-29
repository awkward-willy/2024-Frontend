export default function PostTitle({ title }: { title: string }) {
  return (
    <h1 className="min-h-9 break-words border-b pb-2 text-4xl font-extrabold text-black">
      {title}
    </h1>
  );
}
