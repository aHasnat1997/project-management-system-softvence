import { Skeleton } from "@/components/ui/skeleton";
import { useSingleProjectQuery } from "@/redux/endpoints/projectsApi";

export default function ViewProject({ projectId }: { projectId: string }) {
  const { data: singleProject, isLoading, isFetching } = useSingleProjectQuery(projectId);

  return (
    <section>
      <div className="mb-4 flex items-center gap-4">
        <div className="w-full">
          {
            isLoading || isFetching ? (
              <Skeleton className="w-1/2 h-6" />
            ) : (
              <span className="text-lg font-semibold">
                <strong>Client Name:</strong> {singleProject?.data?.clientName}
              </span>
            )
          }
        </div>
        <div className="w-full">
          {
            isLoading || isFetching ? (
              <Skeleton className="w-1/2 h-6" />
            ) : (
              <span className="text-lg font-semibold">
                <strong>Sells By:</strong> {singleProject?.data?.sellsBy.firstName} {singleProject?.data?.sellsBy.lastName}
              </span>
            )
          }
        </div>
      </div>
      <div className="mb-4 flex items-center gap-4">
        <div className="w-full">
          {
            isLoading || isFetching ? (
              <Skeleton className="w-1/2 h-6" />
            ) : (
              <span className="text-lg font-semibold">
                <strong>Start Date:</strong> {singleProject?.data?.orderStartDate}
              </span>
            )
          }
        </div>
        <div className="w-full">
          {
            isLoading || isFetching ? (
              <Skeleton className="w-1/2 h-6" />
            ) : (
              <span className="text-lg font-semibold">
                <strong>Assigned By:</strong> {singleProject?.data?.assignedBy.firstName} {singleProject?.data?.assignedBy.lastName}
              </span>
            )
          }
        </div>
      </div>
      <div className="mb-4 flex items-center gap-4">
        <div className="w-full">
          {
            isLoading || isFetching ? (
              <Skeleton className="w-1/2 h-6" />
            ) : (
              <span className="text-lg font-semibold">
                <strong>Lead By:</strong> {singleProject?.data?.leadBy.firstName} {singleProject?.data?.leadBy.lastName}
              </span>
            )
          }
        </div>
        <div className="w-full">
          {
            isLoading || isFetching ? (
              <Skeleton className="w-1/2 h-6" />
            ) : (
              <span className="text-lg font-semibold">
                <strong>Delivery Date:</strong> {singleProject?.data?.deliveryDate}
              </span>
            )
          }
        </div>
      </div>
    </section>
  );
};
