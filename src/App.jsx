import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ContainerCadastro from './pages/Cadastro';
import ContainerLogin from './pages/Login';
import BasicDateCalendar from './calendar/Calendario';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<ContainerLogin />} />
        <Route path="/cadastro" element={<ContainerCadastro />} />
        <Route path="/calendario" element={<BasicDateCalendar/>}/>
      </Routes>
    </Router>
  );
};

export default App;
