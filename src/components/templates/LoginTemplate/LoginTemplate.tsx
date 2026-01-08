/**
 * LoginTemplate
 *
 * Presentational component for the login step.
 * Uses split-screen AuthLayout with modern minimal design.
 */

import { LoginForm } from "@/components/organisms";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { useAuthModal } from "@/hooks/useAuthModal";

export function LoginTemplate() {
  const { setView } = useAuthModal();

  return (
    <AuthLayout title="Добро пожаловать">
      <LoginForm />
      <div className="flex items-center justify-center mt-8 pt-4">
        <p className="text-sm text-muted-foreground">
          Нету аккаунта?{" "}
          <button
            type="button"
            onClick={() => setView("register")}
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Регистрация
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
