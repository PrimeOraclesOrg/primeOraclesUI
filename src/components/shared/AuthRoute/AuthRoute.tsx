/**
 * AuthRoute Component
 *
 * Wrapper for auth pages that redirects authenticated users to previous location.
 */

import { Navigate } from "react-router-dom";
import { usePreviousLocation } from "@/hooks/usePreviousLocation";
import { useGetAuthUserQuery } from "@/store/authApi";
import { LoadingScreen } from "@/components/atoms";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function AuthRoute({ children }: PublicRouteProps) {
  const [fetched, setFetched] = useState(false);
  const [user, setUser] = useState<User>();
  const { data, isLoading } = useGetAuthUserQuery();
  const previousLocation = usePreviousLocation();

  useEffect(() => {
    if (fetched || isLoading) return;
    setUser(data);
    setFetched(true);
  }, [data, fetched, setFetched, isLoading]);

  if (isLoading && !fetched) return <LoadingScreen />;

  if (user) {
    return <Navigate to={previousLocation || "/"} replace />;
  }

  return <>{children}</>;
}
