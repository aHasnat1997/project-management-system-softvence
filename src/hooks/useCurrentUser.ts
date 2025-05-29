import type { TCurrentLoginUser } from "@/types";

export default function useCurrentUser(): TCurrentLoginUser | null {
  const storedData = localStorage.getItem('persist:userInfo');
  const loginUser = JSON.parse(storedData!).user;
  const loginUserParseData = JSON.parse(loginUser);

  return loginUserParseData as TCurrentLoginUser | null;
};
