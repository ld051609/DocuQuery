import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../../firebase'
const About = () => {
    const navigate = useNavigate();
    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              console.log('User is signed in')
            } else {
              console.log('No user is signed in')
              navigate('/')
            }
        })
    }, [])

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('User signed out successfully')
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    
    }
  return (
    <div>
        Welcome to page
        <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default About