import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Navigate, useLocation } from "react-router-dom";

// Define types for our context
interface AuthContextType {
  token: string | null;
  login: (password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
});

// Props type for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Props type for the ProtectedRoute
interface ProtectedRouteProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("adminToken")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem("adminToken")
  );

  // Update authentication state when token changes
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = (adminPassword: string): boolean => {
    // In a real app, you'd validate credentials against a backend
    // and receive a proper JWT token
    if (adminPassword === "your-secure-admin-password") {
      const newToken = generateToken();
      localStorage.setItem("adminToken", newToken);
      setToken(newToken);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  const generateToken = (): string => {
    // This is a very basic token generation
    // In production, use proper JWT with encryption
    return `admin-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  };

  const value = {
    token,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Protected Route wrapper component
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Example of how to use the return URL after login
export const getReturnUrl = (location: {
  state?: { from?: Location };
}): string => {
  return location.state?.from?.pathname || "/admin/blogs";
};

/*
Example usage in App.tsx:

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './auth-context';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<PublicPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

And in your Login component, you can use the return URL like this:

const location = useLocation();
const navigate = useNavigate();

// After successful login:
const returnUrl = getReturnUrl(location);
navigate(returnUrl);
*/
