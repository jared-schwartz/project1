import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ user, setUser, token, setToken }) {
  const navigate = useNavigate();
  ;

  return (
    <>
      <div id="home-page">
        <h1>Home Page</h1>
      </div>
    </>
  );
}