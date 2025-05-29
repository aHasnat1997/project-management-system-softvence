import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSingleUsersQuery } from "@/redux/endpoints/userApi";
import CoverImage from "@/assets/bg-cover-image.jpg";

export default function UserDetails({ userId }: { userId: string }) {
  const { data: userData, isLoading, isFetching } = useSingleUsersQuery(userId);

  return (
    <section>
      <div className="relative">
        <img
          src={CoverImage}
          alt="cover image"
          className="w-full"
        />
        <div className="absolute top-24 left-6">
          <div>
            {isLoading || isFetching ? (
              <div>
                <Skeleton className="size-[164px] rounded-full mb-4" />
              </div>
            ) : (
              <Avatar className="size-[164px] mb-4">
                <AvatarImage src={userData?.data?.avatar} alt="avatar" />
                <AvatarFallback className="bg-primary text-white font-semibold text-8xl">
                  {userData?.data?.firstName?.charAt(0)}
                  {userData?.data?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="w-full flex flex-col items-center">
            <div>
              {
                isLoading || isFetching ? (
                  <Skeleton className="w-1/2 h-6" />
                ) : (
                  <span className="text-[24px] font-bold">
                    {userData?.data?.firstName} {userData?.data?.lastName}
                  </span>
                )
              }
            </div>
            <div>
              {
                isLoading || isFetching ? (
                  <Skeleton className="w-1/2 h-6" />
                ) : (
                  <span className="text-[14px]">
                    {userData?.data?.designation}
                  </span>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 ml-56">
        <div className="mb-4 flex items-center gap-4">
          <div className="w-full">
            {
              isLoading || isFetching ? (
                <Skeleton className="w-1/2 h-6" />
              ) : (
                <span className="text-lg">
                  <span className="font-semibold">Username:</span> {userData?.data?.userName}
                </span>
              )
            }
          </div>
          <div className="w-full">
            {
              isLoading || isFetching ? (
                <Skeleton className="w-1/2 h-6" />
              ) : (
                <span className="text-lg">
                  <span className="font-semibold">Employee Id:</span> {userData?.data?.employeeId}
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
                <span className="text-lg">
                  <span className="font-semibold">Email:</span> {userData?.data?.email}
                </span>
              )
            }
          </div>
          <div className="w-full">
            {
              isLoading || isFetching ? (
                <Skeleton className="w-1/2 h-6" />
              ) : (
                <span className="text-lg">
                  <span className="font-semibold">EmployeeId:</span> {userData?.data?.employeeId}
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
                <span className="text-lg">
                  <span className="font-semibold">Phone:</span> {userData?.data?.phoneNumber}
                </span>
              )
            }
          </div>
          <div className="w-full">
            {
              isLoading || isFetching ? (
                <Skeleton className="w-1/2 h-6" />
              ) : (
                <span className="text-lg">
                  <span className="font-semibold">Status:</span> {userData?.data?.userStatus}
                </span>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
};
