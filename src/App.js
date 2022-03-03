import React from "react";
import Member from "./pages/Member";
import Paket from "./pages/Paket";
import User from "./pages/User";
import Login from "./pages/Login";
import Header from "./header";
import Footer from "./footer";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

export default function App(){
  return(
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Member">Member</Link>
          </li>
          <li>
            <Link to="/Paket">Paket</Link>
          </li>
          <li>
            <Link to="/Users">User</Link>
          </li>
          
        </ul>
        <Routes>
          <Route exact path="/" element={App}></Route>
          <Route exact path="/Member" element={<Member/>}></Route>
          <Route exact path="/Paket" element={<Paket/>}></Route>
          <Route exact path="/Users" element={<User/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}