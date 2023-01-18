import { InlineIcon } from "@iconify/react";
import { IStatistics } from '../../utilities/DormController'

/**
 * Statistics component that keeps track of the cleanliness, facilities, and location stars
 * @param reviewsData - the review data 
 * @returns - the statistics component
 */
export default function Stats({reviewsData}: {reviewsData: IStatistics}) {
    /**
     * helper function that deconstructs the statistics object
     * @param category - the specific category
     * @param index - the index of the category  
     * @returns a new statistics object
     */
    const StatsObject = ({category, index}: {category: string, index: number}) => {
        let value: number | string = 0;

        if (category in reviewsData) {
            value = reviewsData[category]
        }

        return (
            <li key={index}>
                <div className="bg-white p-2 rounded-md text-center shadow hover:shadow-md w-full my-2 border">
                    <div className="text-center">
                        <h3 className="text-sm font-medium text-[#6E4D35]">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h3>
                        <p className="text-xl font-bold text-black">
                            <InlineIcon
                                icon="typcn:star"
                                className="inline-block -ml-1"
                                color="#6E4D35"
                            />
                            {value}/5
                        </p>
                    </div>
                </div>
            </li>
        )
    }

    return (
        <div className="w-full grid grid-flow-col"
            aria-describedby="Cateogry ratings"
        >
            <ul className="w-full grid grid-flow-col md:grid-flow-row lg:grid-flow-col gap-x-4 mt-2">
                <StatsObject category={'cleanliness'} index={1}/>
                <StatsObject category={'facilities'} index={2}/>
                <StatsObject category={'location'} index={3}/>
            </ul>
        </div>
    );
}