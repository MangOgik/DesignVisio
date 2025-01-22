import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have the Skeleton component
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ArchitectCardSkeleton = () => {
  return (
    <Card className="p-4 pt-2 cursor-pointer hover:shadow-lg hover:shadow-slate-400 border-b-8 border-x-0 border-t-0 border-gray-200">
      {/* Header */}
      <CardHeader className="flex flex-col justify-between items-start p-0 pt-2 mb-1">
        <div className="flex justify-between items-start w-full">
          <Avatar className="h-14 w-14 rounded-full">
            <Skeleton className="w-full h-full rounded-full" />
          </Avatar>
          <Skeleton className="w-24 h-6 rounded-xl" />
        </div>
        <div className="flex flex-col items-start w-full gap-2 mt-2">
          <Skeleton className="w-32 h-5" />
          <div className="flex gap-2">
            <Skeleton className="w-14 h-5 rounded-md" />
            <Skeleton className="w-20 h-5 rounded-md" />
          </div>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex flex-col justify-center items-center px-0 pb-3">
        <Card className="grid grid-cols-2 rounded-md w-full">
          <div className="flex flex-col items-start gap-0.5 p-2">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-10 h-5 mt-1" />
          </div>
          <div className="flex flex-col items-start gap-0.5 p-2">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-10 h-5 mt-1" />
          </div>
          <div className="flex flex-col items-start gap-0.5 p-2 col-span-2">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-full h-5 mt-1" />
          </div>
          <div className="flex flex-col items-start gap-0.5 p-2 col-span-2">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-3/4 h-5 mt-1" />
          </div>
        </Card>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center p-1 py-0">
        <div className="flex justify-center items-center gap-1">
          <Skeleton className="w-16 h-4" />
        </div>
        <Button
          variant="link"
          className="flex items-center h-4 justify-center gap-1 text-xs text-color-alternative-black p-0"
        >
          <Skeleton className="w-20 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArchitectCardSkeleton;
