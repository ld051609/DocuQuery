import React from 'react'
import { db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import styles from './Chatbot.module.css';
const Message = ({message}) => {
  const handleDeleteMessage = async() => {
    try {
      const docRef = doc(db, 'chat', message.id);
      await deleteDoc(docRef);
      alert('Document deleted successfully!');
      console.log('Document deleted!');
    } catch (error) {
      console.error(error);
      
    }
  }
  return (
    <div className={styles.messageContainer} style={{ backgroundColor: message.sender === 'BOT' ? 'transparent' : '#eae8e874' }}>
        <p><strong>{message.sender}:</strong> {message.text} </p>
        <button onClick={handleDeleteMessage} className={styles.deleteBtn}>Delete</button>
    </div>
  )
}

export default Message