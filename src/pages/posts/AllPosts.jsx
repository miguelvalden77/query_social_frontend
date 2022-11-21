// Hooks
import { useEffect, useState, useContext } from "react"

// Paquetes externos
import { useNavigate, Link } from "react-router-dom"
import Likes from "../../components/post/Likes"

// Services
import { showAllPosts } from "../../services/post.services"

// Context
import { AuthContext } from "../../context/auth.context"
import { verifyService } from "../../services/auth.services"
import { likesArr } from "../../services/like.services"

// Reecursos
import avatar from "../../assets/avatar.png"



const AllPosts = ()=>{

    const {usuario} = useContext(AuthContext)

    const navigate = useNavigate()

    const [posts, setPosts] = useState()
    const [likes, setLikes] = useState()
    const [loader, setLoader] = useState(true)

    useEffect(()=>{
        getPosts()
    }, [])

    const getPosts = async ()=>{

        try{
            const likesArray = await likesArr(usuario.id)
            setLikes(likesArray)


            const response = await showAllPosts()
            setPosts(response.data)

            setLoader(false)
        }
        catch(err){
            console.log(err)
            navigate("/error")
        }   
    }

    if(loader){
        return <h2>Loading ...</h2>
    }

    return <main className="main-all-posts">

        {
            posts && posts.map((e, index)=>{
                return <article className="post-card" key={index}>

                    <section className="post-section author-post">
                        <div className="avatar-container">
                            <img src={avatar} alt="avatar usuario" />
                        </div>
                        {/* <p>{e.author.username}</p> */}
                    </section>
                    <section className="post-section img-post">
                        <img src={e.photo} alt="foto"/>
                    </section>
                    <section className="last-post-section">
                        <div className="likes-container">
                            <Likes getData={getPosts} id={e._id} likes={e.likes} likesArray={likes} usuario={usuario.username}/>
                            { e.likes != 1 ? <p>{e.likes} <p>likes</p></p> : <p>{e.likes} <p>like</p></p>}
                        </div>
                        <div className="post-title-section">
                            <Link to={`/post/${e._id}/single`}><h2 className="title-post text-center">{e.title}</h2></Link>
                        </div>
                    </section>
                    
                </article>
            })
        }
    </main>

}

export default AllPosts