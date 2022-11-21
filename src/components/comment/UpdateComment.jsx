import React, { useEffect, useState } from "react"
import { updateAComment } from "../../services/comment.services"



const UpdateComment = ({idComment, description, getData})=>{


    const [click, setClick] = useState(false)
    const [descComment, setDescComment] = useState(description)

    const handleChange = (e)=>{
        setDescComment(e.target.value)
    }
    const handleClick = ()=> setClick(true)
    const handleSubmit = async (e)=>{

        e.preventDefault()

        try{
            console.log(descComment)
            const comment = {description: descComment}
            await updateAComment(idComment, comment)
            getData()
            setClick(false)
        }
        catch(err){
            console.log(err)
        }
    }

    if(click == true){
        return <div>
        <form className="update-comment-form" onSubmit={handleSubmit}>
            <button className="update">update</button>
            <input className="update-input" onChange={handleChange} value={descComment} name="description"></input>
        </form>
    </div>
    }
    else{
        return <button className="update" onClick={handleClick}>update</button>
    }
}

export default UpdateComment