import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContainerCadastro from './components/ContainerCadastro';
import ContainerLogin from './components/ContainerLogin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<ContainerLogin />} />
        <Route path="/cadastro" element={<ContainerCadastro />} />
      </Routes>
    </Router>
  );
};

export default App;
