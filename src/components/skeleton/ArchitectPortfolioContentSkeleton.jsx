import { Skeleton } from "@/components/ui/skeleton";

const ArchitectPortfolioContentSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="p-4 text-center bg-color-50 rounded-lg">
              <Skeleton className="h-6 w-6 mx-auto mb-2" />
              <Skeleton className="h-8 w-16 mx-auto mb-1" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
          ))}
      </div>

      {/* Awards Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-color-950 flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-6 w-40" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="p-3 bg-color-50 rounded-lg">
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-color-950 flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-6 w-40" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-color-50 rounded-lg overflow-hidden"
              >
                <Skeleton className="aspect-video w-full" />
                <div className="p-4 space-y-3">
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArchitectPortfolioContentSkeleton;
