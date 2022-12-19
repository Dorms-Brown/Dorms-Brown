import { useEffect, useState, useRef } from "react"
import { getAuth, onAuthStateChanged } from "@firebase/auth"
/**
 * Custom hook that checks to see if a user is authenticated or not 
 */
export const useAuthStatus = () => {

    // initiate state variables 
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const isMounted = useRef(true)

    // checks to see if mounted or not 
    useEffect(() => {
        if (isMounted) {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoggedIn(true)
                }
                setCheckingStatus(false)
            })
        }
        return () => {
            isMounted.current = false
        }

    }, [isMounted])
    return {loggedIn, checkingStatus}
}
