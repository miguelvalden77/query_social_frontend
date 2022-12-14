// Hooks
import { useContext, useEffect, useState } from "react"

// Context
import { AuthContext } from "../context/auth.context"
import { getUserPosts, showAllPosts } from "../services/post.services"

// Recursos
import avatar from "../assets/avatar.png"

// Paquetes externos
import { Link } from "react-router-dom"

// Componentes
import Likes from "../components/post/Likes"

// Servicios
import { likesArr } from "../services/like.services"
import PersonalDescription from "../components/user/PersonalDescription"
import { getPersonalDescription } from "../services/user.service"



const Profile = ()=>{

    const {usuario, isUserActive} = useContext(AuthContext)

    const [likes, setLikes] = useState()
    const [posts, setPosts] = useState()
    const [info, setInfo] = useState()
    const [loader, setLoader] = useState(true)

    useEffect(()=>{
        getData()
    }, [])

    const getData = async ()=>{
        try{

            const likesArray = await likesArr(usuario?.id)
            setLikes(likesArray)

            const response = await getUserPosts(usuario?.id)
            setPosts(response.data)

            const personalInfo = await getPersonalDescription(usuario?.id)
            setInfo(personalInfo.data)

            setLoader(false)
        }
        catch(err){
            console.log(err)
        }
    }

    if(loader){
        return <h2>Loading ...</h2>
    }

    
        return <main className="main-profile">

            {
                usuario && <PersonalDescription userId={usuario.id} getData={getData}/>
            }

            {
                info ? <p>{info}</p> : null
            }

            {
                posts && posts.posts.map((e, index)=>{
                    return <article className="post-card profile-card" key={index}>

                    <section className="post-section author-post">
                        <div className="avatar-container">
                            <img src={avatar} alt="avatar usuario" />
                        </div>
                        <p>{e.author.username}</p>
                    </section>
                    <section className="post-section img-post">
                        <img src={e.photo} alt="foto"/>
                    </section>
                    <section className="last-post-section">
                        <div className="likes-container">
                            <Likes getData={getData} id={e._id} likes={e.likes} likesArray={likes} usuario={usuario}/>
                            { e.likes != 1 ? <p>{e.likes} <span>likes</span></p> : <p>{e.likes} <p>like</p></p>}
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


export default Profile