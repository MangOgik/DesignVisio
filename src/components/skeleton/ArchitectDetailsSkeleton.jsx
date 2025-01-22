import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArchitectDetailsContentSkeleton from "./ArchitectDetailsContentSkeleton";
import ArchitectPortfolioContentSkeleton from "./ArchitectPortfolioContentSkeleton";

const ArchitectDetailsSkeleton = () => {
  return (
    <div className="w-full h-fit pb-4 bg-color-50 text-color-alternative-black flex justify-center items-center px-4">
      <div className="h-full grid grid-cols-1 md:grid-cols-6 gap-4 w-full">
        {/* Left Column - Image and Card Skeleton */}
        <div className="md:col-span-2 flex flex-col">
          {/* Image Skeleton */}
          <Skeleton className="w-full aspect-square rounded-lg" />

          {/* Card Skeleton */}
          <Card className="p-3 select-none rounded-lg mt-4 flex flex-col">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>

            <CardContent className="px-0 py-2 flex flex-col gap-3">
              {/* Quantity Selector Skeleton */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>

              {/* Additional Info Skeletons */}
              <Skeleton className="h-4 w-1/2" />

              <div className="flex flex-col gap-2 bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              {/* Price Skeletons */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Details Skeleton */}
        <div className="md:col-span-4 flex flex-col">
          <Skeleton className="h-10 w-1/2 mb-4" />

          <Tabs defaultValue="detail" className="w-full flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="detail">
                <Skeleton className="h-8 w-full" />
              </TabsTrigger>
              <TabsTrigger value="info">
                <Skeleton className="h-8 w-full" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detail" className="flex-1 mt-4">
              <Card className="h-full w-full p-6">
                <ArchitectDetailsContentSkeleton />
              </Card>
            </TabsContent>

            <TabsContent value="info" className="flex-1 mt-4">
              <Card className="h-full w-full p-6">
                <ArchitectPortfolioContentSkeleton />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ArchitectDetailsSkeleton;
