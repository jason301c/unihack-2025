import ILLUSTRATIONS from "../../../../constants/illustrations";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen justify-between">
      {/* Text Section (align top)*/}
      <div className="flex flex-col text-left w-full px-6 mt-8">
      <h1 className="text-4xl font-bold mb-6 mt-24 text-prim-darkest">
        Welcome to{" "}
        <span className="text-prim-dark">
        <br /> Weave.
        </span>
      </h1>

      <p className="text-3xl font-semibold text-prim-darkest">
        The app designed <br /> to make fashion <br /> simple.
      </p>
      </div>

      {/* Image and button section (align bottom) */}
      <div className="flex flex-col w-full items-center">
      {/* Illustration Section */}
      <div className="w-full flex justify-center">
        <div className="w-4/5">
        <Image
          src={ILLUSTRATIONS.dressgirl}
          alt="Fashion Illustration"
          layout="responsive"
          width={100}
          height={100}
        />
        </div>
      </div>

      {/* Button */}
      <div className="w-full">
        <Link href="/onboarding?step=1" className="block">
          <button 
            className="text-xl font-semibold px-6 py-4 w-full rounded-lg bg-prim-darkest text-prim-light"
          >
            Continue
          </button>
        </Link>
      </div>
      </div>
    </div>
  );
}
