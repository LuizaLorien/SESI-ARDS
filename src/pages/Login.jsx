import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Snackbar, Alert, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 450px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  position: relative;
  z-index: 2;
  margin-top: 15vh
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

const LoginTitle = styled(Typography)`
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

function ContainerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setErrorMessage('Email inválido');
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    // verificação do ADM MASTER
    if (email === 'admin@gmail.com' && password === 'admin000') {
      localStorage.setItem('user', JSON.stringify({ email, name: 'Admin', isAdmin: true }));
      setLoading(false);
      navigate('/controlerAdm');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Stored Users:', storedUsers); // teste para ver se os usuarios tao puxando (talvez eu esquça de apagar)

    const user = storedUsers.find((user) => user.email === email && user.senha === password);

    if (user) {
      setErrorMessage('');
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      if (user.isAdmin) {
        navigate('/controlerAdm'); 
      } else {
        navigate('/home');
      }
    } else {
      setErrorMessage('Credenciais inválidas');
      setOpenSnackbar(true);
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <BackgroundImage src="./src/assets/sesi-senai.png" alt="Background" />
      <StyledContainer>
        <Content>
          <LoginTitle variant="h1">Login</LoginTitle>
          <StyledForm onSubmit={handleSubmit}>
            <Input
              label="Digite seu email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Digite sua senha"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              inputProps={{ minLength: 6 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2, width: '120px', height: '50px', borderRadius: '15px' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Entrar'}
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate('/cadastro')}
              sx={{ mb: 2 }}>
              Quero me cadastrar
            </Button>
          </StyledForm>
        </Content>
      </StyledContainer>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ContainerLogin;
