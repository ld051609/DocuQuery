import React, { useEffect, useState, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styles from './Chatbot.module.css';
import {auth, db} from '../../firebase';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { FilenameContext } from '../../FilenameContext';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const {filename} = useContext(FilenameContext);

  const sendMessage = async() => {
    if(!message){
      alert('Please enter a message');
      return;
    }
    // Add the user message to Firestore
    const userMessage = {
      text: message,
      sender: 'USER',
      createdAt: serverTimestamp(),
    }
    await addDoc(collection(db, 'chat'), userMessage);

    // Update state immediately to display the message
    setMessage('');
    console.log('Filename in context fe:', filename);


    // Call the backend API to get the response
    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'question': message, 'filename': filename}),
      });
      const data = await response.json();
      console.log(data);

      // Add the response to Firestore
      const botMessage = {
        text: data.answer,
        sender: 'BOT',
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'chat'), botMessage);
      
    } catch (error) {
      console.error(error);
      
    } 
  }



  return (
    <div className={styles.textArea}>
        <input
          type="text"
          placeholder='Type your message here...'
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.inputText}
        />

        <div>
          <button className={styles.button} onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} className={styles.icon} />
          </button>
        </div>

    </div>
  );
};

export default SendMessage;
