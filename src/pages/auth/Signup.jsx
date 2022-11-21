// Hooks
import { useState } from "react"

// Paquetes externos
import { NavLink, useNavigate } from "react-router-dom"

// Services
import { registerUser } from "../../services/auth.services"


const Signup = () =>{

    const navigate = useNavigate()

    const [data, setData] = useState({username: "", password: "", email: ""})
    const [error, setError] = useState()
    
    const handleChange = (e)=> setData({...data, [e.target.name]: e.target.value})

    const handleSubmit = async (e)=>{

        e.preventDefault()
        const user  = {username: data.username, email: data.email, password: data.password}

        try{

            await registerUser(user)
            navigate("/login")

        }
        catch(err){

            if(err.response.status == 400){
                setError(err.response.data.errorMessage)
            }else{
                navigate("/error")
            }
            
        }

    }

    return <main className="flex-center flex-column">
        <section className="auth-card m-auto">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="t-center">Query</h2>
                <div>
                    <input className="input-auth" placeholder="username" onChange={handleChange} value={data.username} name="username" type="text" />
                </div>

                <div>
                    <input className="input-auth" placeholder="email" onChange={handleChange} value={data.email} name="email" type="text" />
                </div>

                <div>
                    <input className="input-auth" placeholder="password" onChange={handleChange} value={data.password} name="password" type="password" />
                </div>

                <button className="auth-button">Sign up!</button>

                <small className="t-center">¿Ya tienes una cuenta? <NavLink to={"/login"}>Login</NavLink></small>
            </form>
        </section>
        {
            error && <small className="errorMessage t-center">{error}</small>
        }
    </main>

}

export default Signup