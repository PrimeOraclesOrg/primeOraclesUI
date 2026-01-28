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
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: user, isLoading, isFetching } = useGetAuthUserQuery();
  const location = useLocation();
  const previousLocation = usePreviousLocation();
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    setWaiting(true);
    let timer: NodeJS.Timeout;
    if (!isFetching) {
      timer = setTimeout(() => {
        setWaiting(false);
      }, 10);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isFetching]);

  if (isLoading || waiting) return <LoadingScreen />;

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
