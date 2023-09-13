import React from 'react';
import './Sidebar.css'
import { Avatar, IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import db from './firebase.js'
import { useState, useEffect } from 'react';
import {
 collection, onSnapshot, 
} from 'firebase/firestore';
import { useStateValue } from './StateProvide';


function Sidebar({id, name, addNewChat}) {

  const [rooms, setRooms] =useState([])
  const [{user}, dispatch] = useStateValue();
  

  useEffect(() => {
    onSnapshot(collection(db, "Rooms"), (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )});
    }, []);

  return (
    <div className='sidebar'>
     
      <div className="sidebar_header">
        <Avatar src={user?.photoURL}/>
        <div className="sidebar_rightheader">
            <IconButton>
                <DonutLargeIcon />
            </IconButton>
            <IconButton>
                <ChatIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_SearchContainer">

         <SearchOutlined />
         <input placeholder='Search Or Start A New Chat' />
        </div>
      </div>

      <div className="sidebar_chat">

        <SidebarChat addNewChat/>
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id}  name = {room.data.name} />
        ))}
      </div>
    </div>
  );
        }

export default Sidebar;
