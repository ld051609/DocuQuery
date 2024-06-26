import React, { useEffect, useState, useRef } from 'react';
import styles from './Chatbot.module.css';
import {auth, db} from '../../firebase';
import {query, collection, orderBy, onSnapshot, limit} from 'firebase/firestore';
import SendMessage from './SendMessage';
import Message from './Message';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
const Chatbot = () => {
  const [historyMessages, setHistoryMessages] = useState([]);


  useEffect(() => {
    // Check if the user is authenticated
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login')
      }
    })

    const q = query(
      collection(db, 'chat'), 
      orderBy('createdAt'), 
      limit(50));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({...doc.data(), id: doc.id});
        const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);
        setHistoryMessages(sortedMessages);

      })
    });
    return () => {
      unsubscribe();
    }
  }, []);


  return (
    <div className={styles.container}>
      <h1>DocuQuery Chatbot</h1>
      <div className={styles.chatbot}>
        {historyMessages.map((message) => (
          <Message key={message.id} message={message}/>
        ))}

      </div>
      <SendMessage/>
    </div>
  );
};

export default Chatbot;
