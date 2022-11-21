import service from "./config.service";

const likePost = (id, userId)=>{
    return service.post(`/post/likes/${id}/${userId}`)
}

const likesArr = (id)=>{
    return service.get(`/auth/likesArr/${id}`)
}

export {likePost, likesArr}