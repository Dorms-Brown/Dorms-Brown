import { useEffect, useState } from "react";
import { roundToXDecimalPlaces } from "../../utilities/DormController";
import Stats from './Statistics'
import { IStatistics } from '../../utilities/DormController'

/**
 * Props for the Description 
 */
interface DescriptionProps {
    description: string;
    dormid : string,
    dormtype : string,
}

/**
 * Description component that returns the description of a particular dorm 
 * @param description - the description of the dorm 
 * @param dormid - the id of the particular dorm 
 * @param dormtype - the type of the particular dorm
 * @returns - the description component of the dorm 
 */
export default function Description({ description, dormid, dormtype }: DescriptionProps) {
    // initial state variables 
    const [reviewsData, setReviewsData] = useState<IStatistics>({cleanliness: 0, facilities: 0, location: 0})

    // fetch the data from the backend and set to state 
    useEffect(() => {
        fetch('http://localhost:8080/' + dormtype + '/' + dormid + '/statistics')
            .then(response => response.json())
            .then(data => {
                data['cleanliness'] = roundToXDecimalPlaces(data['cleanliness'], 1)
                data['facilities'] = roundToXDecimalPlaces(data['facilities'], 1)
                data['location'] = roundToXDecimalPlaces(data['location'], 1)
                
                setReviewsData(data)
            })
    }, [])

    return (
        <div className="border border-gray-300 rounded-md shadow-md w-full h-full p-4 hover:shadow-lg">
            <div className="whitespace-normal flex-wrap text-center" aria-describedby={description}>
                {description}
                <Stats reviewsData={reviewsData}/>
            </div>
        </div>
    );
}