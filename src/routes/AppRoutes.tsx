import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute/ProtectedRoute";
import Home from "@/pages/Home";
import Rewards from "@/pages/Rewards";
import Marketplace from "@/pages/Marketplace";
import Learning from "@/pages/Learning";
import LearningDetail from "@/pages/LearningDetail";
import ProductDetail from "@/pages/ProductDetail";
import CreateProduct from "@/pages/CreateProduct";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp/SignUp";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public app routes - accessible without auth */}
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/learning/:id" element={<LearningDetail />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/create-product" element={<CreateProduct />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected routes - require authentication */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
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

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
