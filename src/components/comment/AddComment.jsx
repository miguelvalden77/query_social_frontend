// Hooks
import React, { useContext, useState } from "react"

// Paquetes externos
import { useNavigate } from "react-router-dom"

// Context
import { AuthContext } from "../../context/auth.context"

// Services
import { createComment } from "../../services/comment.services"


const AddComment = ({post, getData})=>{

    const {usuario} = useContext(AuthContext)

    const [description, setDescription] = useState("")

    const handleChange = (e)=> setDescription(e.target.value)
    const handleSubmit = async (e)=>{

        e.preventDefault()
        const comment = {author: usuario?.id, description, post}

        try{
            await createComment(comment)
            getData()
            setDescription("")
        }
        catch(err){
            console.log(err)
        }

    }

    return <form onSubmit={handleSubmit}>
        <input className="add-comment-input" placeholder="deja un comentario ..." name="description" onChange={handleChange} value={description}/>
        <button className="create-comment-button">Comment</button>
    </form>

}

export default AddComment