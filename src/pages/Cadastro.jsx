import React, { useState, useCallback } from 'react';
import { Container, Box, TextField, Button, Typography, Snackbar, Alert, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import "../styles/pages.css";
import { validateCPF, validatePasswordComplexity } from '../utils/validation'; // Importa funções de validação de um arquivo externo

// Estiliza o Container principal usando MUI system
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

// Estiliza o Box que contém o conteúdo do formulário
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

// Estiliza o formulário
const StyledForm = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
});

// Estiliza os campos de entrada
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

// Estiliza o título do cadastro
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

// Estiliza a imagem de fundo
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

// Componente principal do formulário de cadastro
const ContainerCadastro = () => {
  // Estado para armazenar os valores dos campos e mensagens de erro
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  // Função para validar o formulário
  const validateForm = useCallback(() => {
    let isValid = true;
    setCpfError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Valida CPF
    if (!validateCPF(cpf)) {
      setCpfError('CPF inválido');
      isValid = false;
    }

    // Verifica se o email já está cadastrado
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.some(user => user.email === email)) {
      setEmailError('Email já cadastrado');
      isValid = false;
    }

    // Valida email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email inválido');
      isValid = false;
    }

    // Valida senha
    if (!password || password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
      isValid = false;
    } else if (!validatePasswordComplexity(password)) {
      setPasswordError('A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais');
      isValid = false;
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setConfirmPasswordError('As senhas não coincidem');
      isValid = false;
    }

    // Verifica se os termos foram aceitos
    if (!termsAccepted) {
      setSnackbarMessage('Você deve aceitar os termos de serviço');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      isValid = false;
    }

    return isValid;
  }, [cpf, email, password, confirmPassword, termsAccepted]);

  // Função para enviar o formulário
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (validateForm()) {
      // Adiciona novo usuário ao localStorage
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

      // Exibe mensagem de sucesso
      setSnackbarMessage('Cadastro realizado com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      navigate('/login');
    } else {
      // Exibe mensagem de erro
      setSnackbarMessage('Por favor, corrija os erros no formulário.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [validateForm, email, password, cpf, navigate]);

  // Função para voltar à tela de login
  const handleBackClick = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  // Função para fechar a snackbar
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
            {/* Campo para o nome completo */}
            <Input
              label="Nome Completo"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            {/* Campo para o email */}
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
            {/* Campo para a senha */}
            <Input
              label="Digite sua senha"
              type="password"  // Sempre exibe como senha
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
            {/* Campo para confirmar a senha */}
            <Input
              label="Confirme sua senha"
              type="password"  // Sempre exibe como senha
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
            {/* Campo para o CPF com máscara */}
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
            {/* Checkbox para aceitar os termos de serviço */}
            <FormControlLabel
              control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
              label="Eu aceito os termos de serviço"
            />
            {/* Botão para submeter o formulário */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2, width: '120px', height: '50px', borderRadius: '15px' }}
            >
              Cadastrar
            </Button>
            {/* Botão para voltar ao login */}
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
      {/* Snackbar para exibir mensagens de sucesso ou erro */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

// Exporta o componente memoizado para evitar renderizações desnecessárias
export default React.memo(ContainerCadastro);
