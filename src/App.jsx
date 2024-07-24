import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import CustomCalendar from './components/Calendario';
import ProfilePage from './pages/Perfil'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/calendario" element={<CustomCalendar/>}/>
        <Route path='/perfil' element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
