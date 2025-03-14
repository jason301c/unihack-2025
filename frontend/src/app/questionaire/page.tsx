import COLORS from "../../../constants/colors";
import ILLUSTRATIONS from "../../../constants/illustrations";

export default function Home() {
  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: COLORS.background, color: COLORS.text }}
    >
      {/* Text Section (Takes Equal Space) */}
      <div className="flex flex-col justify-evenly text-left w-full px-6 flex-grow">
        <h1 className="text-3xl font-bold">
          Welcome to <span style={{ color: COLORS.secondary }}><br /> Weave.</span>
        </h1>
        <p className="text-3xl font-bold">
          The app designed to make fashion <br /> simple.
        </p>
      </div>

      {/* Illustration Section (Centered) */}
      <div className="flex justify-center w-full">
        <img src={ILLUSTRATIONS.dressgirl} alt="Fashion Illustration" className="w-64" />
      </div>

      {/* Button (Fixed at Bottom) */}
      <div className="w-full">
        <button
          className="text-lg font-semibold px-6 py-5 w-full rounded-t-lg"
          style={{ backgroundColor: COLORS.secondary, color: COLORS.background }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
