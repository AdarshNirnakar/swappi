import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messageList = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(messageList);
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = uuidv4();
    const newMessageObj = {
      id: newId,
      text: newMessage,
      timestamp: new Date().toLocaleString(),
      isUser: true,
    };
    setMessages((prev) => [...prev, newMessageObj]);
    setNewMessage('');
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className='chat'>
      <div className='chat-header'>
        <h2>Chat</h2>
      </div>
      <div className='chat-body'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.isUser ? 'chat-message-user' : 'chat-message-bot'}`}
          >
            <p>{message.text}</p>
            <span>{message.timestamp}</span>
          </div>
        ))}
      </div>
      <div className='chat-footer'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={newMessage}
            onChange={handleInputChange}
            placeholder='Type a message...'
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
