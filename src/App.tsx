import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary, ForceProfileSetup, PopupRenderer } from "@/components/shared";
import { PopupProvider, PreviousLocationProvider } from "@/contexts";
import { store } from "@/store";
import { AppRoutes } from "@/routes";
import { useAuthListener } from "./hooks/useAuthListener";

const App = () => {
  useAuthListener();
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PopupProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <PopupRenderer />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <ForceProfileSetup />
              <PreviousLocationProvider>
                <AppRoutes />
              </PreviousLocationProvider>
            </BrowserRouter>
          </TooltipProvider>
        </PopupProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
