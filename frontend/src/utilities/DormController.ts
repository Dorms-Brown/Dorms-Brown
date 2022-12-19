import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  doc,
  Firestore,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

/**
 * function that converts an Object to an array of arrays
 * @param data - the input Object
 * @returns - newData in an array of arrays
 */
export const convertObjectToArrayOfArray = (data: Object) => {
  // store data in array where each index is [key, value]
  let newData = Object.entries(data);
  // sort the data in alphabetical order
  newData.map((data) => {
    if (String(data[1]) === "true") {
      data[1] = "Yes"
    }
    else if (String(data[1]) === "false") {
      data[1] = "No"
    }
  })
  
  newData.sort(function (a, b) {
    return a[0].localeCompare(b[0]);
  });
  return newData;
};

/**
 * function that displays a person's username in the top right hand corner
 * @param name - the name to be converted
 * @returns - the converted name
 */
export const convertDisplayName = (name: string) => {
  const result = name.trim().split(/\s+/);
  if (result.length === 0) {
    return name;
  } else {
    // return everthing except for last index position
    return result.slice(0, -1).join(" ");
  }
};

/**
 * function that gets the average stars inside of the data
 * @param data - the input data
 * @returns - the average number of stars
 */
export const getAverageStars = (data: Map<string, number>) => {
  let total = 0;
  Array.from(data).map((category) => (total += category[1]));

  // compute the average
  const average = total / data.size;
  return roundToXDecimalPlaces(average, 1);
};

/**
 * helper function that rounds a number to a certain number of places
 * @param n - the number to be rounded
 * @param places - the number of places to round the number
 * @returns - the rounded number
 */
export const roundToXDecimalPlaces = (n: number, places: number) => {
  return Math.round(n * (10 * places)) / (10 * places);
};

/**
 * controller that helps sign in a user to the database
 * @param auth - the firebase authentication
 * @param db - the firestore database
 */
export const signInUser = async (auth: Auth, db: Firestore) => {
  const provider = new GoogleAuthProvider().setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // check for brown email
    const domain = user.email?.split("@")[1];
    if (domain !== 'brown.edu') {
      console.error("not a brown email");
      await signOut(auth)
      alert("Please login with @brown.edu email");
    }
    else {
          
      // check for user
      const docRef = doc(db, "users", user.email!);
      const docSnap = await getDoc(docRef);
      // if user doesn't exist, then add user to the database
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.email!), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
          reviews: []
        });
    }
    }

  } catch (e) {
    console.error(e)
  }
};

/**
 * helper function that gets the current date in MM/DD/2022 format
 */
export const getCurrentDate = () => {
  return String(
    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
  );
};

// interface for particular object keys 
interface IObjectKeys {
  [key: string]: string | number;
}

/**
 * props interface for statistics 
 */
export interface IStatistics extends IObjectKeys {
  cleanliness: number;
  facilities: number;
  location: number;
}
