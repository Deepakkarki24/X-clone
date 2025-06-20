import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-black">
      <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
      <p className="text-lg mt-2 text-white">
        You must log in to view this page.
      </p>
      <Link
        to="/login"
        className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-amber-50"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
