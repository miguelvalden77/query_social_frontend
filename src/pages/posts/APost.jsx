// Hooks
import { useEffect, useState, useContext } from "react"

// Paquetes externos
import { useNavigate, useParams } from "react-router-dom"

// Context
import { AuthContext } from "../../context/auth.context"

// Component
import AddComment from "../../components/comment/AddComment"
import UpdateComment from "../../components/comment/UpdateComment"

// Services
import { deleteComment } from "../../services/comment.services"
import { deletePost, getPost } from "../../services/post.services"
import Likes from "../../components/post/Likes"
import { likesArr } from "../../services/like.services"

// Recursos
import avatar from "../../assets/avatar.png"


const APost = () =>{

    const {usuario} = useContext(AuthContext)

    const navigate = useNavigate()
    
    const {id} = useParams()
    
    const [post, setPost] = useState()
    const [comments, setComments] = useState()
    const [likes, setLikes] = useState()
    const [loader, setLoader] = useState(true)
    
    useEffect(()=>{
        getData()
    },[])
    

    const getData = async () =>{

        try{
            // Primero like para tener antes el dato
            const likesArray = await likesArr(usuario?.id)
            setLikes(likesArray)

            const response = await getPost(id)

            setPost(response.data.post)
            setComments(response.data.comments)

            setLoader(false)

        }
        catch(err){
            console.log(err)
        }

    }

    const handleDelete = async (id)=>{

        try{
            await deleteComment(id)  
            getData()          
        }
        catch(err){
            console.log(err)
        }
    }

    const handleDeletePost = async (id)=>{
        try{
            await deletePost(id)
            navigate("/allPosts")
        }
        catch(err){
            console.log(err)
        }
    }


    if(loader){
        return <h2>Loading ...</h2>
    }

    return <main className="main-only-post">
        {
            post && <article className="post-card">
                <section className="post-section author-post">
                        <div className="avatar-container">
                            <img src={avatar} alt="avatar usuario" />
                        </div>
                        <p>{post.author.username}</p>
                </section>
                <section className="post-section img-post">
                    <img src={post.photo} alt="foto"/>
                </section>
                <section className="last-post-section">
                        <div className="likes-container">
                            <Likes getData={getData} id={post._id} likes={post.likes} likesArray={likes} usuario={usuario.username}/>
                            { post.likes != 1 ? <p>{post.likes} <p>likes</p></p> : <p>{post.likes} <p>like</p></p>}
                        </div>
                        <div className="post-title-section">
                            <h2 className="title-post text-center">{post.title}</h2>
                        </div>
                </section>
                <section className="comment-section">
                {
                    comments && comments.map((e, index)=>{
                        return <article key={index}>
                                <p className="comment"><b>{e.author.username}</b> {e.description}</p>
                                <section className="comment-container">
                                {
                                    e.author._id == usuario?.id && <button className="delete" onClick={()=>handleDelete(e._id)}>delete</button>
                                }
                                {
                                    e.author._id == usuario?.id && <UpdateComment getData={getData} idComment={e._id} description={e.description}/>
                                }
                            </section>
                        </article>
                    })
                }
                </section>
                <section className="create-comment">
                    {post && <AddComment getData={getData} post={post._id}/>}
                </section>
            </article>
        }
        {
            post?.author._id == usuario?.id && <button onClick={()=>handleDeletePost(post._id)}>Delete post</button>
        }

    </main>
}

export default APost