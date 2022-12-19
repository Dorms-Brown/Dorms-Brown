import { ReactNode, useEffect } from "react";
import DeleteReview from "./DeleteReview";
import { InlineIcon } from "@iconify/react";
import { convertDisplayName } from "../../utilities/DormController";

// props for the reviews 
interface ReviewsProps {
  reviews: Array<Map<string, any>>;
  reviewViewType: string;
}

/**
 * Reviews component that is in charge of outputting all of the relevant reviews for a dorm 
 */
export default function Reviews({ reviews, reviewViewType }: ReviewsProps) {

  // the output when on a particular dorm page 
  const outputReviewsDorm = (): ReactNode => {

    // if no reviews found 
    if (typeof reviews === "undefined" || reviews.length <= 0) {
      return <p>No reviews found</p>;
    }
    return reviews.map((review, index) => {
      let reviewData = new Map(Object.entries(review));
      return (
        <li key={index}>
          <div>
            <p className="font-bold text-xl">
              {convertDisplayName(reviewData.get("name"))}
              <span className=" font-normal text-base text-gray-500 pl-4">
                {reviewData.get("timestamp").split(" ")[0]}
              </span>
            </p>
            <p className="font-semibold text-lg">{reviewData.get("title")}</p>
            <p>{reviewData.get("content")}</p>
            <p className="mt-2 text-sm text-gray-600 space-x-2 inline-flex items-center">
              <p>{`Cleanliness: ${reviewData.get("cleanliness")}`}</p>
              <InlineIcon icon="ci:dot-03-m" />
              <p>{`Facilities: ${reviewData.get("facilities")}`}</p>
              <InlineIcon icon="ci:dot-03-m" />
              <p>{`Location: ${reviewData.get("location")}`}</p>
            </p>
          </div>
        </li>
      );
    });
  };

  // output when on profile page to include link to dorm
  const outputReviewsProfile = (): ReactNode => {

    // if no reviews found 
    if (typeof reviews === "undefined" || reviews.length <= 0) {
      return <p>No reviews found</p>;
    }
    return reviews.map((review, index) => {
      let reviewData = new Map(Object.entries(review));
      const dormLink: string = `/${reviewData.get("dormType")}/${reviewData.get(
        "dormid"
      )}`;
      return (
        <>
          <li key={index}>
              <a href={dormLink}>
                <div>
                  <p className="font-bold text-xl">
                    {convertDisplayName(reviewData.get("name"))}
                    <span className=" font-normal text-base text-gray-400 pl-4">
                      {reviewData.get("timestamp").split(" ")[0]}
                    </span>
                  </p>
                  <p className="font-semibold text-lg">
                    {reviewData.get("title")}
                  </p>
                  <p>{reviewData.get("content")}</p>
                  <p className="mt-2 text-sm text-gray-600 space-x-2 inline-flex items-center">
                    <p>{`Cleanliness: ${reviewData.get("cleanliness")}`}</p>
                    <InlineIcon icon="ci:dot-03-m" />
                    <p>{`Facilities: ${reviewData.get("facilities")}`}</p>
                    <InlineIcon icon="ci:dot-03-m" />
                    <p>{`Location: ${reviewData.get("location")}`}</p>
                  </p>
                </div>
              </a>
            <DeleteReview
              reviewData={reviewData}
              index={index}
            />
          </li>
        </>
      );
    });
  };

  // update whenever reviews updates 
  useEffect(() => {}, [reviews]);

  return (
    <div>
      <p className="text-[#6E4D35] my-6 text-2xl font-semibold">
        {reviewViewType === "dorm" ? "Reviews" : "My Reviews"}
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-24">
        {/* if review type is dorm, then don't include link, if it's profile, then navigate to link */}
        {reviewViewType === "dorm"
          ? outputReviewsDorm()
          : outputReviewsProfile()}
      </ul>
    </div>
  );
}
