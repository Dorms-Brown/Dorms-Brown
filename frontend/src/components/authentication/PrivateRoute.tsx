import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../../hooks/useAuthStatus'
/**
 * Private Route component that makes the route to a profile private if a user is not signed in 
 * @returns Private Route component 
 */
const PrivateRoute = () => {

    // deconstruct loggedIn and checkingStatus from useAuthStatus() hook
    const {loggedIn, checkingStatus} = useAuthStatus()
    
    // check if checkingStatus 
    if (checkingStatus) {
        return <h3>Loading...</h3>
    }
    return loggedIn ? <Outlet/> : <Navigate to='/'/>
}

export default PrivateRoute
