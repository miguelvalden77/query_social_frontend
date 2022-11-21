// Hooks
import { ChangeEvent, useState, useContext } from "react"

// Paquetes externos
import {useNavigate, NavLink} from "react-router-dom"

// Services
import {loginUser} from "../../services/auth.services"

// Context
import { AuthContext } from "../../context/auth.context"


const Login = () =>{

    const navigate = useNavigate()
    const {authenticateUser} = useContext(AuthContext)

    const [data, setData] = useState({username: "", password: ""})
    const [error, setError] = useState()

    const handleChange = (e)=> setData({...data, [e.target.name]: e.target.value})
    const handleSubmit = async (e)=>{
        
        e.preventDefault()
        const usuario = {username: data.username, password: data.password}

        try{

            const response = await loginUser(usuario)
            const authToken = response.data.authToken
            localStorage.setItem("authToken", authToken)
            authenticateUser()

            navigate("/profile")

        }catch(err){

            if(err.response.status == 400){
                setError(err.response.data.errorMessage)
            } else{
                console.log(err)
                navigate("/error")
            }

        }

    }
    
    return <div className="flex-center flex-column">
        <main className="auth-card m-auto">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="t-center">Query</h2>
                <div>
                    <input className="input-auth" placeholder="username" onChange={handleChange} value={data.username} name="username" type="text" />
                </div>
                <div>
                    <input className="input-auth" placeholder="password" onChange={handleChange} value={data.password} name="password" type="password" />
                </div>

                <button className="auth-button">Login</button>
                <small className="t-center">¿No tienes cuenta?  <NavLink to={"/signup"}>Signup</NavLink></small>
            </form>
    </main>
                {
                    error && <small className="errorMessage t-center">{error}</small>
                }
    </div>

}

export default Login