// Hooks
import { useState } from "react"

// Services
import { changePersonalDescription } from "../../services/user.service"


const PersonalDescription = ({userId, getData})=>{

    const [personalInfo, setPersonalInfo] = useState()
    const [click, setClick] = useState(false)

    const handleChange = e => {
        console.log(e.target.value)
        setPersonalInfo(e.target.value)
    }
    const handleClick = async e =>{

        if(click){

            const userDescription = {userDescription: personalInfo}

            try{

                await changePersonalDescription(userDescription, userId)
                setClick(!click)

                getData()
            }
            catch(err){
                console.log(err)
            }
            return
        }
        
        setClick(!click)

    }

    return <section>
        {
            click ? <textarea onChange={handleChange} value={personalInfo} name="personalDescription" cols="30" rows="10"></textarea> : null
        }
        <button onClick={handleClick}>Update</button>
    </section>

}

export default PersonalDescription