import React, { useState, useEffect } from 'react';
import "../css/chat_new.css";
import { API } from '../api';
import axios from 'axios';


const apiUrl = API.RECIVE_REQUEST;
const apiAcceptUser = API.ACCEPT_REQUEST;

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState({});
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState([]);


  useEffect(() => {


    axios.get('http://127.0.0.1:8000/api/accepted/list', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        const userList = res.data.data.map((user) => ({
          id: user.id,
          name: user.user.first_name,
          image: `http://127.0.0.1:8000/storage/${user.user.profile_image}`,
          lastMessage: user.last_message || '', // optional
        }));

        setUsers(userList);
        console.log("Users loaded:", userList);
      })
      .catch((error) => {
        console.error("Error loading users:", error);
      });


    axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setRequests(response.data.data);
        console.log("Requests fetched:", response.data);
      })
      .catch(error => {
        console.error('Error fetching requests:', error);
      });
  }, []);


  const handleAccept = (req) => {
    console.log("Accepted user:", req);

    const token = localStorage.getItem('token');


    axios.post(apiAcceptUser, {
      id: req.id,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log("Request accepted on server:", response.data);

        // Remove from requests
        setRequests((prev) => prev.filter((r) => r.id !== req.id));

        // Add to chat user list
        const acceptedUser = {
          id: req.user.id,
          name: req.user.first_name,
          image: `http://127.0.0.1:8000/storage/${req.user.profile_image}`,
          lastMessage: '',
        };

        users.push(acceptedUser); // Note: not reactive — consider using state
      })
      .catch((error) => {
        console.error("Error accepting request:", error);
        // Optionally show error to user
      });
  };


  // const handleAccept = (req) => {
  //   console.log("Accepted user:", req);
  //   setRequests((prev) => prev.filter((r) => r.id !== req.id));
  //   const acceptedUser = {
  //     id: req.user.id,
  //     name: req.user.first_name,
  //     image: `http://127.0.0.1:8000/storage/${req.user.profile_image}`,
  //     lastMessage: '', 
  //     };


  //     users.push(acceptedUser);
  // };

  const handleDecline = (user) => {
    setRequests((prev) => prev.filter((r) => r.id !== user));
  };


  const sendMessage = () => {
    if (!messageInput.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), { from: 'me', text: messageInput }],
    }));

    setMessageInput('');
  };

  return (
    <div className="chat-container">
      {/* User List */}
      <div className="user-list">
        {users.length === 0 ? (
          <div className="no-users">No users available</div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
              onClick={() => setSelectedUser(user)}
            >
              <img src={user.image} alt={user.name} className="user-avatar" />
              <div>
                <div className="user-name">{user.name}</div>
                <div className="last-message">{user.lastMessage}</div>
              </div>
            </div>
          ))
        )}
      </div>



      {/* Chat Panel */}
      <div className="chat-panel">
        {selectedUser ? (
          <div className="chat-window">
            {/* Header */}
            <div className="chat-header">
              <img src={selectedUser.image} alt={selectedUser.name} className="chat-avatar" />
              <div className="chat-username">{selectedUser.name}</div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {(messages[selectedUser.id] || []).map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${msg.from === 'me' ? 'from-me' : 'from-them'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <div className="empty-chat">Select a user to start chatting</div>
        )}
      </div>

      <div className="requests-panel">
        <h4>Requests</h4>
        {requests.length === 0 ? (
          <div className="no-requests">No pending requests</div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="request-item">
              <img src={`http://127.0.0.1:8000/storage/${req.user.profile_image}`} alt={req.user.first_name} className="user-avatar" />
              <div>
                <div className="user-name">{req.user.first_name}</div>
                <div className="last-message">{req.message}</div>
                <div className="request-actions">
                  <button onClick={() => handleAccept(req)}>Accept</button>
                  <button onClick={() => handleDecline(req.id)}>Decline</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>


    </div>
  );
}

export default Chat;
