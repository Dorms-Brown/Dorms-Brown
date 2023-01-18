import { getAuth } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../configs/firebase.config";
import { doc, getDoc } from "@firebase/firestore";
import Reviews from "./reviews/Reviews";

/**
 * Profile component that is charge of loading a profile whenever a user is signed in 
 */
function Profile() {

  // initiate state variables 
  const [user, setUser] = useState<any>(null);
  const [reviews, setReviews] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();

  // gets the reviews of the current user
  const getReviews = async () => {

    // if user is found 
    if (user) {
      const email = user.email
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReviews(docSnap.data().reviews);
      } else {
        console.log("No such document!");
      }
    } else {
        setUser(auth.currentUser);

      console.log("User not found");
    }
  };

  // update the reviews of a user 
  useEffect(() => {
    getReviews();
  }, [user, auth.currentUser]);

  // pressing the logout button
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <div className="py-12 px-12">
      <p className="font-semibold text-4xl">
        {user ? "Hi, " + user.displayName + "!" : "Not Logged In"}
      </p>
      <p className="font-medium text-3xl">
        {user ? "Email: " + user.email : "No Email found"}
      </p>
      <Reviews reviews={reviews} reviewViewType={"profile"} />
      <button type="button" onClick={onLogout} className="mt-12 border p-3 rounded-md font-semibold hover:bg-gray-200 hover:border-gray-400">
        Logout
      </button>
    </div>
  );
}

export default Profile;
