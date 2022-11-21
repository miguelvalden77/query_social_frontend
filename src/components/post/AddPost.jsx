// Hooks
import React, { useContext, useState } from "react"

// Context
import { AuthContext } from "../../context/auth.context"

// Paquetes externos
import { useNavigate } from "react-router-dom"

// Services
import { createPost} from "../../services/post.services"
import { upload } from "../../services/upload.service"



const AddPost = ()=>{

    const navigate = useNavigate()
    
    const {usuario} = useContext(AuthContext)
    const [data, setData] = useState({title: "", author: usuario.id})
    const [urlImage, setUrlImage] = useState("")

    const handleChange = (e)=> setData({...data, [e.target.name]: e.target.value})

    const handleSubmit = async (e )=>{

        e.preventDefault()
        const post = {author: usuario?.id, title: data.title, photo: urlImage}
        console.log(post)

        try{
            await createPost(post)
            navigate("/allPosts")
        }
        catch(err){
            console.log(err)
        }

    }

    const uploadImage = async (e)=>{

        console.log(e?.target.files[0])

        const form = new FormData()
        form.append("image", e?.target.files[0])
        console.log(form)
        

        try{

            const response = await upload(form)
            console.log(response)
            setUrlImage(response.data.imgUrl)

        }
        catch(err){
            console.log(err)
        }

    }

    return <form className="form-createPost" onSubmit={handleSubmit}>
    
        <div>
            <input className="input-auth input-title" placeholder="Title" value={data.title} onChange={handleChange} type="text" name="title"/>
        </div>
        <div className="input-post-section">
            <label htmlFor="photo">Foto</label>
            <input onChange={uploadImage} type="file" name="photo"/>
        </div>

        {urlImage && <img className="img-create" src={urlImage} alt="foto" />}

        <button className="auth-button">Crear</button>
    </form>

}

export default AddPost