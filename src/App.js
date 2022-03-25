import logo from './logo.svg';
import './App.css';
import './style.css'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Member from './pages/Member'
import Paket from './pages/Paket'
import Transaksi from './pages/Transaksi'
import FormTransaksi from './pages/FormTransaksi';
import User from './pages/User';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import SideBar from './pages/SideBar';

export default function App(){
  return(
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navbar> <Dashboard /> </Navbar>} />
          <Route path="/Member" element={<Navbar> <Member /> </Navbar>} />
          <Route path="/Paket" element={<Navbar> <Paket /> </Navbar>} />
          <Route path="/User" element={<Navbar> <User /> </Navbar>} />
          <Route path="/Transaksi" element={<Navbar> <Transaksi /> </Navbar>} />
          <Route path="/FormTransaksi" element={<Navbar> <FormTransaksi /> </Navbar>} />
          <Route path="/Login" element={<Login/>} />
          {/* <Route path="/sidebar" element={<SideBar/>} /> */}
        </Routes>
    </BrowserRouter>
  )
}