/**
 * ProtectedRoute Component
 *
 * Wrapper component that protects routes from unauthenticated access.
 * Redirects to login page if user is not authenticated.
 */

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePreviousLocation } from "@/contexts";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();
  const previousLocation = usePreviousLocation();

  return (
    <>
      {!user && (
        <Navigate
          to={"/login"}
          state={{
            afterLogin: location.pathname,
            beforeLogin: previousLocation,
          }}
          replace
        />
      )}

      {user && children}
    </>
  );
}
