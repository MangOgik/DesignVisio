import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ProjectCardSkeleton = () => {
  return (
    <Card className="mb-4 rounded-lg p-2 border-2 border-transparent transition-all duration-200 hover:shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] overflow-hidden gap-4">
        <div className="relative h-52 sm:h-full">
          <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
        </div>

        <div className="pr-4 pl-3 flex flex-col gap-3">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>
                  <Skeleton className="h-6 w-3/4" />
                </CardTitle>
                <CardDescription className="mt-2">
                  <Skeleton className="h-4 w-1/2" />
                </CardDescription>
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5 mt-2" />
          </CardContent>

          <CardFooter className="mt-4 pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t border-color-100 p-0">
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>

            <Skeleton className="h-9 w-full sm:w-32" />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCardSkeleton;
