/**
 * ProtectedRoute Component
 *
 * Wrapper component that protects routes from unauthenticated access.
 * Redirects to login page if user is not authenticated.
 */

import { Navigate, useLocation } from "react-router-dom";
import { usePreviousLocation } from "@/hooks/usePreviousLocation";
import { useGetAuthUserQuery } from "@/store/authApi";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: user, isFetching } = useGetAuthUserQuery();
  const location = useLocation();
  const previousLocation = usePreviousLocation();

  useEffect(() => {
    console.log("Protected route mounted");
    return () => console.log("Protected route unmounted");
  }, []);

  console.log(
    `
    Protected route rerender
    Location state: ${location.pathname}
    Is fetching state: ${isFetching}
    User state:
  `,
    user
  );

  if (!user && !isFetching) {
    console.log("Navigate to login, current location:", location.pathname);

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
