import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const MyProfileSkeleton = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-6 flex items-center gap-6">
          <Skeleton className="h-20 w-20 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />

            <div className="mt-2 flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>

          <Skeleton className="h-10 w-28 rounded-md" />
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-6 space-y-6">
          <Skeleton className="h-5 w-40" />
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-6">
          <Skeleton className="h-5 w-24" />
          <Separator className="my-3" />

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-6 flex flex-col gap-3">
          <Skeleton className="h-5 w-24" />
          <Separator />
          <Skeleton className="h-10 w-32 rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfileSkeleton;
