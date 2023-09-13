import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarChat.css";
import { useState, useEffect } from "react";
import db from "./firebase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("")

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if(id){
      const msgRef = collection(db, "Rooms", id, "messages");
      const q = query(msgRef, orderBy("timestamp", "desc"))

      onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data());
        setMessages(messages)
      }
  
  )}
}, [id]);

  const createChat = () => {
    const roomName = prompt("Please Enter A Name For The Room");

    if (roomName) {
      // Some Data Base Stuff
      try {
        addDoc(collection(db, "Rooms"), { name: roomName });
      } catch (err) {
        alert(err);
      }
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div>
        <div className="Sidebar_chat">
          <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg `}/>
          <div className="sidebarchat_info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="Sidebar_chat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
