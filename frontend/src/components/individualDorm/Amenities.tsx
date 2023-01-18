import { convertObjectToArrayOfArray } from "../../utilities/DormController";

// props for Amenities
interface AmenitiesProps {
  amenities: Map<string, string>;
}

/**
 * Amenities component that returns the amenities of a particular dorm 
 */
export default function Amenities({ amenities }: AmenitiesProps) {
  // store amenities in array where each index is [key, value]
  const amenitiesData = convertObjectToArrayOfArray(amenities);

  return (
    <div>
      <p className="text-[#6E4D35] text-2xl font-semibold mb-2">Amenities</p>
      <ul className="list-disc pl-3 grid md:grid-cols-2 gap-x-4 text-lg">
        {amenitiesData.map((amenity) => (
          <li key={amenity[0]}>
            <b>{amenity[0]}:</b> {amenity[1]}
          </li>
        ))}
      </ul>
    </div>
  );
}
