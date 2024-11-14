import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      {/* Tailwind CSS spinner styles */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-900"></div>
    </div>
  );
};

export default LoadingSpinner;
