import { useEffect, useState } from "react";

/**
 * Filter component with room type and amenity filter options as well as options for ranking
 * @param dorms - the dorms displayed on the page
 * @returns a filter component
 */
export default function Filter({allDorms, setDorms}: 
    {allDorms: Array<any>, setDorms: React.Dispatch<React.SetStateAction<any[]>>}) {
    /**
   * auto = everything, no filter
   * button click triggers a filtering so that setDorms sets only seelcted dorms
   * Dorm filtering: in firebase, only include field that the dorm HAS (for ex, Andrews has all dorm types except suites field)
   * Then, when an option is selected, include all dorms that have EITHER of the dorm types in firebase (or) // ALL of the amenities (and)
   */
  const [singleSelected, setSingle] = useState<Boolean>(false);
  const [doubleSelected, setDouble] = useState<Boolean>(false);
  const [tripleSelected, setTriple] = useState<Boolean>(false);
  const [suiteSelected, setSuite] = useState<Boolean>(false);
  const [elevatorSelected, setElevator] = useState<Boolean>(false);
  const [bathSelected, setBath] = useState<Boolean>(false);
  const [programSelected, setProgram] = useState<Boolean>(false);
  const [rankOption, setRankOption] = useState<string>("");

  // ranks the dorms on certain categories 
  const rankDorms = () => {
    if (rankOption != 'overall') {
      allDorms.sort((dorm1, dorm2) => {
        return dorm2.data.statistics[rankOption] - dorm1.data.statistics[rankOption]
      })
    }
    else {
      allDorms.sort((dorm1, dorm2) => {
        let avg1 = 0
        let avg2 = 0

        for (let key in dorm1.data.statistics) {
          avg1 += dorm1.data.statistics[key]
          avg2 += dorm2.data.statistics[key]
        }
        console.log(avg2 - avg1)
        return avg2 - avg1
      })
    }
  }

  // peforms filter on dorms 
  const performFilter = () => { 
    // defensive copy 
    const dormsCopy = allDorms.slice()

    setDorms(() => dormsCopy.filter(dorm => checkDorm(dorm)))
  }

  // perform new filter on state change 
  useEffect(() => {
    rankDorms()
    performFilter()
  }, [singleSelected, doubleSelected, tripleSelected, suiteSelected, elevatorSelected, bathSelected, programSelected, rankOption])

  // return boolean on whether this dorm should be in the selection
  const checkDorm = (dorm: any) => {
    let roomsMatch: boolean = false
    let amenitiesMatch: boolean = false

    if ((singleSelected && dorm.data.amenities["Singles"]) || // if any true selection matches
    (doubleSelected && dorm.data.amenities["Doubles"]) ||
    (tripleSelected && dorm.data.amenities["Triples"]) ||
    (suiteSelected && dorm.data.amenities["Suites"]) ||
    ((!singleSelected && !doubleSelected) && (!tripleSelected && !suiteSelected))) {
  roomsMatch = true
}
    // room selection passed -> now check dorm meets ALL checked amenities
    if ((elevatorSelected && dorm.data.amenities["Elevators"] || (!elevatorSelected)) && // if ALL true selection matches (or not selected)
        (bathSelected && responseToBool(dorm.data.amenities["Non-communal"]) || (!bathSelected)) && //TODO: how do we want to handle bathromo (i say take it out)
        (programSelected && dorm.data.amenities["Program Housing"]|| (!programSelected))) {
      amenitiesMatch = true
    }
    return roomsMatch && amenitiesMatch
  }

  // return true if the response is "True" and false otherwise
  const responseToBool = (response: string | undefined) => {
    return response == "Yes"
  }

  return (
    <div className="space-y-6 lg:space-y-10" aria-labelledby="Filter box">
      <div className="pt-4 pb-8 px-4 bg-[#D6D7D6] border border-1 border-gray-900 rounded-xl text-[#5F5F5F]">
        <div>
          <p className="font-semibold text-2xl text-center pb-3">Show Only</p>
          <div>
            <p
              className="font-medium text-lg"
              aria-describedby="Filter by room type"
            >
              Room type
            </p>

            <div className="flex flex-col">
              <label
                className="inline-flex items-center mt-3"
                aria-label="Singles"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 hover:cursor-pointer"
                  onClick={() => setSingle(!singleSelected)}

                />
                <span className="ml-2">Singles</span>
              </label>

              <label
                className="inline-flex items-center mt-3"
                aria-label="Doubles"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 hover:cursor-pointer"
                  onClick={() => setDouble(!(doubleSelected))}
                />
                <span className="ml-2">Doubles</span>
              </label>

              <label
                className="inline-flex items-center mt-3"
                aria-label="Triples"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 hover:cursor-pointer"
                  onClick={() => setTriple(!(tripleSelected))}
                />
                <span className="ml-2">Triples</span>
              </label>

              <label
                className="inline-flex items-center mt-3"
                aria-label="Suites"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 hover:cursor-pointer"
                  onClick={() => setSuite(!(suiteSelected))}
                />
                <span className="ml-2">Suites</span>
              </label>
            </div>
          </div>

          <div>
            <p className="font-medium text-lg pt-5">Filter</p>

            <div
              className="flex flex-col"
              aria-describedby="Filter by amenities"
            >
              <label
                className="inline-flex items-center mt-3"
                aria-label="Elevators"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 hover:cursor-pointer"
                  onClick={() => setElevator(!(elevatorSelected))}
                />
                <span className="ml-2">Elevators</span>
              </label>

              <label
                className="inline-flex items-center mt-3"
                aria-label="Semi-private bathrooms"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 flex-shrink-0 hover:cursor-pointer"
                  onClick={() => setBath(!(bathSelected))}
                />
                <span className="ml-2">Semi-private bathrooms</span>
              </label>

              <label
                className="inline-flex items-center mt-3"
                aria-label="Non program housing"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 flex-shrink-0 hover:cursor-pointer"
                  onClick={() => setProgram(!(programSelected))}
                />
                <span className="ml-2">Program housing</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 pb-8 px-4 bg-[#D6D7D6] border border-1 border-gray-900 rounded-xl text-[#5F5F5F]">
        <p
          className="font-semibold text-2xl text-center"
          aria-describedby="Rank dorms by"
        >
          Rank by
        </p>
        <form className="flex flex-col">
          <label
            className="inline-flex items-center mt-3"
            aria-labelledby="Overall rating"
          >
            <input
              type="radio"
              id="overall"
              value="overall"
              name="rank_by"
              className="h-5 w-5 hover:cursor-pointer"
              onClick={() => setRankOption('overall')}
            />
            <span className="ml-2">Overall</span>
          </label>
          <label
            className="inline-flex items-center mt-3"
            aria-labelledby="Location"
          >
            <input
              type="radio"
              id="location"
              value="location"
              name="rank_by"
              className="h-5 w-5 hover:cursor-pointer"
              onClick={() => setRankOption('location')}
            />
            <span className="ml-2">Location</span>
          </label>
          <label
            className="inline-flex items-center mt-3"
            aria-labelledby="Cleanliness"
          >
            <input
              type="radio"
              id="cleaniness"
              value="cleanliness"
              name="rank_by"
              className="h-5 w-5 hover:cursor-pointer"
              onClick={() => setRankOption('cleanliness')}
            />
            <span className="ml-2">Cleanliness</span>
          </label>
          <label
            className="inline-flex items-center mt-3"
            aria-labelledby="Facilities"
          >
            <input
              type="radio"
              id="facilities"
              value="facilities"
              name="rank_by"
              className="h-5 w-5 hover:cursor-pointer"
              onClick={() => setRankOption('facilities')}
            />
            <span className="ml-2">Facilities</span>
          </label>
        </form>
      </div>
    </div>
  );
}
