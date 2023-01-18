import { useState } from "react";
import { User } from "firebase/auth";
import { getCurrentDate } from '../../utilities/DormController'
import Stars from "./Stars";

// props for the Review Modal 
interface AddReviewProps {
  dormType: string;
  dormid: string;
  currUser: User;
}

/**
 * Review Modal component that is in charge of adding a review to a dorm 
 */
export default function ReviewModal({
  dormType,
  dormid,
  currUser,
}: AddReviewProps) {

  // initiate state variables 
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [facilities, setFacilities] = useState("");
  const [location, setLocation] = useState("");

  /**
   * Validates the review to check if all fields are filled 
   * @returns - true if all fields are filled, false otherwise 
   */
  const validateReview = () => {
    if (!title) {
      alert('please add a title!')
      return false
    }
    else if (!content) {
      alert('please add content!')
      return false
    } 
    else if (!cleanliness || !facilities || !location) {
      alert('please fill in all star ratings!')
      return false
    }

    return true
  }

  // adds review to specific dorm database
  const addReviewToDorm = async () => {
    const name = currUser.displayName
    const user = currUser.email
    const timestamp = getCurrentDate()
    const review = JSON.stringify({ user, name, title, content, cleanliness, facilities, location, timestamp, dormType, dormid })

    // backend call to add review to dorm
    fetch('http://localhost:8080/' + dormType + '/' + dormid + '/dorm-review', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: review
    })
  }

  // adds review to specific user database
  const addReviewToUser = async () => {
    const name = currUser.displayName
    const user = currUser.email
    const timestamp = getCurrentDate()
    const review = JSON.stringify({ user, name, title, content, cleanliness, facilities, location, timestamp, dormType, dormid })
    fetch('http://localhost:8080/' + dormType + '/' + dormid + '/user-review', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: review
    })
  }

  return (
    <>
      <button
        className="bg-[#6E4D35] absolute -top-2 right-0 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
        aria-labelledby="Add a Review"
      >
        Add a Review
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-4/5 lg:w-3/5 my-6 mx-16">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div
                  className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"
                  aria-describedby="Add a review"
                >
                  <h3
                    className="text-3xl font-semibold"
                    aria-describedby="Add a Review!"
                  >
                    Add a Review:
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 space-y-2 grid grid-cols-1 md:grid-cols-[70%_30%] gap-x-4 text-lg">
                  <div className="space-y-4">
                    <div>
                      Title:
                      <input
                        className="border border-1 rounded-md w-full mt-2 focus:outline-none py-2 px-3 text-base" 
                        value={title}
                        placeholder="Write your title here..."
                        onChange={(e) => setTitle(e.target.value)}
                        aria-describedby="Enter a title for your review"
                      />
                    </div>
                    <div>
                      Content:
                      <textarea
                        className="border border-1 rounded-md w-full h-48 mt-2 focus:outline-none py-2 px-3 resize-none text-base"
                        value={content}
                        placeholder="Write your review here..."
                        onChange={(e) => setContent(e.target.value)}
                        aria-describedby="Enter the content of your review"
                      />
                    </div>
                  </div>
                  <div className="text-2xl space-y-6 self-center justify-self-center">
                    <div>
                      Cleanliness:
                      <div className="inline-flex ml-2 md:block md:ml-0" aria-describedby="Enter a cleanliness rating">
                        <Stars setState={setCleanliness} />
                      </div>
                    </div>
                    <div>
                      Facilities:
                      <div className="inline-flex ml-2 md:block md:ml-0" aria-describedby="Enter a facilities rating">
                        <Stars setState={setFacilities} />
                      </div>
                    </div>
                    <div>
                      Location:
                      <div className="inline-flex ml-2 md:block md:ml-0" aria-describedby="Enter a location rating">
                        <Stars setState={setLocation} />
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:underline "
                    type="button"
                    onClick={() => setShowModal(false)}
                    aria-labelledby="Close"
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:underline outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      if (validateReview()) {
                        addReviewToDorm()
                        addReviewToUser()
                        setShowModal(false)
                        window.location.reload()
                      }
                    }}
                    aria-labelledby="Submit review"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
