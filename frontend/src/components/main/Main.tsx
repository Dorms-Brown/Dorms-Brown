import { useNavigate } from "react-router-dom";
import LandingBackground from "../../assets/LandingBackground.png";
import { InlineIcon } from "@iconify/react";
import Navbar from "../Navbar";

/**
 * The main landing page that holds the majority of our components in a central location 
 * @returns 
 */
function Main() {

  // to link between pages 
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255, 0.1), rgba(255,255,255, 0.2)), url(${LandingBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className="px-8 sm:px-12 md:px-32 lg:px-48 py-36 items-center text-center">
        <div aria-label="Header">
          <h1
            className="font-sans  text-[#488358] font-extrabold leading-none text-5xl lg:text-6xl text-center z-1 drop-shadow-xl [text-shadow:_-4px_4px_0_rgb(255_255_255_/_100%)]"
            aria-describedby="Dorms at Brown"
          >
            Dorms @ Brown
          </h1>
          <p
            className="py-7 text-lg font-sans font-semibold text-[#488358] lg:text-xl sm:px-16 xl:px-48 text-center drop-shadow-xl"
            aria-describedby="Housing selection made easy. Start here to read or leave a dorm
          review!"
          >
            Housing selection made easy. Start here to read or leave a dorm
            review!
          </p>
        </div>
        {/* <SearchBar /> */}
        <div
          className="px-[10%] grid grid-flow-row sm:grid-cols-2 gap-x-8 lg:gap-x-24 gap-y-4 lg:gap-y-12 mt-14 w-full text-center font-semibold text-lg lg:text-2xl"
          aria-label="Dorm categories"
        >
          <div
            className="border border-1 border-white row-span-2 bg-[#1D4229CC] opacity-90 text-white text-left flex items-center px-9 py-6 rounded-2xl shadow-xl hover:cursor-pointer hover:underline"
            onClick={() => navigate("/non-freshman-dorms")}
            aria-describedby="non freshman dorms"
          >
            <ul className="space-y-2">
              <p> I'm a rising...</p>
              <ul aria-describedby="Sophomore">
                <InlineIcon
                  icon="material-symbols:arrow-forward-ios-rounded"
                  className="inline-block h-4 mb-[1px]"
                />
                Sophomore
              </ul>
              <ul aria-describedby="Junior">
                <InlineIcon
                  icon="material-symbols:arrow-forward-ios-rounded"
                  className="inline-block h-4 mb-[1px]"
                />
                Junior
              </ul>
              <ul aria-describedby="Senior">
                <InlineIcon
                  icon="material-symbols:arrow-forward-ios-rounded"
                  className="inline-block h-4 mb-[1px]"
                />
                Senior
              </ul>
            </ul>
          </div>
          <div
            className="border border-1 border-white bg-[#1D4229CC] opacity-90 text-white px-12 py-8 rounded-2xl shadow-xl hover:cursor-pointer hover:underline"
            onClick={() => navigate("/freshman-dorms")}
            aria-label="I'm a rising freshman"
          >
            I'm a rising freshman
          </div>
          <div
            className="border border-1 border-white bg-[#1D4229CC] opacity-90 text-white px-12 py-8 rounded-2xl shadow-xl hover:cursor-pointer hover:underline"
            onClick={() => navigate("/off-campus-housing")}
            aria-label="I'm looking for off-campus housing"
          >
            I'm looking for off-campus housing
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
