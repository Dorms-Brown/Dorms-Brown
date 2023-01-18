import {useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from "../../configs/firebase.config";
import { useEffect, useState } from "react";
import {
  convertDisplayName,
  signInUser,
} from "../../utilities//DormController";
import { InlineIcon } from "@iconify/react";
/**
 * This component is in charge of handling authentication and signing in a user to write a review to the application 
 * @returns OAuth Component
 */
function OAuth() {

  // state variables 
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState<any>(null);
  const auth = getAuth();

  /**
   * function to call whenever user tries to sign in 
   */
  const onGoogleClick = async () => {
    try {
      // if user not logged in 
      if (!currUser) {
        signInUser(auth, db);
        setCurrUser(auth.currentUser);
        navigate("/");
      }
      // if user is logged in
      else {
        navigate("/profile/" + currUser.email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // check the current user state whenever currUser changes 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrUser(user);
      } else {
        setCurrUser(null);
      }
    });
  }, [currUser])

  return (
    <div>
      <button className="font-sans text-xl font-normal inline-flex" onClick={onGoogleClick}>
      <InlineIcon icon="fa-solid:sign-in-alt" height="28" className="mr-3" />
        {currUser
          ? "Hi, " + convertDisplayName(currUser.displayName) + "!"
          : "Sign In"}
      </button>
    </div>
  );
}

export default OAuth;
