import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Register({ user, setUser, token, setToken }) {
  const navigate = useNavigate();
  ;

  return (
    <>
      <div id="register-page">

            <form>
                <h1>Register</h1>
                <label>First Name:</label>
                <br/>
                    <input
                    placeholder="John"
                    required
                    name="firstname"
                    type="text"
                    />
                <br/>
                <br/>
                <label>Last Name:</label>
                <br/>
                <input
                    placeholder="Doe"
                    required
                    name="lastname"
                    type="text"
                    />
                <br/>
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
                <label>Confirm Password:</label>
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
                <h3>*Password must contain 8 characters.*</h3>
                <br />
                <a href="./login"><b>Already have an account? Login here!</b></a>
            </form>
      </div>
    </>
  );
}