import React, { useState } from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa; 
  position: relative; 
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 450px;
  max-height: calc(100vh - 40px); 
  overflow-y: auto; 
  position: relative; 
  z-index: 1; 
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; 
  height: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 15px; 
  ::placeholder {
    font-weight: 400;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
  }
`;

const Button = styled.button`
  width: 120px;
  height: 50px; 
  padding: 10px;
  background-color: #004598;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 50px;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const CadastroTitle = styled.h1`
  color: #002B6D;
  font-family: Roboto, sans-serif;
  margin-top: 50px;
  font-size: 60px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 50%; 
  transform: translateX(-50%); 
  width: 200px; 
  height: 200px; 
  z-index: 1; 
`;

const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, ''); 
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
  let sum = 0;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
};

function ContainerCadastro() {
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCPF(cpf)) {
      setCpfError('CPF inválido');
    } else {
      setCpfError('');
    
    }
  };

  return (
    <>
      <BackgroundImage src="./src/assets/sesi-senai.png" alt="Background" />
      <StyledContainer>
        <Content>
          <CadastroTitle>Cadastre-se</CadastroTitle>
          <StyledForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name"></Label>
              <Input
                type="name"
                id="name"
                placeholder="Digite seu nome completo"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email"></Label>
              <Input
                type="email"
                id="email"
                placeholder="Digite seu email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password"></Label>
              <Input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                required
                minLength={6}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="cpf"></Label>
              <Input
                type="text"
                id="cpf"
                placeholder="Digite seu CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
                minLength={11}
                maxLength={14}
              />
              {cpfError && <span style={{ color: 'red' }}>{cpfError}</span>}
            </FormGroup>
            <Button type="submit">Cadastrar</Button>
          </StyledForm>
        </Content>
      </StyledContainer>
    </>
  );
}

export default ContainerCadastro;
