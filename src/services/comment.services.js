// Service
import service from "./config.service";


const createComment = (comment)=>{
    return service.post("/comment/create", comment)
}

const deleteComment = (id)=>{
    return service.post(`/comment/delete/${id}`)
}

const updateAComment = (id, description)=>{
    return service.post(`/comment/update/${id}`, description)
}


export {createComment, deleteComment, updateAComment}