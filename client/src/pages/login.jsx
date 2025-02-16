import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Login({ user, setUser, token, setToken }) {
  const navigate = useNavigate();
  ;

  return (
    <>
      <div id="login-page">
        <h1>Login</h1>
      </div>
    </>
  );
}