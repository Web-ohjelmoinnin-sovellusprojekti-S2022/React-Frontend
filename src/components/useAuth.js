import { useEffect } from "react"
import { useState } from "react"
import setAuthToken from "./setAuthToken"


// Funktio, joka tarkistaa että löytyykö tokenia.
const useAuth = () => {
    const [auth, setAuth] = useState(null)

    const isAuth = async() => {
        if(setAuthToken(localStorage.getItem("token")) === true){
            setAuth(true)
        }
        else {
            setAuth(false)
        }
    }
    useEffect(() => {
        isAuth()
    }, [auth])
    
    return auth
}

export default useAuth