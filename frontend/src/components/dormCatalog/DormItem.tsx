import { useNavigate } from "react-router-dom"
import { InlineIcon } from "@iconify/react"

/**
 * Interface that states the prop types for the Dorm Item component
 */
interface DormItemProps {
  dorm: any;
  id: string;
  type: string;
}

/**
 * Dorm Item component that outputs all of the data
 * @param dorm - the dorm data information
 * @param id - the id of the particular dorm
 * @param type - type of dorm
 * @returns - a li Dorm Item component
 *
 * TODO: Get image URLs to replace the mock-dorm-icon
 */
function DormItem({ dorm, id, type }: DormItemProps) {
  const navigate = useNavigate()

  /**
   * @returns JSX element for the image of the dorm catalog item
   */
  const renderImage = () => {
    if (dorm.displayImage) {
      return (
        <img
          src={dorm.displayImage}
          alt="display"
          className="h-full w-full object-cover rounded-lg"/>)
    }
    else {
      return (
        <div 
          className="h-full w-full py-28 bg-gray-100 items-center justify-center inline-flex box-border rounded-lg">
          No image found
        </div>)
    }
  }

  return (
    <div
      className="hover:cursor-pointer font-normal p-6 text-gray-500 text-left dark:text-black"
      onClick={() => navigate(`/${type}/${id}`)}
    >
      <p className="font-bold md:text-xl whitespace-nowrap" aria-describedby={dorm.name}>
        {dorm.name}
      </p>
      <div className="h-64 w-72 inline-flex py-1">
        {renderImage()}
      </div>

      <div className="items-center">
        <InlineIcon
          icon="mdi:map-marker"
          height="16"
          className="inline-block"
        />
        <span className="font-medium md:text-lg ml-1"
        aria-describedby={`Address is ${dorm.address}`}>{dorm.address}</span>
      </div>

    </div>
  );
}

export default DormItem;
