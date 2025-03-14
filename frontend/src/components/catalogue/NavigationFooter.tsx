'use client';

export function NavigationFooter() {
  return (
    <div className="mt-auto p-4 flex justify-between items-center">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-200"></div>
        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
      </div>
      
      <button 
        className="bg-yellow-50 text-black px-6 py-2 rounded-full font-medium"
      >
        Next
      </button>
    </div>
  );
}