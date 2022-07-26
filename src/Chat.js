import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import io from "socket.io-client";
import "./index.css";
import moment from "moment";

const username = prompt("what is your username");

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"]
});

const Chat = ({}) => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log("connect first time");
        socket.on("connect", () => {
          socket.emit("username", username);
        });
    
        socket.on("users", users => {
          setUsers(users);
        });
    
        socket.on("message", message => {
          setMessages(messages => [...messages, message]);
        });
    
        socket.on("connected", user => {
          setUsers(users => [...users, user]);
        });
    
        socket.on("disconnected", id => {
          setUsers(users => {
            return users.filter(user => user.id !== id);
          });
        });
        
        return () => {
            console.log("Cleanup..");
        }
    }, []);
    
    const submitMessage = event => {
        event.preventDefault();
        socket.emit("send", message);
        setMessage("");
    };

    return (
        <div className="FormBox">
            <p className="labelMessage">Users</p>
            <ul className="displayName">
                {users.map(({ name, id }) => (
                <li className="liName" key={id}>{name}</li>
                ))}
            </ul>
            <p className="labelMessage">Message</p>
            <div className="displayMessage">
            {messages.map(({ user, date, text }, index) => (
                <div key={index}>
                <span className="textMessage">
                  {moment(date).format("h:mm:ss a")}
                </span>
                <span className="textMessage">{user.name}</span>
                <span className="textMessage">{text}</span>
                </div>
            ))}
            </div>
            
            <div className="sentMessage">
                <input placeholder="Message"
                    type="text"
                    onChange={e => setMessage(e.currentTarget.value)}
                    value={message}
                    id="text" className="messageInput"
                />
                <button value="Submit" className="buttonMessage" onClick={submitMessage}>Send</button>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Chat />
);

// ReactDOM.render(<Chat />, document.getElementById("root"));