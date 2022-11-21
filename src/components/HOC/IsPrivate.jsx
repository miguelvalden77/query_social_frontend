// Hooks
import { useContext } from "react" 

// Context
import { AuthContext } from "../../context/auth.context"

// Paquetes externos
import { Navigate } from "react-router-dom"

// interface props {
//     children: JSX.Element | null | undefined
// }



const isPrivate =({children}) =>{

    const {isUserActive} = useContext(AuthContext)

    if(isUserActive === true){
        return children
    } else{
        return <Navigate to={"/login"}/>
    }


}

export default isPrivate