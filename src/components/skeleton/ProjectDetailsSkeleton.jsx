import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function ProjectDetailsSkeleton() {
  return (
    <Card className="overflow-hidden shadow-lg p-0 rounded-lg w-full">
      <div className="w-full h-64 overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      <CardHeader className="flex flex-row justify-between items-center px-6 pt-2 pb-0">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-64" />
        </div>
      </CardHeader>

      <CardContent className="px-6 py-0 flex flex-col gap-y-4">
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>

        <div className="grid gap-y-4 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center gap-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>

        <Separator className="bg-color-200" />

        <div>
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="relative">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-start relative mb-4">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="ml-4 flex-grow">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-color-200" />

        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(2)].map((_, index) => (
            <Card
              key={index}
              className="flex flex-col gap-2 items-start rounded-md p-2 px-4 bg-color-50 border-l-8 border-l-color-500 border-y-0 border-r-0"
            >
              <Skeleton className="h-6 w-32 mb-2" />
              {[...Array(3)].map((_, subIndex) => (
                <div key={subIndex} className="flex items-center w-full">
                  <Skeleton className="h-4 w-4 mr-2" />
                  <Skeleton className="h-4 flex-grow" />
                </div>
              ))}
            </Card>
          ))}
        </div>

        <CardFooter className="flex justify-end p-0 mb-4">
          <div className="flex justify-end gap-2">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-36" />
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default ProjectDetailsSkeleton;
