import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Account({ user, setUser, token, setToken }) {
  const navigate = useNavigate();
  ;

  return (
    <>
      <div id="account-page">
        <h1>My Account</h1>
      </div>
    </>
  );
}