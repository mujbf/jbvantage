// App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import JBFNavbar from "./components/JBFNavbar";
import JBFAdminNavbar from "./components/JBFAdminNavbar";
import JBFFooter from "./components/JBFFooter";
import RoutesConfig from "./routes/RoutesConfig";
import LoadingSpinner from "./components/LoadingSpinner";
import { AuthProvider } from "./pages/admin/Auth";
import "./App.css";

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Check if the route is an admin route or the login page
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/admin";

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    handleStart();

    const timeoutId = setTimeout(() => {
      handleComplete();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoginPage && (isAdminRoute ? <JBFAdminNavbar /> : <JBFNavbar />)}
      <RoutesConfig />
      {!isAdminRoute && <JBFFooter />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
