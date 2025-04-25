import { useState } from 'react'
import Header from './components/Header'
import Aboutus from './components/Aboutus'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Menu from './components/Menu';
import Catering from './components/Catering';
import ContactForm from './components/ContactForm';
import AdminLogin from './components/AdminLogin';

export const BASE_URL = 'http://127.0.0.1:5000/'

function App() {

  return (
    <>
      {/* <h1>Building Restaurant website</h1> */}
      
      <BrowserRouter>
      <Header />
        <Routes>
          <Route index element={<Aboutus />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/catering' element={<Catering />} />
          <Route path='/contact' element={<ContactForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
