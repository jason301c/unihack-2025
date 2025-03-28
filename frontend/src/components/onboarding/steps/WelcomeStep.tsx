import ILLUSTRATIONS from "../../../../constants/illustrations";
import Image from "next/image";
import Link from "next/link";
import { auth0 } from "@/lib/auth0";

export default async function Home() {
  const session = await auth0.getSession();
  const name = session?.user.name?.split('@')[0].slice(0, 10) || "Guest";

  return (
    <div className="flex flex-col h-screen w-screen overflow-y-auto">
      {/* Text Section remains unchanged */}
      <div className="flex flex-col text-left w-full px-6 mt-8 pt-20">
        { name && (
          <p className="text-3xl font-regular text-prim-darkest mb-8">
            Hi, {name}.
          </p>
        )}
      <h1 className="text-5xl font-semibold mb-6 text-prim-darkest">
        Welcome to{" "}
        <span className="text-prim-dark">
        <br /> Weave.
        </span>
      </h1>

      <p className="text-2xl font-regular text-prim-darkest">
        The app designed <br /> to make fashion <br /> simple.
      </p>
      </div>

      {/* Spacer to push content to bottom */}
      <div className="flex-grow"></div>

      {/* Container for image and button with relative positioning */}
      <div className="relative w-full">
        {/* Image section */}
        <div className="w-full flex justify-center">
          <div className="w-4/5">
            <Image
              src={ILLUSTRATIONS.dressgirl}
              alt="Fashion Illustration"
              layout={"responsive"}
              width={100}
              height={100}
            />
          </div>
        </div>

        {/* Button with background extension */}
        <div className="absolute bottom-[-50px] w-full">
          {/* This is the actual button */}
          <Link href="/home" className="block">
            <button
              className="text-xl font-semibold px-6 py-10 w-full bg-prim-darkest text-prim-light flex items-center justify-center h-[70px]"
              style={{ borderRadius: "20px 20px 0 0" }}
            >
              <span className="">Continue</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
