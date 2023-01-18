import {
  getAverageStars,
  roundToXDecimalPlaces,
} from "../../utilities/DormController";
import { InlineIcon } from "@iconify/react";
import { useEffect, useState } from "react";

/**
 * Interface that states the prop types for the Overview component
 */
interface OverviewProps {
  address: string;
  name: string;
  url: string;
  reviews: Array<Map<string, any>>;
  // rating: number;
}

/**
 * Overview component that is in charge of the basic data 
 */
export default function Overview({
  address,
  name,
  url,
  reviews,
}: OverviewProps) {

  // initiate state variables 
  const [cleanliness, setCleanliness] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [location, setLocation] = useState(0);
  const [reviewsData, setReviewsData] = useState(new Map());

  // update the new overview data 
  useEffect(() => {
    const newReviewsData = new Map();
    if (reviews && reviews.length > 0) {
      for (let i = 0; i < reviews.length; i++) {
        let reviewData = new Map(Object.entries(reviews[i]));
        setCleanliness(
          (prevCleanliness) =>
            prevCleanliness + reviewData.get("cleanliness") * 1
        );
        setFacilities(
          (prevFacilities) => prevFacilities + reviewData.get("facilities") * 1
        );
        setLocation(
          (prevLocation) => prevLocation + reviewData.get("location") * 1
        );
      }
      newReviewsData.set(
        "cleanliness",
        roundToXDecimalPlaces(cleanliness / reviews.length, 1)
      );
      newReviewsData.set(
        "facilities",
        roundToXDecimalPlaces(facilities / reviews.length, 1)
      );
      newReviewsData.set(
        "location",
        roundToXDecimalPlaces(location / reviews.length, 1)
      );
      setReviewsData(newReviewsData);
    }
  }, [reviews]);

  return (
    <div className="text-center">
      <p className="text-4xl font-semibold">{name}</p>
      <div className="my-2 inline-flex items-center gap-x-4">
        <div aria-labelledby="Overall rating">
          <InlineIcon icon="typcn:star" className="inline-block mr-1" />
          {reviews.length === 0 ? 0.0 : getAverageStars(reviewsData)} 
        </div>

        <InlineIcon icon="ci:dot-03-m" color="#6E4D35" />

        <p aria-labelledby="Address">{address}</p>

        <InlineIcon icon="ci:dot-03-m" color="#6E4D35" />

        <a
          aria-describedby="Go to map"
          href={`https://www.brown.edu/Facilities/Facilities_Management/maps/#building/${url}/PICTURES`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="border border-1 p-1 pr-2 hover:bg-gray-200 hover:border-gray-400">
            <InlineIcon
              icon="mdi:map-marker-outline"
              className="inline-block mr-1"
            />
            Map
          </button>
        </a>
      </div>
    </div>
  );
}
