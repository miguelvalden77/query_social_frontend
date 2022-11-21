// Service
import service from "./config.service";


const showAllPosts = ()=>{
    return service.get("/post/all-posts")
}

const getUserPosts = (id)=>{
    return service.get(`/post/user/${id}`)
}

const createPost = (post)=>{
    return service.post("/post/create", post)
}

const getPost = (id)=>{
    return service.get(`/post/${id}`)
}

const deletePost = (id)=>{
    return service.post(`/post/delete/${id}`)
}

export {showAllPosts, createPost, getPost, deletePost, getUserPosts}