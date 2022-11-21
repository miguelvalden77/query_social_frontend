// Hooks
import { useState } from 'react'

// // Estilos
import './styles/styles.scss'

// Paquetes externos
import {Route, Routes} from "react-router-dom"

// Pages
import Home from './pages/Home'
import Profile from './pages/Profile'
import AllPosts from './pages/posts/AllPosts'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Error from './pages/errors/Error'
import NotFound from './pages/errors/NotFound'
import CreatePost from './pages/posts/CreatePost'
import APost from './pages/posts/APost'

// Components
import Navbar from './components/Navbar'
import NonUsers from './components/HOC/NonUser'
import IsPrivate from "./components/HOC/IsPrivate"


function App() {
  

  return (
    <div className='main-body'>
      
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<IsPrivate><Profile/></IsPrivate>}/>
        <Route path='/allPosts' element={<IsPrivate><AllPosts/></IsPrivate>}/>
        <Route path='/login' element={<NonUsers><Login/></NonUsers>}/>
        <Route path='/signup' element={<NonUsers><Signup/></NonUsers>}/>
        <Route path='/post/create' element={<IsPrivate><CreatePost/></IsPrivate>}/>
        <Route path='/post/:id/single' element={<APost/>}/>

        {/* Errores */}
        <Route path='/error' element={<Error/>}/>
        <Route path='/*' element={<NotFound/>}/>
        

      </Routes>

    </div>
  )
}

export default App
