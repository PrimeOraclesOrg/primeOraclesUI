import { Routes, Route, Outlet } from "react-router-dom";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute/ProtectedRoute";
import Home from "@/pages/Home";
import Rewards from "@/pages/Rewards";
import Marketplace from "@/pages/Marketplace";
import Learning from "@/pages/Learning";
import LearningDetail from "@/pages/LearningDetail";
import ProductDetail from "@/pages/ProductDetail";
import CreateProduct from "@/pages/CreateProduct/CreateProduct";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp/SignUp";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import ProfileSetup from "@/pages/ProfileSetup/ProfileSetup";
import { AuthRoute } from "@/components/shared";
import { LoadingScreen } from "@/components/atoms";
import { BasicSettings } from "@/pages/@settings/BasicSettings/BasicSettings";
import { SecuritySettings } from "@/pages/@settings/SecuritySettings/SecuritySettings";
import { BalanceSettings } from "@/pages/@settings/BalanceSettings/BalanceSettings";
import { HistorySettings } from "@/pages/@settings/HistorySettings/HistorySettings";
import { useGetMyProfileQuery } from "@/store/usersApi";
import { useGetAuthUserQuery } from "@/store/authApi";
import { useForceProfileSetup } from "@/hooks/useForceProfileSetup";

export function AppRoutes() {
  useForceProfileSetup();

  const { isFetching: isAuthFetching } = useGetAuthUserQuery();
  const { isFetching: isProfileFetching } = useGetMyProfileQuery();

  if (isAuthFetching || isProfileFetching) return <LoadingScreen />;

  return (
    <Routes>
      {/* Public app routes - accessible without auth */}
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/learning/:id" element={<LearningDetail />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/rewards" element={<Rewards />} />

      {/* Auth routes */}
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <AuthRoute>
            <ResetPassword />
          </AuthRoute>
        }
      />
      <Route path="/profile-setup" element={<ProfileSetup />} />

      {/* Protected routes - require authentication */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <BasicSettings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<BasicSettings />} />

        <Route path="basic" element={<BasicSettings />} />

        <Route path="security" element={<SecuritySettings />} />

        <Route path="balance" element={<BalanceSettings />} />

        <Route path="history" element={<HistorySettings />} />
      </Route>

      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspace"
        element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspace/*"
        element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/purchases"
        element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-product"
        element={
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
