import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import AdminCalendar from './pages/Calendario';
import ProfilePage from './pages/Perfil';
import  ControleAdmin  from './pages/ControleAdmin';
import ClientPage from './pages/ClienteCalendario';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/calendario" element={<AdminCalendar />} />
        <Route path="/cliente-calendario" element={<ClientPage />} />
        <Route path='/perfil' element={<ProfilePage />} />
        <Route path='/controlerAdm' element={<ControleAdmin/>}/>
      </Routes>
    </Router>
  );
};

export default App;
