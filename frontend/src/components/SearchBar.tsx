import { InlineIcon } from "@iconify/react";

// Search bar functionality to allow a user to search for a dorm 
export default function SearchBar() {

  return (
    <div
      className="px-4 rounded-2xl relative mx-auto text-gray-600 w-4/5"
      aria-labelledby="Search Bar"
    >
      <input
        className="bg-white active:bg-white w-full h-14 placeholder-[#ADADAD] px-4 rounded-2xl border-2 border-[#ADADAD] focus:outline-none focus:border-[#488358] focus:ring-[#488358]"
        type="text"
        name="search"
        autoComplete="off"
        placeholder="Search for a dorm by name"
      />
      <button type="submit" className="absolute right-9 top-3.5">
        <InlineIcon
          icon="material-symbols:search"
          color="#ADADAD"
          height="28"
        />
      </button>
    </div>
  );
}
