import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import styles from './Aboutpage.module.css'

const About = () => {
    const [file, setFile] = React.useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is signed in')
            } else {
                console.log('No user is signed in')
                navigate('/')
            }
        })
    }, [navigate])

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('User signed out successfully')
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleOnClickFile = async (e) => {
        e.preventDefault()
        if (!file) {
            console.log('No file selected')
            return
        }
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData
            })
            if(!response.ok) {
                console.log('Error in uploading file')
                return
            }
            const data = await response.json()
            console.log(data)
            navigate('/chatbot')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.subcontainer}>
                <div className={styles.textContainer}>
                    <label htmlFor="file" className={styles.inputLabel}>Select image:</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        className={styles.inputField}
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>
                <button type='submit' onClick={handleOnClickFile} className={styles.submitBtn}>Submit</button>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>Log out</button>
        </div>
    )
}

export default About
