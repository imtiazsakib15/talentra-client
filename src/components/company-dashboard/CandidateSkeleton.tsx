import { Skeleton } from "@/components/ui/skeleton";

const CandidateSkeleton = () => {
  return (
    <div className="rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-4 w-28 mt-4" />
    </div>
  );
};

export default CandidateSkeleton;
