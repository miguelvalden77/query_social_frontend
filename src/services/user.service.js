// Service
import service from "./config.service";

const changePersonalDescription = (personalInfo, userId)=>{
    return service.post(`/user/userDescription/${userId}`, personalInfo)
}

const getPersonalDescription = (userId)=>{
    return service.get(`/user/personalDescription/${userId}`)
}

export {changePersonalDescription, getPersonalDescription}