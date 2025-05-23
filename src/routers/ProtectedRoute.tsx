import useCurrentUser from "@/hooks/useCurrentUser";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return (
      <Navigate to="/login" replace={true} />
    )
  }

  return (
    <>
      {children}
    </>
  )
};
