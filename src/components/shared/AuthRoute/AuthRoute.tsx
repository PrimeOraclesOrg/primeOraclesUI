/**
 * AuthRoute Component
 *
 * Wrapper for auth pages that redirects authenticated users to previous location.
 */

import { Navigate } from "react-router-dom";
import { usePreviousLocation } from "@/hooks/usePreviousLocation";
import { useGetAuthUserQuery } from "@/store/authApi";
import { LoadingScreen } from "@/components/atoms";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function AuthRoute({ children }: PublicRouteProps) {
  const { data: user, isLoading } = useGetAuthUserQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const previousLocation = usePreviousLocation();

  if (isLoading) return <LoadingScreen />;

  if (user) {
    return <Navigate to={previousLocation || "/"} replace />;
  }

  return <>{children}</>;
}
