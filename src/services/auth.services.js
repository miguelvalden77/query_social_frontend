// Service
import service from "./config.service";


const registerUser = (newUser)=>{
    return service.post("/auth/signup", newUser)
}

const loginUser = (user)=>{
    return service.post("/auth/login", user)
}

const verifyService = ()=>{
    return service.get("/auth/verify")
}

export {registerUser, loginUser, verifyService}