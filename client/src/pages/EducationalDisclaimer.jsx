import React, { useState, useEffect } from "react";

const EducationalDisclaimer = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen the disclaimer
    const hasSeenDisclaimer = localStorage.getItem(
      "hasSeenEducationalDisclaimer"
    );
    if (!hasSeenDisclaimer) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("hasSeenEducationalDisclaimer", "true");
    setShowPopup(false);
  };

  const handleDecline = () => {
    // Redirect to a safe page or show alternative content
    window.location.href = "https://github.com/Deepakkarki24/X-clone/"; // Replace with your GitHub
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Educational Project Notice
          </h3>

          <div className="text-sm text-gray-600 mb-6 text-left">
            <p className="mb-3">
              <strong>
                This is an educational project created for learning purposes
                only.
              </strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>
                Not affiliated with Twitter/X or any social media platform
              </li>
              <li>Created to demonstrate web development skills</li>
              <li>No real user data is collected or stored</li>
              <li>This is a portfolio/learning project</li>
            </ul>
            <p className="text-xs text-gray-500">
              By continuing, you acknowledge this is a demo application for
              educational purposes.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              View Source Code
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue to Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalDisclaimer;
