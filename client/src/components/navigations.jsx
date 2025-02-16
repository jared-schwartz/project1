import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Navigation({ user, setUser, token, setToken }) {
  ;

  return (
    <>
      <div id="navbar">
        <h1>Project 1</h1>
        <div id="links">
        <Link to="/">Home</Link>
        <Link to="/account">My Account</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/shop">Shop</Link>
        </div>
      </div>
    </>
  );
}