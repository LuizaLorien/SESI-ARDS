import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Snackbar, Alert, IconButton, InputAdornment, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputMask from 'react-input-mask';
import "../styles/pages.css";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#ffffff',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#ffffff',
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '450px',
  position: 'relative',
  zIndex: 1,
  marginTop: '250px', 
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    marginTop: '60px',
    padding: theme.spacing(1),
  },
}));

const StyledForm = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
});

const Input = styled(TextField)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(1, 0),
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
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(1, 0),
  },
}));

const CadastroTitle = styled(Typography)(({ theme }) => ({
  color: '#002B6D',
  fontFamily: 'Roboto, sans-serif',
  margin: theme.spacing(2, 0),
  fontSize: '50px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '36px',
  },
}));

const BackgroundImage = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: '100px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '300px',
  height: '300px',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    height: '100px',
  },
}));

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

const validatePasswordComplexity = (password) => {
  const complexityPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  return complexityPattern.test(password);
};

const ContainerCadastro = () => {
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cpfError, setCpfError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setCpfError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!validateCPF(cpf)) {
      setCpfError('CPF inválido');
      isValid = false;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.some(user => user.email === email)) {
      setEmailError('Email já cadastrado');
      isValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email inválido');
      isValid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
      isValid = false;
    } else if (!validatePasswordComplexity(password)) {
      setPasswordError('A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('As senhas não coincidem');
      isValid = false;
    }

    if (!termsAccepted) {
      setSnackbarMessage('Você deve aceitar os termos de serviço');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const newUser = {
        nome: e.target[0].value,
        email,
        senha: password,
        cpf,
        isAdmin: false,
      };
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              inputProps={{ minLength: 6 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Confirme sua senha"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              onBlur={(e) => {
                if (!validateCPF(e.target.value)) {
                  setCpfError('CPF inválido');
                } else {
                  setCpfError('');
                }
              }}
            >
              {() => (
                <Input
                  label="CPF"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  error={!!cpfError}
                  helperText={cpfError}
                />
              )}
            </InputMask>
            <FormControlLabel
              control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
              label="Eu aceito os termos de serviço"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2, width: '120px', height: '50px', borderRadius: '15px' }}
            >
              Cadastrar
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={handleBackClick}
              sx={{ mb: 2 }}
            >
              Voltar para Login
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
