import React, { useState, useEffect } from "react";

const NoticePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup on homepage load
    setIsOpen(true);

    // Optional: Check if user has closed it recently (using localStorage)
    const popupClosedTime = localStorage.getItem("noticePopupClosed");
    if (
      popupClosedTime &&
      Date.now() - parseInt(popupClosedTime) < 10 * 60 * 1000
    ) {
      setIsOpen(false);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    // Optional: Remember that user closed the popup (for 24 hours)
    localStorage.setItem("noticePopupClosed", Date.now().toString());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-center">
            <span className="font-bold zodiak-r text-primary-800 text-center">
              NOTICE
            </span>
          </h3>
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="text-sm">
          <p className="switzer-r text-neutral-mid text-center">
            Due to the change in AIT(Advance Income Tax) rates from 5% to 10%
            w.e.f. 01.04.2025, we are experiencing delays in publishing the
            latest fund prices. We sincerely apologize for the inconvenience
            caused, and are working hard to rectify the situation at the
            earliest.
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={closePopup}
            className="px-4 py-2 bg-primary-800 text-white rounded hover:bg-primary-900 text-sm switzer-r"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticePopup;
