import React from 'react'
import styles from './Form.module.css'
import { Link, useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase'
const Signup = () => {
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      navigate('/login')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1 className={styles.heading}>Signup Page</h1>
        <div className={styles.subcontainer}>
          <label htmlFor="username" className={styles.inputLabel}>Username</label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            placeholder='Enter your username'
            value={username}
            className={styles.inputField}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className={styles.subcontainer}>
          <label htmlFor="email" className={styles.inputLabel}>Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='Enter your email'
            value={email}
            className={styles.inputField}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className={styles.subcontainer}>
          <label htmlFor="password" className={styles.inputLabel}>Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder='Enter your password'
            value={password}
            className={styles.inputField}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
      <button type='submit' className={styles.btn}>Sign up</button>
      <span className={styles.spanBtn}>
        Already have an account? <Link to='/login'>Log in</Link>
      </span>

      </form>
      
    </div>
  )
}

export default Signup