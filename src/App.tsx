import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Marketplace from "./pages/Marketplace";
import Learning from "./pages/Learning";
import LearningDetail from "./pages/LearningDetail";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/marketplace" replace />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/learning/:id" element={<LearningDetail />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* Placeholder routes */}
          <Route path="/rewards" element={<Marketplace />} />
          <Route path="/messages" element={<Marketplace />} />
          <Route path="/notifications" element={<Marketplace />} />
          <Route path="/workspace" element={<Marketplace />} />
          <Route path="/workspace/*" element={<Marketplace />} />
          <Route path="/purchases" element={<Marketplace />} />
          <Route path="/profile" element={<Marketplace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
