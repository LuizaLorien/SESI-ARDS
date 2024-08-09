import React, { useState, useCallback, memo } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//oi pessoal fiz alguns coments para voces conseguirem estudar um pouco do que fiz, ja que nao vou poder apresentar

// Estilização dos componentes usando MUI
const BodyLogin = styled('div')(({ theme }) => ({
  backgroundColor: '#ffffff',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
}));

const BackgroundImage = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '300px',
  height: '300px',
  [theme.breakpoints.down('md')]: {
    width: '200px',
    height: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    height: '150px',
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: 500,
  padding: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
}));

const StyledForm = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Input = styled(TextField)({
  width: '100%',
  margin: '8px 0',
});

const LoginTitle = styled(Typography)(({ theme }) => ({
  color: '#002B6D',
  fontFamily: 'Roboto, sans-serif',
  marginBottom: theme.spacing(3),
  fontSize: '2rem',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

// Componente principal de login
function ContainerLogin() {
  // Estados locais para email, senha, visibilidade da senha, mensagens de erro, snackbar e carregamento
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hook de navegação do React Router
  const navigate = useNavigate();

  // Função para validar o formato do email
  const validateEmail = useCallback((email) => /\S+@\S+\.\S+/.test(email), []);

  // Função que lida com o envio do formulário de login
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setLoading(true);

    // Validação do email
    if (!validateEmail(email)) {
      setErrorMessage('Email inválido');
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    // Verificação de credenciais do administrador
    if (email === 'admin@gmail.com' && password === 'admin000') {
      localStorage.setItem('user', JSON.stringify({ email, name: 'Admin', isAdmin: true }));
      setLoading(false);
      navigate('/controlerAdm');
      return;
    }

    // Recupera os usuários armazenados no localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find((user) => user.email === email && user.senha === password);

    // Verifica se o usuário foi encontrado
    if (user) {
      setErrorMessage('');
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      navigate(user.isAdmin ? '/controlerAdm' : '/home');
    } else {
      // Caso as credenciais sejam inválidas, exibe uma mensagem de erro
      setErrorMessage('Credenciais inválidas');
      setOpenSnackbar(true);
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  }, [email, password, navigate, validateEmail]);

  // Função para fechar o Snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Funções para mostrar/esconder a senha
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <BodyLogin>
      {/* Imagem de fundo */}
      <BackgroundImage src="./src/assets/sesi-senai.png" alt="Logo" loading="lazy" />
      <StyledContainer maxWidth="100%">
        <Content>
          {/* Título do login */}
          <LoginTitle variant="h1">Login</LoginTitle>
          {/* Formulário de login */}
          <StyledForm onSubmit={handleSubmit}>
            <Input
              label="Digite seu email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Digite sua senha"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
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
            {/* Botão de login */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: '100%', height: '50px' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Entrar'}
            </Button>
            {/* Botão para redirecionar ao cadastro */}
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate('/cadastro')}
              sx={{ mt: 2 }}
            >
              Quero me cadastrar
            </Button>
          </StyledForm>
        </Content>
      </StyledContainer>
      {/* Snackbar para exibir mensagens de erro */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </BodyLogin>
  );
}

// Utiliza memo para evitar renderizações desnecessárias
export default memo(ContainerLogin);
