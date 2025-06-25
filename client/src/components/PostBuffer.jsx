import React from "react";

const PostBuffer = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-2 text-sm text-gray-600">Posting...</span>
    </div>
  );
};

export default PostBuffer;
