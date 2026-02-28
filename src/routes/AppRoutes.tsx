import { Routes, Route, Outlet } from "react-router-dom";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute/ProtectedRoute";
import Home from "@/pages/Home";
import Rewards from "@/pages/Rewards";
import Marketplace from "@/pages/Marketpalce/Marketplace";
import Learning from "@/pages/Learning";
import LearningDetail from "@/pages/LearningDetail";
import WorkspaceMarketplace from "@/pages/WorkspaceMarketplace/WorkspaceMarketplace";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp/SignUp";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import ProfileSetup from "@/pages/ProfileSetup/ProfileSetup";
import { AuthRoute } from "@/components/shared";
import { LoadingScreen } from "@/components/atoms";
import { useGetMyProfileQuery } from "@/store/usersApi";
import { useGetAuthUserQuery } from "@/store/authApi";
import { useForceProfileSetup } from "@/hooks/useForceProfileSetup";
import { useAuthListener } from "@/hooks/useAuthListener";
import { CreateProduct, ProductDetail, UpdateProduct } from "@/pages/@product";
import {
  BalanceSettings,
  BasicSettings,
  HistorySettings,
  SecuritySettings,
} from "@/pages/@settings";
import { Messages } from "@/pages/Messages/Messages";

export function AppRoutes() {
  useAuthListener();
  useForceProfileSetup();

  const { isFetching: isAuthFetching } = useGetAuthUserQuery();
  const { isFetching: isProfileFetching } = useGetMyProfileQuery();

  return (
    <>
      {(isAuthFetching || isProfileFetching) && <LoadingScreen />}
      <Routes>
        {/* Public app routes - accessible without auth */}
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/learning/:id" element={<LearningDetail />} />
        <Route path="/products/:id" element={<ProductDetail />} />
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
          path="/workspace"
          element={
            <ProtectedRoute>
              <WorkspaceMarketplace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/marketplace"
          element={
            <ProtectedRoute>
              <WorkspaceMarketplace />
            </ProtectedRoute>
          }
        />
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
              <Messages />
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

        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
