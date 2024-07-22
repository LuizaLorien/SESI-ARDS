import React from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; 

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#ffffff',
  position: 'relative',
});

const Content = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  width: '450px',
  maxHeight: 'calc(100vh - 40px)',
  overflowY: 'auto',
  position: 'relative',
  zIndex: 1,
});

const StyledForm = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
});

const FormGroup = styled(Box)({
  marginBottom: '15px',
  width: '100%',
});

const Input = styled(TextField)({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '15px',
    fontSize: '16px',
    fontFamily: 'Roboto, sans-serif',
  },
  '& .MuiInputBase-input::placeholder': {
    fontWeight: 400,
    fontSize: '20px',
    fontFamily: 'Roboto, sans-serif',
  },
});

const SubmitButton = styled(Button)({
  width: '120px',
  height: '50px',
  padding: '10px',
  backgroundColor: '#004598',
  color: 'white',
  borderRadius: '15px',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  marginBottom: '50px',
});

const SignUpButton = styled(Button)({
  fontSize: '15px',
  marginTop: '10px',
  backgroundColor: 'transparent',
  color: '#007bff',
  border: 'none',
  cursor: 'pointer',
  marginBottom: '30px',
});

const LoginTitle = styled(Typography)`
  color: #002B6D;
  font-family: 'Roboto', sans-serif;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 60px;
`;

const BackgroundImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '200px',
  height: '200px',
  zIndex: 1,
});

function ContainerLogin() {
  const navigate = useNavigate(); 

  const handleSignUpClick = () => {
    navigate('/cadastro'); // Para ir para a tela de cadastro
  };

  return (
    <>
      <BackgroundImage src="./src/assets/sesi-senai.png" alt="Background" />
      <StyledContainer>
        <Content>
          <LoginTitle>Login</LoginTitle>
          <StyledForm>
            <FormGroup>
              <Input
                label="Digite seu email"
                type="email"
                variant="outlined"
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="Digite sua senha"
                type="password"
                variant="outlined"
                required
                inputProps={{ minLength: 6 }}
              />
            </FormGroup>
            <SignUpButton onClick={handleSignUpClick}>Quero me cadastrar</SignUpButton>
            <SubmitButton type="submit">Entrar</SubmitButton>
          </StyledForm>
        </Content>
      </StyledContainer>
    </>
  );
}

export default ContainerLogin;
