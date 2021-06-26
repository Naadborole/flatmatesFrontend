import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Auth";
import app from "../firebase";

export default function Test() {
  const { currentuser } = useContext(AuthContext);
  const [token, settoken] = useState("");

  const sendToken = async () => {
    const token = await app.auth().currentUser.getIdToken(true);
    settoken(token)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    };
    const response = await fetch(
      "http://localhost:5000/user/verify",
      requestOptions
    );
    return response;
  };

  useEffect(() => {
    sendToken()
    .then(response => {console.log(response)})
    .catch(error => {console.log(error)});
  }, []);

  return (
    <div>
      <h1>Token is : {token}</h1>
    </div>
  );
}
