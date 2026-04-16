import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import SizeGuidePage from "./pages/SizeGuidePage";
import QueEsCalzadoBarefoot from "./pages/que-es-calzado-barefoot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          {/* ── Contenido educativo ── */}
          <Route
            path="/aprende/que-es-calzado-barefoot"
            element={<QueEsCalzadoBarefoot />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
