/**
 * ProtectedRoute Component
 *
 * Wrapper component that protects routes from unauthenticated access.
 * Redirects to login page if user is not authenticated.
 */

import { Navigate, useLocation } from "react-router-dom";
import { usePreviousLocation } from "@/hooks/usePreviousLocation";
import { useGetAuthUserQuery } from "@/store/authApi";
import { LoadingScreen } from "@/components/atoms";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: user, isLoading } = useGetAuthUserQuery();
  const location = useLocation();
  const previousLocation = usePreviousLocation();

  if (isLoading) return <LoadingScreen />;

  if (!user) {
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
