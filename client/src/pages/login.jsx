import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Login({ user, setUser, token, setToken }) {
  const navigate = useNavigate();
  ;

  return (
    <>
      <div id="login-page">
      <form>
                <h1>Login</h1>
                <br/>
                <label>Username:</label>
                <br/>
                <input
                    placeholder="John123"
                    required
                    name="username"
                    type="text"
                    />
                <br/>
                <br/>
                <label>Password:</label>
                <br/>
                <input
                    placeholder="********"
                    required
                    name="password"
                    type="text"
                    />
                <br/>
                <br/>
                <button type="submit">Create Account</button>
                <br />
                <br />
                <a href="./register"><b>Don't have an account? Create An Account here!</b></a>
            </form>
      </div>
    </>
  );
}