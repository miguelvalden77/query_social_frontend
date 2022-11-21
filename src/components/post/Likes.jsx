// Hooks
import { useEffect, useState} from "react"

// Services
import { likePost } from "../../services/like.services"

// Recursos
import Like from "../../assets/like.png"
import NotLike from "../../assets/not-like.png"


const Likes = ({id, getData, likesArray, usuario}) =>{

    const [info, setInfo] = useState()
    
    useEffect(()=>{
        verifyLike()
    }, [])
    
    const verifyLike = async ()=>{
        
        try{
        
            if(likesArray.data.postsLike.indexOf(id) == -1){
                setInfo(false)
            }
            else{
                setInfo(true)
            }

        }
        catch(err){
            console.log(err)
        }
    }

    const handleLike = async ()=>{
    
        try{
            await likePost(id, usuario)
            setInfo(!info)
            
            getData()
        }
        catch(err){
            console.log(err)
        }
    }

    return <img className="like" onClick={handleLike} width={18} src={info == false ? NotLike : Like}/>

}

export default Likes