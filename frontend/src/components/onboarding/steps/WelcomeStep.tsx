import ILLUSTRATIONS from "../../../../constants/illustrations";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Text Section*/}
      <div className="flex flex-col justify-evenly text-left w-full px-6 flex-grow">
        <h1 className="text-3xl font-bold">
          Welcome to{" "}
          <span className="text-prim-darkest">
            <br /> Weave.
          </span>
        </h1>
        <p className="text-3xl font-bold">
          The app designed <br /> to make fashion <br /> simple.
        </p>
      </div>

      {/* Illustration Section*/}
      <div className="flex justify-center w-full">
        <img
          src={ILLUSTRATIONS.dressgirl}
          alt="Fashion Illustration"
          className="w-64"
        />
      </div>

      {/* Button*/}
      <div className="w-full">
        <button className="text-lg font-semibold px-6 py-5 w-full rounded-t-lg">
          Continue
        </button>
      </div>
    </div>
  );
}
