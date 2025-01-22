import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CompanyCardSkeleton = () => {
  return (
    <Card className="cursor-pointer hover:shadow-lg hover:shadow-slate-40">
      <CardHeader className="p-0 h-36">
        <Skeleton className="w-full h-full flex items-end rounded-t-xl">
          <Skeleton className="h-full w-full px-2 py-1 flex flex-col justify-end gap-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </Skeleton>
        </Skeleton>
      </CardHeader>
      <CardContent className="px-2 py-3">
        <div className="w-full h-full grid grid-cols-2 gap-y-3 gap-x-2">
          <Card className="flex flex-col gap-0.5 items-start rounded-md p-2 px-4 border-l-4 border-l-gray-300 border-y-0 border-r-0">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </Card>
          <Card className="flex flex-col gap-0.5 items-start rounded-md p-2 px-4 border-l-4 border-l-gray-300 border-y-0 border-r-0">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </Card>
          <Card className="flex flex-col items-start rounded-md p-2 px-2 col-span-2 gap-2">
            <Skeleton className="h-12"></Skeleton>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCardSkeleton;
