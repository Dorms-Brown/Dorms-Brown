import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dorms from "./components/dormCatalog/Dorms";
import './App.css';
import Dorm from "./components/individualDorm/Dorm";
import Main from "./components/main/Main";
import Profile from "./components/Profile";
import PrivateRoute from "../src/components/authentication/PrivateRoute"

/**
 * App component that is in charge of handling all of the Routes and Private Routes inside of our application 
 */
function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/:dormtype' element={<Dorms/>}/>
                <Route path='/:dormtype/:dormid' element={<Dorm/>}/>
                <Route path='/profile/:userid' element={<PrivateRoute/>}>
                    <Route path='/profile/:userid' element={<Profile/>}/>
                </Route>
            </Routes>
        </Router> 
    </> 
  )
}

export default App;
