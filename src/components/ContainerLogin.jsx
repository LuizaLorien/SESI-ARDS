import React from 'react';
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

const SignUpButton = styled.button`
  font-size: 14px;
  margin-top: 10px; 
  background-color: transparent;
  color: #007bff;
  border: none;
  cursor: pointer;
  margin-bottom: 30px;
  font-size: 15px;
`;

const LoginTitle = styled.h1`
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

function ContainerLogin() {
  return (
    <>
      <BackgroundImage src="./src/assets/sesi-senai.png" alt="Background" />
      <StyledContainer>
        <Content>
          <LoginTitle>Login</LoginTitle>
          <StyledForm>
            <FormGroup>
              <Label htmlFor="email"></Label>
              <Input
                type="email"
                id="email"
                placeholder="Digite seu email"
                required  // Requiremento basico do front
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password"></Label>
              <Input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                required  // // Requiremento basico do front
                minLength={6}  // Mínimo de 6 caracteres - // Requiremento basico do front
              />
            </FormGroup>
            <SignUpButton>Quero me cadastrar</SignUpButton>
            <Button type="submit">Entrar</Button>
          </StyledForm>
        </Content>
      </StyledContainer>
    </>
  );
}

export default ContainerLogin;
