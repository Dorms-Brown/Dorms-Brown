import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Gallery from "./Gallery";
import Amenities from "./Amenities";
import Description from "./Description";
import Overview from "./Overview";
import Reviews from "../reviews/Reviews";
import ReviewModal from "../reviews/ReviewModal";
import Navbar from "../Navbar";

/**
 * Dorm component for one particular dorm 
 * @returns - the Dorm component 
 */
export default function Dorm() {

  // initiate state variables 
  const auth = getAuth();
  const params = useParams();
  const [dormData, setDormData] = useState<any>({}); // need to set type on this
  const [dormid, setDormid] = useState<any>("");
  const [dormType, setDormType] = useState<string>("");
  const [currUser, setCurrUser] = useState(null);

  // check if a user is signed in or not 
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setCurrUser(user);
      } else {
        setCurrUser(null);
      }
    });

    // fetch the particular dorm from the backend 
    fetch("http://localhost:8080/" + params.dormtype + "/" + params.dormid)
      .then((response) => response.json())
      .then((data) => {
        setDormType(params.dormtype!);
        setDormData(data.data);
        setDormid(data.id);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="px-[8%] py-24 text-left"
        aria-describedby={`Dorm Name: ${dormData.name}`}
      >
        <Overview
          address={dormData.address ? dormData.address : "No Address Found"}
          name={dormData.name ? dormData.name : "No Name Found"}
          url={dormData.url ? dormData.url : "No Map Found"}
          reviews={dormData.reviews ? dormData.reviews : []}
        />
        <div aria-label="Gallery Images">
          <Gallery
            displayImage={
              dormData.displayImage ? dormData.displayImage : "No Image Found"
            }
          />
        </div>

        <div
          className="grid grid-flow-row md:grid-flow-col md:grid-cols-[60%_38%] gap-4 my-12 py-12 border-y border-y-1"
          aria-describedby={dormData.description}
        >
          <Amenities
            amenities={
              dormData.amenities
                ? dormData.amenities
                : new Map<string, string>()
            }
          />
          <div aria-describedby={dormData.description}>
            <Description
              description={
                dormData.description
                  ? dormData.description
                  : "No description found for dorm."
              }
              dormtype={params.dormtype!}
              dormid={params.dormid!}
            />
          </div>
        </div>
        <div className="relative">
          <Reviews
            reviews={dormData.reviews ? dormData.reviews : []}
            reviewViewType={"dorm"}
          />
          {currUser ? (
            <ReviewModal
              dormType={dormType}
              dormid={dormid}
              currUser={currUser!}
            />
          ) : (
            <div className="mt-12 text-[#6E4D35] text-center font-semibold text-base underline underline-offset-2">
              Sign in to leave a review!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
