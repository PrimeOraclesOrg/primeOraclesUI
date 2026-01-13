/**
 * ProtectedRoute Component
 *
 * Wrapper component that protects routes from unauthenticated access.
 * Redirects to login page if user is not authenticated.
 */

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService/authService";
import { Loader } from "@/components/atoms/Loader/Loader";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, setAuthentication } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: user } = await getCurrentUser();
        setAuthentication(!!user);
      } catch {
        setAuthentication(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setAuthentication]);

  return (
    <>
      {isLoading && (
        <div className="min-h-screen w-full bg-background flex items-center justify-center">
          <Loader size="lg" />
        </div>
      )}

      {!isAuthenticated && <Navigate to={"/login"} />}

      {isAuthenticated && children}
    </>
  );
}
