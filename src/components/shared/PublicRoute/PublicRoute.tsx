/**
 * PublicRoute Component
 *
 * Wrapper for auth pages that redirects authenticated users to home.
 */

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "@/services/authService";
import { usePreviousLocation } from "@/hooks/usePreviousLocation";
import { LoadingScreen } from "@/components/atoms";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const previousLocation = usePreviousLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: user } = await getCurrentUser();
        setIsAuthenticated(!!user);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to={previousLocation || "/"} replace />;
  }

  return <>{children}</>;
}
