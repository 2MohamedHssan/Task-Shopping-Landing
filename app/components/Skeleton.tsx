import React from "react";

function Skeleton() {
  return (
    <div className="shadow-lg mt-4 bg-gray-100 rounded-2xl overflow-hidden text-black">
      <div className="flex justify-center items-center h-48 bg-white">
        <div className="animate-pulse w-24 h-24 bg-gray-300 rounded-full"></div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">
          <div className="animate-pulse w-1/2 h-6 bg-gray-300 rounded"></div>
        </h2>
        <h2 className="text-sm text-gray-600 font-semibold">
          <div className="animate-pulse w-1/3 h-4 bg-gray-300 rounded"></div>
        </h2>
        <div className="text-gray-700 mt-2">
          <div className="animate-pulse w-full h-4 bg-gray-300 rounded"></div>
        </div>
        <span className="block mt-1 text-lg font-bold">
          <div className="animate-pulse w-1/4 h-4 bg-gray-300 rounded"></div>
        </span>
        <button className="mt-4 bg-gray-300 text-white w-32 h-6 px-4 py-2 rounded"></button>
      </div>
    </div>
  );
}

export default Skeleton;
