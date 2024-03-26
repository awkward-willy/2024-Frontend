import { Skeleton } from "@/components/ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-24" />
      </div>
      <Skeleton className="h-10 w-96" />
      <Skeleton className="h-10 w-96" />
      <Skeleton className="h-10 w-96" />
    </div>
  );
}
