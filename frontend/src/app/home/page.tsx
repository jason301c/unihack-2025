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

        <button className="w-full py-10 px-6 flex justify-between items-center text-lg font-medium text-white rounded-lg shadow-md bg-prim-darkest hover:bg-prim-neutral relative overflow-hidden">
          <span className="z-10">Live Look</span>
          <img
          src={ILLUSTRATIONS.mirrorlady}
          alt="Icon"
          className="absolute right-[-10px] top-0 h-full min-w-[150px] object-cover object-[75%_center] rounded-r-lg"
        />
        </button>

        <button className="w-full py-10 px-6 flex justify-between items-center text-lg font-medium text-white rounded-lg shadow-md bg-prim-darkest hover:bg-prim-neutral relative overflow-hidden">
          <span className="z-10">Look Book</span>
          <img
            src={ILLUSTRATIONS.lookbook}
            alt="Icon"
            className="absolute right-[10px] top-0 h-full min-w-[150px] object-cover object-right rounded-r-lg"
          />
        </button>
        
        <button className="w-full py-10 px-6 flex justify-between items-center text-lg font-medium text-white rounded-lg shadow-md bg-prim-darkest hover:bg-prim-neutral relative overflow-hidden">
          <span className="z-10">Your Wardrobe</span>
          <img
            src={ILLUSTRATIONS.clotheshanger}
            alt="Icon"
            className="absolute right-0 top-0 h-full min-w-[150px] object-cover object-right rounded-r-lg"
          />
        </button>
        
      </section>
    </div>
  );
}
