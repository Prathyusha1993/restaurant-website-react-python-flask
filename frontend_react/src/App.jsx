import { useState } from 'react'
import Header from './components/Header'
import Aboutus from './components/Aboutus'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Menu from './components/Menu';

function App() {

  return (
    <>
      {/* <h1>Building Restaurant website</h1> */}
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Aboutus />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
