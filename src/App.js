import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
// import { Router } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from 'react';
import Login from "./Login";
import { useStateValue } from "./StateProvide";

// Use npm run build to start the app and then npm start

function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    // BEM naming convention
    <BrowserRouter>
      <div className="App">
        {!user ? (
          <Login />
        ) : (
          <div className="app_body">
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat key={window.location.pathname}/>} />
              {/* <Route path='/app' element={<Chat />} /> */}
              <Route path="/" element={<Chat key={window.location.pathname}/> } />
              {/* <Route path='/'>
              <h1>Home Screen</h1>
            </Route> */}
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

// function Homescreen() {
//   const location = useLocation();

//   return(
//     <div>
//       <h1>Home Screen</h1>
//     </div>
//   );
// }

export default App;
