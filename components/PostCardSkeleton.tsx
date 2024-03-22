import { Skeleton } from "@/components/ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-24 h-10" />
      </div>
      <Skeleton className="w-96 h-10" />
      <Skeleton className="w-96 h-10" />
      <Skeleton className="w-96 h-10" />
    </div>
  );
}
