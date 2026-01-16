/**
 * ProtectedRoute Component
 *
 * Wrapper component that protects routes from unauthenticated access.
 * Redirects to login page if user is not authenticated.
 */

import { Navigate, useLocation } from "react-router-dom";
import { usePreviousLocation } from "@/hooks/usePreviousLocation";
import { LoadingScreen } from "@/components/atoms";
import { selectAuthIsFetching, selectAuthUser, useAppSelector } from "@/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAppSelector(selectAuthUser);
  const isAuthFetching = useAppSelector(selectAuthIsFetching);
  const location = useLocation();
  const previousLocation = usePreviousLocation();

  if (isAuthFetching) {
    return <LoadingScreen />;
  }

  if (!user && !isAuthFetching) {
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
