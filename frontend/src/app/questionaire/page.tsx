export default function Home() {
    return (
      <div className="flex flex-col justify-between items-center h-screen bg-black text-white p-6">
        {/* Header Text */}
        <div className="text-left w-full">
          <h1 className="text-3xl font-bold">
            Welcome to <span className="text-yellow-300">Weave.</span>
          </h1>
          <p className="text-lg mt-2">The app designed to make fashion simple.</p>
        </div>
  
        {/* Illustration */}
        <div className="w-full flex justify-center">
          <img src="/illustration.png" alt="Fashion Illustration" className="w-64" />
        </div>
  
        {/* Continue Button */}
        <button className="bg-yellow-200 text-black text-lg font-semibold px-6 py-3 rounded-lg w-full">
          Continue
        </button>
      </div>
    );
  }
  