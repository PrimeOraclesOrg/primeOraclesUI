import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Rewards from "@/pages/Rewards";
import Marketplace from "@/pages/Marketplace";
import Learning from "@/pages/Learning";
import LearningDetail from "@/pages/LearningDetail";
import ProductDetail from "@/pages/ProductDetail";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ConfirmCode from "@/pages/ConfirmCode";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import NotFound from "@/pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirm-code" element={<ConfirmCode />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* App routes */}
      <Route path="/" element={<Home />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/learning/:id" element={<LearningDetail />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/profile" element={<Settings />} />
      <Route path="/settings" element={<Settings />} />
      {/* Placeholder routes */}
      <Route path="/messages" element={<Marketplace />} />
      <Route path="/notifications" element={<Marketplace />} />
      <Route path="/workspace" element={<Marketplace />} />
      <Route path="/workspace/*" element={<Marketplace />} />
      <Route path="/purchases" element={<Marketplace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
