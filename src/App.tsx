import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AIChat from "./pages/AIChat";
import Content from "./pages/Content";
import Therapist from "./pages/Therapist";
import Profile from "./pages/Profile";
import SmartWatchDemo from "./pages/SmartWatchDemo";
import NotFound from "./pages/NotFound";
import BottomNavigation from "./components/BottomNavigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/content" element={<Content />} />
            <Route path="/therapist" element={<Therapist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/smartwatch-demo" element={<SmartWatchDemo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNavigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
