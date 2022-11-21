// Hooks
import {createContext, useEffect, useState} from "react"
import { verifyService } from "../services/auth.services"


const AuthContext = createContext()


function AuthWrapper({children}){

    const [isUserActive, setIsUserActive] = useState()
    const [usuario, setUsuario] = useState()

    useEffect(()=>{
        authenticateUser()
    },[])

    const authenticateUser = async () =>{

        try{
            
            const response = await verifyService()
            console.log("Contexto")
            setIsUserActive(true)
            setUsuario(response.data)

        }
        catch(err){

            console.log(err)
            setIsUserActive(false)
            setUsuario(null)

        }

    }

    const passedContext = {usuario, isUserActive, authenticateUser, setIsUserActive, setUsuario}

    return <AuthContext.Provider value={passedContext}>
        {children}
    </AuthContext.Provider>
}


export {AuthContext, AuthWrapper}