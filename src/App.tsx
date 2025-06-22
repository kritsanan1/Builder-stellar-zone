import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AIChat from "./pages/AIChat";
import Content from "./pages/Content";
import Therapist from "./pages/Therapist";
import Community from "./pages/Community";
import CommunityRoom from "./pages/CommunityRoom";
import Profile from "./pages/Profile";
import SmartWatchDemo from "./pages/SmartWatchDemo";
import NotFound from "./pages/NotFound";
import BottomNavigation from "./components/BottomNavigation";
import PrivacyConsent from "./components/PrivacyConsent";

const queryClient = new QueryClient();

const App = () => {
  const handlePrivacyConsent = (accepted: boolean) => {
    if (accepted) {
      console.log("Privacy consent accepted - user can continue using the app");
    } else {
      console.log(
        "Privacy consent declined - redirect to external page or show limited functionality",
      );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-chat" element={<AIChat />} />
              <Route path="/therapist" element={<Therapist />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/:roomId" element={<CommunityRoom />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/smartwatch-demo" element={<SmartWatchDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNavigation />
            <PrivacyConsent onConsent={handlePrivacyConsent} />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
