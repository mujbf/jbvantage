// RoutesConfig.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../pages/admin/Auth";
import Home from "../pages/Home";
import About from "../pages/About";
import OurFunds from "../pages/OurFunds";
import PvtWealthMgmt from "../pages/PvtWealthMgmt";
import InsWealthMgmt from "../pages/InsWealthMgmt";
import PvtAssetMgmt from "../pages/PvtAssetMgmt";
import Team from "../pages/Team";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Careers from "../pages/Careers";
import VEF from "../pages/VEF";
import MMF from "../pages/MMF";
import SGF from "../pages/SGF";
import BlogInner from "../pages/BlogInner";
import CareerInner from "../pages/CareerInner";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";
import CommonTerms from "../pages/CommonTerms";

import Login from "../pages/admin/Login";
import BlogAdmin from "../pages/admin/BlogAdmin";
import FundAdmin from "../pages/admin/FundAdmin";
import CareerAdmin from "../pages/admin/CareerAdmin";
import DatePicker from "../pages/admin/DatePicker";
import ImageUpload from "../components/sections/ImageUpload";

const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/funds" element={<OurFunds />} />
      <Route path="/private-wealth-management" element={<PvtWealthMgmt />} />
      <Route
        path="/institutional-wealth-management"
        element={<InsWealthMgmt />}
      />
      <Route path="/private-asset-management" element={<PvtAssetMgmt />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/funds/value-equity-fund" element={<VEF />} />
      <Route path="/funds/money-market-fund" element={<MMF />} />
      <Route path="/funds/short-term-gilt-fund" element={<SGF />} />
      <Route path="/blogs/:id" element={<BlogInner />} />
      <Route path="/careers/:id" element={<CareerInner />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<Terms />} />
      <Route path="/common-terminology" element={<CommonTerms />} />

      {/* Auth Routes */}
      <Route path="/admin" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/blogs"
        element={
          <ProtectedRoute>
            <BlogAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/funds"
        element={
          <ProtectedRoute>
            <FundAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/careers"
        element={
          <ProtectedRoute>
            <CareerAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/date"
        element={
          <ProtectedRoute>
            <DatePicker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/image-upload"
        element={
          <ProtectedRoute>
            <ImageUpload />
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoutesConfig;
