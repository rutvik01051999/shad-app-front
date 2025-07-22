import React, { useState } from 'react';
import "../css/chat_new.css";

const users = [
  {
    id: 1,
    name: 'Alice',
    image: 'https://i.pravatar.cc/40?img=1',
    lastMessage: 'Hey, how are you?',
  },
  {
    id: 2,
    name: 'Bob',
    image: 'https://i.pravatar.cc/40?img=2',
    lastMessage: 'Let’s meet tomorrow!',
  },
  {
    id: 3,
    name: 'Charlie',
    image: 'https://i.pravatar.cc/40?img=3',
    lastMessage: 'I’ll send the file.',
  },
];

const initialRequests = [
  {
    id: 4,
    name: 'David',
    image: 'https://i.pravatar.cc/40?img=4',
    message: 'Hi, can we chat?',
  },
  {
    id: 5,
    name: 'Eva',
    image: 'https://i.pravatar.cc/40?img=5',
    message: 'Hello, I’d like to connect!',
  },
];

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState({});
  const [requests, setRequests] = useState(initialRequests);

  const handleAccept = (user) => {
    setRequests((prev) => prev.filter((r) => r.id !== user.id));
    // Optionally add accepted user to chat user list
    users.push(user); // not ideal in production; should be part of state
  };

  const handleDecline = (user) => {
    setRequests((prev) => prev.filter((r) => r.id !== user.id));
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
        {users.map((user) => (
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
        ))}
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
          <img src={req.image} alt={req.name} className="user-avatar" />
          <div>
            <div className="user-name">{req.name}</div>
            <div className="last-message">{req.message}</div>
            <div className="request-actions">
              <button onClick={() => handleAccept(req)}>Accept</button>
              <button onClick={() => handleDecline(req)}>Decline</button>
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
