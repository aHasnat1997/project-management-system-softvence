import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSingleUsersQuery } from "@/redux/endpoints/userApi";

export default function UserDetails({ userId }: { userId: string }) {
  const { data: userData, isLoading, isFetching } = useSingleUsersQuery(userId);

  return (
    <section>
      <div className="p-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <div>
            {isLoading || isFetching ? (
              <div>
                <Skeleton className="size-52 rounded-full mb-4" />
              </div>
            ) : (
              <Avatar className="size-52 mb-4">
                <AvatarImage src={userData?.data?.avatar} alt="avatar" />
                <AvatarFallback className="bg-primary text-white font-semibold text-8xl">
                  {userData?.data?.firstName?.charAt(0)}
                  {userData?.data?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div>
            <div className="mb-4 flex items-center gap-4">
              <div className="w-full">
                {
                  isLoading || isFetching ? (
                    <Skeleton className="w-1/2 h-6" />
                  ) : (
                    <span className="text-lg font-semibold">
                      <strong>Name:</strong> {userData?.data?.firstName} {userData?.data?.lastName}
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
                      <strong>Username:</strong> {userData?.data?.userName}
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
                      <strong>Email:</strong> {userData?.data?.email}
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
                      <strong>EmployeeId:</strong> {userData?.data?.employeeId}
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
                      <strong>Phone:</strong> {userData?.data?.phoneNumber}
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
                      <strong>Designation:</strong> {userData?.data?.designation}
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
                      <strong>Status:</strong> {userData?.data?.userStatus}
                    </span>
                  )
                }
              </div>
              <div className="w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
