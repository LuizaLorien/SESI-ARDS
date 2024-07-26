import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  position: relative;
`;

const Content = styled(Box)`
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

const StyledForm = styled('form')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

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

const CadastroTitle = styled(Typography)`
  color: #002B6D;
  font-family: 'Roboto', sans-serif;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 60px;
`;

const BackgroundImage = styled('img')`
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
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
};

function ContainerCadastro() {
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setCpfError('');
    setEmailError('');
    setPasswordError('');

    if (!validateCPF(cpf)) {
      setCpfError('CPF inválido');
      isValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email inválido');
      isValid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
  
      localStorage.setItem('userData', JSON.stringify({
        nome: e.target[0].value,
        email,
        senha: password,
        cpf,
      }));
  
      setSnackbarMessage('Cadastro realizado com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
  
      navigate('/login');
    } else {
      setSnackbarMessage('Por favor, corrija os erros no formulário.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  

  const handleBackClick = () => {
    navigate('/login');
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <BackgroundImage src="./src/assets/sesi-senai.png" alt="Background" />
      <StyledContainer>
        <Content>
          <CadastroTitle variant="h1">Cadastre-se</CadastroTitle>
          <StyledForm onSubmit={handleSubmit}>
            <Input
              label="Nome Completo"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <Input
              label="Digite seu email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <Input
              label="Digite sua senha"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              inputProps={{ minLength: 6 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Input
              label="Digite seu CPF"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              error={!!cpfError}
              helperText={cpfError}
              inputProps={{ maxLength: 14 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2, width: '120px', height: '50px', borderRadius: '15px' }}>
              Cadastrar
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={handleBackClick}
              sx={{ mb: 2 }}>
              Voltar para o Login
            </Button>
          </StyledForm>
        </Content>
      </StyledContainer>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ContainerCadastro;
