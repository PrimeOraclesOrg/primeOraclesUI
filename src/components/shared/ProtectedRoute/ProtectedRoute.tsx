/**
 * ProtectedRoute Component
 *
 * Wrapper component that protects routes from unauthenticated access.
 * Redirects to login page if user is not authenticated.
 */

import { Navigate, useLocation } from "react-router-dom";
import { usePreviousLocation } from "@/hooks/usePreviousLocation";
import { useGetAuthUserQuery } from "@/store/authApi";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: user, isFetching } = useGetAuthUserQuery();
  const location = useLocation();
  const previousLocation = usePreviousLocation();

  if (!user && !isFetching) {
    return (
      <Navigate
        to={"/login"}
        state={{
          afterLogin: location.pathname,
          beforeLogin: previousLocation,
        }}
        replace
      />
    );
  }

  return <>{children}</>;
}
