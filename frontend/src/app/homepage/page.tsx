import COLORS from "../../../constants/colors";
import ILLUSTRATIONS from "../../../constants/illustrations";
import { User } from "lucide-react";

export default function Home() {
    return (
      <div
        className="flex flex-col h-screen"
        style={{ backgroundColor: COLORS.background, color: COLORS.text }}
      >
        {/* Header */}
        <header className="flex justify-between items-center h-1/4 p-4 bg-opacity-10 backdrop-blur-md shadow-md">
          <h1 className="text-2xl font-semibold">👋 Hi Zahir!</h1>
          <User className="w-8 h-8 cursor-pointer" />
        </header>

        {/* Actions Section */}
      <section className="flex flex-col w-full p-4 space-y-4">
        {/* Left-aligned Actions title */}
        <h2 className="text-2xl font-semibold self-start">Actions</h2>

        {/* Action Button with Text on Left & Image on Right */}
        <button 
        className="w-full py-0 px-6 flex justify-between items-center text-lg font-medium bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        style={{ backgroundColor: COLORS.secondary, color: COLORS.background}}>
          <span>Your Wardrobe</span>
          <img src={ILLUSTRATIONS.clotheshanger} alt="Icon" className="h-full p-0 max-h-[100px] object-cover" />
        </button>

        <button 
        className="w-full py-0 px-6 flex justify-between items-center text-lg font-medium bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
        style={{ backgroundColor: COLORS.secondary, color: COLORS.background}}>
          <span>Live Look</span>
          <img src={ILLUSTRATIONS.mirrorlady} alt="Icon" className="h-full p-0 max-h-[100px] object-cover" />
        </button>
      </section>
  
        {/* Main Content */}
        <div className="flex flex-1"></div>
      </div>
    );
  }