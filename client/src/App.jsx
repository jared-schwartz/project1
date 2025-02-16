import { useState } from 'react';
import Navigation from "./components/navigations";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Account from "./pages/account";
import Register from "./pages/register";
import Shop from "./pages/shop";

function App() {
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <>
      <header>
        <Navigation user={user} />
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home user={user} token={token} />} />
          <Route path="/login" element={<Login setUser={setUser} setToken={setToken} />} />
          <Route path="/account" element={<Account user={user} setUser={setUser} setToken={setToken} />} />
          <Route path="/register" element={<Register user={user} setUser={setUser} setToken={setToken} />} />
          <Route path="/shop" element={<Shop user={user} setUser={setUser} setToken={setToken} />} />
        </Routes>
        </div>
    </>
  );
}

export default App
