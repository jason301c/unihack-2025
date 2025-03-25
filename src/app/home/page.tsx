import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ILLUSTRATIONS from "../../../constants/illustrations";
import HackathonDisclaimer from "@/components/hackathon-disclaimer";

const UserMenu = () => {
  return (
    <div className="relative">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-prim-darkest hover:text-prim-neutral"
      >
        Logout
        <User className="w-8 h-8 cursor-pointer" />
      </Link>
    </div>
  );
};

export default async function Home() {
  return (
    <div className="flex flex-col h-screen bg-prim-lightest ">
      <HackathonDisclaimer />

      {/* Header */}
      <header className="flex mt-[5vh] justify-between items-center p-6 text-prim-darkest">
        <h1 className="text-3xl font-semibold">👋 Hi Guest!</h1>
        <UserMenu />
      </header>

      {/* Actions Section */}
      <section className="flex mt-[5vh] flex-col w-full px-6 py-4 space-y-6 text-prim">
        {/* Left-aligned Actions title */}
        <h2 className="text-2xl font-semibold self-start mb-2">Actions</h2>

        {/* Action Buttons */}
        <Link href="/wardrobe" className="w-full">
          <button className="w-full py-4 px-6 flex justify-between items-center text-lg font-medium text-white rounded-lg shadow-md bg-prim-darkest hover:bg-prim-neutral">
            <span>Your Wardrobe</span>
            <Image
              src={ILLUSTRATIONS.clotheshanger}
              alt="Icon"
              width={96}
              height={96}
              className="h-24 object-cover"
            />
          </button>
        </Link>

        <Link href="/lookbook" className="w-full">
          <button className="w-full py-4 px-6 flex justify-between items-center text-lg font-medium text-white rounded-lg shadow-md bg-prim-darkest hover:bg-prim-neutral relative overflow-hidden">
            <span className="z-10">Look Book</span>
            <Image
              src={ILLUSTRATIONS.lookbook}
              alt="Icon"
              width={96}
              height={96}
              className="h-24 object-cover"
            />
          </button>
        </Link>

        <Link href="/livelook" className="w-full">
          <button className="w-full py-4 px-6 flex justify-between items-center text-lg font-medium text-white rounded-lg shadow-md bg-prim-darkest hover:bg-prim-neutral">
            <span>Live Look</span>
            <Image
              src={ILLUSTRATIONS.mirrorlady}
              alt="Icon"
              width={96}
              height={96}
              className="h-24 object-cover"
            />
          </button>
        </Link>
      </section>
    </div>
  );
}
