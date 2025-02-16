import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Shop({ user, setUser, token, setToken }) {
  const navigate = useNavigate();
  ;

  return (
    <>
      <div id="shop-page">
        <h1>Shop</h1>
      </div>
    </>
  );
}