import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import AdminCalendar from './components/Calendario';
import ProfilePage from './pages/Perfil';
import  ControleAdmin  from './pages/ControleAdmin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/calendario" element={<AdminCalendar />} />
        <Route path='/perfil' element={<ProfilePage />} />
        <Route path='/controlerAdm' element={<ControleAdmin/>}/>
      </Routes>
    </Router>
  );
};

export default App;
