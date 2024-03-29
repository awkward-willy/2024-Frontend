export default function LoadingPost() {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-bold">讀取中</span>
      <div className="h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />
      <div className="h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />
      <div className="h-1 w-1 animate-bounce rounded-full bg-white" />
    </div>
  );
}
