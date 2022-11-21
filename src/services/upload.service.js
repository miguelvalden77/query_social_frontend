// Service
import service from "./config.service"

const upload = (img)=>{
    return service.post("/uploader", img)
}

export {upload}