import React, {useState} from 'react';
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './components/content/landingPage.js'
import Home from './components/content/home.js'

const App =() => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
