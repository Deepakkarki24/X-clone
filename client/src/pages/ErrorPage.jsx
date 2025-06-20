import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl text-white font-semibold mb-2">
        Oops! Page not found.
      </h2>
      <p className="text-gray-600 font-medium mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
