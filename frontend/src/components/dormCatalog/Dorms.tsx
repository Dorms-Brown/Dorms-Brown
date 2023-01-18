import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar"
import DormItem from "./DormItem"
import Filter from "../FilterBox"

/**
 * Component for our 
 * @returns 
 */
function Dorms() {

  // state variables
  const [dorms, setDorms] = useState<Array<any>>([]); //pass into filterbox
  const [allDorms, setAllDorms] = useState<Array<any>>([]);
  const params = useParams()

  /**
   * - function that retrieves all of the dorms inside of our "dorms" collection in firebase
   * - this is only run once because the dependency array is empty
   */
  useEffect(() => {
    fetch('http://localhost:8080/' + params.dormtype)
      .then(response => response.json())
      .then(data => { setAllDorms(data.slice()); setDorms(data) })         
  }, []);


  return (
    <div className="w-screen">
      <Navbar />
      <div className="my-28">


        <div className="px-[3%] justify-center grid grid-flow-row lg:grid-flow-col lg:grid-cols-4 gap-x-20">
          <div className="mt-1 py-4 lg:py-8 lg:col-span-1">
            <Filter
              allDorms={allDorms}
              setDorms={setDorms}
            />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3 lg:order-first">
            { dorms.map((dorm) => (
              <li key={dorm.id}>
                <DormItem
                  dorm={dorm.data}
                  id={dorm.id}
                  type={dorm.type}
                />
              </li>
            )) }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dorms;
