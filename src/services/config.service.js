// Paquetes externos
import axios from "axios"


const service = axios.create({baseURL: "https://query-app-social.herokuapp.com/api/"})

service.interceptors.request.use((config)=>{

    const token = localStorage.getItem("authToken")

    if(token){
        config.headers = {
            authorization: `Bearer ${token}`
        }
    }

    return config

})

export default service