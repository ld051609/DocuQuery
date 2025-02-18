import React from 'react'
import styles from './Form.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../../firebase'
const Signup = () => {
  const navigate = useNavigate()
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/about")
          console.log(user);
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
        <h1 className={styles.heading}>Login Page</h1>
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
      <button type='submit' className={styles.btn}>Log in</button>
      <span className={styles.spanBtn}>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </span>

      </form>
      
    </div>
  )
}

export default Signup