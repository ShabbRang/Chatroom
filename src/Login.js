import React, { useState } from "react";
import "./Login.css";
import { Button } from "@mui/material";
import logo from "./images/logo.jpg";
import { auth, provider, signInWithPopup } from "./firebase";
import { useStateValue } from "./StateProvide";
import { actionTypes } from "./reducer";

function Login() {
    // dispatch transfers information to the data layer in {} you could destructure the data
    const [{}, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  // const signIn = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => console.log(result))
  //     .catch((error) => alert(error.message));
  // };

  return (
    <div className="login">
      <div className="login__container">
        <img src={logo} alt="" />
        <div className="login__text">
          <h1>Sign In To The Chatroom</h1>
        </div>

        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
