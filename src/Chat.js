import { Avatar, IconButton } from "@mui/material";
import React from "react";
import "./Chat.css";
import { useState, useEffect } from "react";
import {
  AttachFile,
  SearchOutlined,
  MoreVertOutlined,
  InsertEmoticon,
} from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useStateValue } from "./StateProvide";

function Chat() {
  const [input, setinput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState(" ");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    try {
      const roomRef = doc(db, "Rooms", roomId);

      onSnapshot(roomRef, (snapshot) => {
        if (snapshot.exists()) {
          setRoomName(snapshot.data().name);
        } else {
          console.log("No documnet dude");
          alert("No Such Document Exists");
        }

        const msg_ref = collection(db, "Rooms", roomId, "messages");
        const q = query(msg_ref, orderBy('timestamp', 'asc'))

        const get_msg = onSnapshot(q ,(snapshot) => {
          const message = snapshot.docs.map((doc) => doc.data());
          setMessages(message);
        })
      });
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const Sendmessage = (e) => {
    e.preventDefault();
    console.log("You Typed >>>", input);

    const msg_ref = collection(db, "Rooms", roomId, "messages")

    const newMessage = {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp()
    }
    
    addDoc(msg_ref, newMessage).then().catch((error) => {
      console.log(error)
      alert("Message was not sent")
    })
    setinput("");
  };

  return (
    <div className="chat">
      <div className="chatHeader">
        <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chatHeader_info">
          <h3>{roomName}</h3>
        </div>

        <div className="chatHeader_right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertOutlined />
          </IconButton>
        </div>
      </div>

      <div className="chatBody">
        {messages.map((message) => (
          <p className={`chatMessage ${message.name === user.displayName   && "chatReciever"}`}>
          <span className="chatName"> {message.name}</span>
          {message.message}
          <span className="chatTime">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
        </p>
        ))}
      </div>

      <div className="chatFooter">
        <InsertEmoticon />
        <form action="">
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
          />
          <button type="Submit" onClick={Sendmessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
