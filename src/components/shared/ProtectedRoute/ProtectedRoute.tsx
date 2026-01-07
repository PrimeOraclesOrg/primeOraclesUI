/**
 * ProtectedRoute Component
 *
 * Wrapper component that protects routes from unauthenticated access.
 * Redirects to login page if user is not authenticated.
 */

import { useEffect, useState } from "react";
import { getSession } from "@/services/authService";
import { Loader } from "@/components/atoms/Loader/Loader";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authModalWasOpened, setAuthModalWasOpened] = useState(false);
  const { open, isOpen } = useAuthModal();

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: session } = await getSession();
        setIsAuthenticated(!!session);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isAuthenticated) {
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
