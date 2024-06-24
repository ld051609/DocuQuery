import React from 'react';
import styles from './Homepage.module.css';
import Background from '../../../public/ai.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Welcome to DocuQuery AI</h1>
        <img src={Background} alt="" className={styles.backgroundImg}/>

        <div className={styles.feature}>
            <h2>Features</h2>
            <p>Seamlessly manage documents with AI-powered insights</p>
            <p>Effortlessly upload, organize, and interact with your documents</p>
            <p>Integrated with Google Cloud API, providing more features - language translation, sentiment analysis, entity recognition</p>
        </div>

        <div className={styles.btnContainer}>
            <p>Ready to use our service?</p>
            <button className={styles.btn} onClick={() => navigate('/signup')}>Sign up</button>
        </div>
        <div className={styles.btnContainer}> 
            <p>Already have an account?</p>
            <button className={styles.btn} onClick={() => navigate('/login')}>Login</button>
        </div>
    </div>
  );
}

export default Homepage;
