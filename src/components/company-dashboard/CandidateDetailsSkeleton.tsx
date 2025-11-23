import { Skeleton } from "../ui/skeleton";

const CandidateDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-5">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>

      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-6 w-full" />

      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-24" />
      </div>

      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-3/4" />

      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-56" />
    </div>
  );
};

export default CandidateDetailsSkeleton;
