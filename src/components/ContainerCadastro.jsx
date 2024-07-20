import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
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
  width: '95%',
  '& .MuiInputBase-input': {
    padding: '10px',
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
  const [cpfError, setCpfError] = useState('');
  const navigate = useNavigate(); // inicializar a navegação do usuario

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCPF(cpf)) {
      setCpfError('CPF inválido');
    } else {
      setCpfError('');
    }
    navigate('/login'); // apos cadastrar retornar o usuario para a tela de login e assim ele logar com os dados cadastrados
  };

  const handleBackClick = () => {
    navigate('/login'); // pra quando voltar para a tela de login
    
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
            />
            <Input
              label="Digite sua senha"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              inputProps={{ minLength: 6 }}
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
              sx={{ mt: 2, mb: 2, width: '120px', height: '50px', borderRadius: '15px' }}> Cadastrar </Button>
            <Button
              variant="text"
              color="primary"
              onClick={handleBackClick}
              sx={{ mb: 2 }}> Voltar para o Login </Button>
          </StyledForm>
        </Content>
      </StyledContainer>
    </>
  );
}

export default ContainerCadastro;
