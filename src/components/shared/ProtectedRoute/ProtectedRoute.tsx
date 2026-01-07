/**
 * ProtectedRoute Component
 *
 * Wrapper component that protects routes from unauthenticated access.
 * Redirects to login page if user is not authenticated.
 */

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService";
import { Loader } from "@/components/atoms/Loader/Loader";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, setAuthentication } = useAuth();
  const [authModalWasOpened, setAuthModalWasOpened] = useState(false);
  const { open, isOpen } = useAuthModal();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      open();
      setAuthModalWasOpened(true);
    }
  }, [isLoading, isAuthenticated, open]);

  useEffect(() => {
    if (!isAuthenticated && !isOpen && authModalWasOpened) {
      navigate("/");
    }
  }, [isOpen, authModalWasOpened, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return;
  }

  return <>{children}</>;
}
