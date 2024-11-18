import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import JBFNavbar from "./components/JBFNavbar";
import JBFAdminNavbar from "./components/JBFAdminNavbar";
import JBFFooter from "./components/JBFFooter";
import RoutesConfig from "./routes/RoutesConfig";
import LoadingSpinner from "./components/LoadingSpinner";
import { AuthProvider } from "./pages/admin/Auth";
import "./App.css";

// SEO Component
interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

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
    <HelmetProvider>
      <SEO
        title="JB Financial - Investment and Wealth Management | Sri Lanka"
        description="JB Financial is a licensed private investment management company in Sri Lanka since 2011, offering top-tier asset management services. With over a decade of experience, we've earned multiple awards for our Unit Trusts and adhere to industry best practices, including the CFA Institute's Asset Manager Code."
        keywords="jb, financial, investment, wealth, management"
      />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
