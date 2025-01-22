import { Skeleton } from "@/components/ui/skeleton";

const  ArchitectDetailsContentSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
      {/* Personal Info Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-color-950 flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-6 w-40" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-48" />
              </div>
            ))}
        </div>
      </div>

      {/* Education & Certifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-color-950 flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-6 w-60" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="h-6 w-20" />
            ))}
        </div>
      </div>

      {/* Company Info Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-color-950 flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-6 w-40" />
        </h3>
        <Skeleton className="h-24 w-full" />
      </div>

      {/* Specializations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-color-950">
          <Skeleton className="h-6 w-40" />
        </h3>
        <div className="flex flex-wrap gap-2">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="h-6 w-20" />
            ))}
        </div>
      </div>

      {/* Bio Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-color-950">
          <Skeleton className="h-6 w-20" />
        </h3>
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}


export default ArchitectDetailsContentSkeleton;