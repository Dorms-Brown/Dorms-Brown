import { InlineIcon } from "@iconify/react";
import OAuth from "./authentication/OAuth";

/**
 * Navbar component at the top of the screen that also contains the "Sign In" button that is in charge of authentication 
 */
export default function Navbar() {
  return (
    <div className="absolute inset-y-0 h-12 bg-[#1D4229CC] w-screen text-white" aria-labelledby="Navigation bar">
      <a href="/" className="py-2.5 inline-flex">
        <InlineIcon icon="mdi:house" height="28" className="ml-7 mr-3" />
        <p className="font-extrabold font-sans text-xl">
          DORMS @ BROWN
        </p>
      </a>
        <div className='absolute right-10 top-2.5'>
        <OAuth/>
        </div>

    </div>
  )
}