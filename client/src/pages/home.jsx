import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ user, setUser, token, setToken }) {
  const navigate = useNavigate();
  ;

  return (
    <>
      <div id="home-page">
        <h2>Welcome to J's Shop! Check out some products in our shop!</h2>

      </div>
    </>
  );
}