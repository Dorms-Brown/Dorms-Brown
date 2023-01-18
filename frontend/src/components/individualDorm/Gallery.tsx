/**
 * Interface that states the prop types for the Gallery component
 */
interface GalleryProps {
  displayImage: string;
}

// const photos = [
//   "https://www.brown.edu/facilities/sites/facilities/files/styles/flexslider_full/public/2_2.jpg?itok=LzludguW",
//   "https://www.brown.edu/facilities/sites/facilities/files/styles/flexslider_full/public/9-big_0.jpg?itok=Ct6qgGPk",
//   "https://www.brown.edu/facilities/sites/facilities/files/styles/flexslider_full/public/3-big_0.jpg?itok=oIHxh6GG",
//   "https://www.cbtarchitects.com/sites/default/files/styles/project_gallery_medium_648_/public/2016-05/03_CBT_Brown_University_Residence_Hall_Renovations.jpg?itok=viI4clPq",
// ];

/**
 * Gallery Component 
 */
export default function Gallery({ displayImage }: GalleryProps) {
  return (
    // <div className="my-8 grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 gap-4">
    <div className="flex justify-center my-8 ">
      <div id="display" className="h-[28rem] w-[46rem]">
        {displayImage === "No Image Found" && (
          <div className="h-full w-full bg-gray-100 items-center justify-center inline-flex box-border">
            No image found
          </div>
        )}
        {!(displayImage === "No Image Found") && (
          <img
            src={displayImage}
            alt="display"
            className="h-full w-full object-cover"
          ></img>
        )}
      </div>
      {/* <div id="gallery" className="relative" >
        <ul className="grid grid-cols-2 grid-rows-2 gap-3 h-[26rem]">
          {photos.slice(0, 4).map((photo) => (
            <li key={photo} aria-describedby="Gallery Image">
              <img
                src={photo}
                alt={photo}
                className="h-full w-full object-cover"
              ></img>
            </li>
          ))}
        </ul>
        <button className="absolute right-2 bottom-2 z-10 border border-1 rounded-md bg-white hover:bg-gray-200 p-1 text-sm font-medium">
          Show more photos
        </button>
      </div> */}
    </div>
  );
}
