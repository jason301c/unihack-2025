import ILLUSTRATIONS from "../../../constants/illustrations";
import { User } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-prim-lightest ">
      {/* Header */}
      <header className="flex mt-[5vh] justify-between items-center p-6 text-prim-darkest">
        <h1 className="text-2xl font-semibold">👋 Hi Zahir!</h1>
        <User className="w-8 h-8 cursor-pointer" />
      </header>

      {/* Actions Section */}
      <section className="flex mt-[5vh] flex-col w-full px-6 py-4 space-y-6 text-prim">
        {/* Left-aligned Actions title */}
        <h2 className="text-2xl font-semibold self-start mb-2">Actions</h2>

        {/* Action Buttons */}
        <button className="w-full py-4 px-6 flex justify-between items-center text-lg font-medium bg-blue-500 text-white rounded-lg shadow-md bg-prim-darkest hover:bg-prim-neutral">
          <span>Your Wardrobe</span>
          <img
            src={ILLUSTRATIONS.clotheshanger}
            alt="Icon"
            className="h-24 object-cover"
          />
        </button>

        <button className="w-full py-4 px-6 flex justify-between items-center text-lg font-medium bg-green-500 text-white rounded-lg shadow-md bg-prim-darkest hover:bg-prim-neutral">
          <span>Live Look</span>
          <img
            src={ILLUSTRATIONS.mirrorlady}
            alt="Icon"
            className="h-24 object-cover"
          />
        </button>
      </section>
    </div>
  );
}
