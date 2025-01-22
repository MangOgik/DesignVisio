import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PlaylistCardSkeleton = () => {
  return (
    <Card className="p-0">
      <CardHeader className="flex flex-row items-start space-y-0 pt-3 pb-0 px-3">
        <div className="flex-1 min-w-0 pr-2">
          <Skeleton className="h-6 w-3/4 mb-2" /> {/* Titlenya*/}
          <Skeleton className="h-4 w-1/2" /> {/* Genrenya */}
        </div>
        <Skeleton className="w-5 h-5 rounded-full" /> {/* more buttonnya */}
      </CardHeader>

      <Separator orientation="horizontal" className="my-2" />
      <CardContent className="px-3 pb-0 gap-2 flex flex-col items-center justify-center">
        <Skeleton className="w-full aspect-video" /> {/* imagenya */}
        <Skeleton className="h-10 w-full mt-0" /> {/* descriptionnya */}
      </CardContent>
      <Separator orientation="horizontal" className="my-2" />
      <CardFooter className="flex justify-end space-y-0 pb-3 pt-0 px-3">
        <Skeleton className="h-10 w-28" /> {/* buttonnya */}
      </CardFooter>
    </Card>
  );
};

export default PlaylistCardSkeleton;
