import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Box,
  Avatar,
  Button,
  Typography,
  TextField,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { styled } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import * as EmailValidator from 'email-validator';
import "../styles/pages.css"

//oi pessoal fiz alguns coments para voces conseguirem estudar um pouco do que fiz, ja que nao vou poder apresentar

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100vw',
  paddingTop: '20px',
  paddingBottom: '60px',
  backgroundColor: '#7da0ca',
});

const StyledContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '15px',
  height: '100%',
  width: '100%',
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  backgroundColor: 'white',
  height: '100%',
});

const StyledAvatarBox = styled(Box)({
  display: 'flex',
  marginTop: '30px',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '10px'
});

const StyledButton = styled(Button)({
  marginBottom: '10px',
  marginTop: '10px',
});

// Componente principal da página de perfil
const ProfilePage = () => {
  const [editing, setEditing] = useState(false); // Estado para controlar o modo de edição
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthdate: '',
    cpf: '',
    registrationNumber: '',
  });
  const [initialUserData, setInitialUserData] = useState(userData); // Dados iniciais do usuário
  const [profileImage, setProfileImage] = useState('/path/to/default-profile-pic.jpg'); // Imagem de perfil
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para controle do Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensagem do Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Gravidade da mensagem do Snackbar
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // Estado para controle do diálogo de logout
  const [emailError, setEmailError] = useState(''); // Mensagem de erro para o campo de email
  const [passwordError, setPasswordError] = useState(''); // Mensagem de erro para o campo de senha
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); // Mensagem de erro para o campo de confirmação de senha
  const [phoneError, setPhoneError] = useState(''); // Mensagem de erro para o campo de telefone
  const [nameError, setNameError] = useState(''); // Mensagem de erro para o campo de nome
  const [cpfError, setCpfError] = useState(''); // Mensagem de erro para o campo de CPF
  const [registrationNumberError, setRegistrationNumberError] = useState(''); // Mensagem de erro para o campo de número de matrícula
  const navigate = useNavigate();

  // Efeito para carregar dados do usuário quando o componente é montado
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
      setInitialUserData(user);
    }
  }, []);

  // Função para habilitar o modo de edição
  const handleEditClick = () => setEditing(true);

  // Função para confirmar as alterações e atualizar os dados
  const handleConfirmClick = () => {
    if (validateForm()) {
      updateUserData(userData);
      setEditing(false);
      setSnackbarMessage('Dados atualizados com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setInitialUserData(userData);
    }
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para lidar com a mudança da imagem de perfil
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Função para alternar a visibilidade da senha
  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Função para atualizar os dados do usuário no armazenamento local
  const updateUserData = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('Dados atualizados:', userData);
    setTimeout(() => {
      console.log('Dados enviados ao servidor.');
    }, 1000);
  };

  // Função para validar o formulário
  const validateForm = () => {
    let isValid = true;

    // Validação do email
    if (!EmailValidator.validate(userData.email)) {
      setEmailError('Email inválido');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validação da senha
    if (userData.password.length < 8) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres');
      isValid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(userData.password)) {
      setPasswordError('A senha deve ter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Validação da confirmação de senha
    if (userData.password !== userData.confirmPassword) {
      setConfirmPasswordError('As senhas não correspondem');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    // Validação do telefone
    if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(userData.phone)) {
      setPhoneError('Número de telefone inválido. Deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    // Validação do nome
    if (userData.name.length < 2) {
      setNameError('O nome deve ter pelo menos 2 caracteres');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validação do CPF
    if (!/^\d{11}$/.test(userData.cpf)) {
      setCpfError('CPF inválido. Deve ter exatamente 11 dígitos.');
      isValid = false;
    } else {
      setCpfError('');
    }

    // Validação do número de matrícula
    if (!/^\d{9}$/.test(userData.registrationNumber)) {
      setRegistrationNumberError('Número de matrícula inválido. Deve ter exatamente 9 dígitos.');
      isValid = false;
    } else {
      setRegistrationNumberError('');
    }

    // Validação geral para campos obrigatórios
    const { name, phone, birthdate, cpf, registrationNumber } = userData;
    if (!name || !phone || !birthdate || !cpf || !registrationNumber) {
      setSnackbarMessage('Por favor, preencha todos os campos obrigatórios.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      isValid = false;
    }

    return isValid;
  };

  // Função para navegar para a página inicial
  const navigateToHome = () => navigate('/home');
  
  // Função para navegar para a página de agendamentos
  const navigateToCalendar = () => navigate('/cliente-calendario');

  // Função para abrir o diálogo de logout
  const handleLogoutClick = () => setLogoutDialogOpen(true);

  // Função para confirmar o logout
  const handleLogoutConfirm = () => {
    navigate('/login');
    localStorage.removeItem('user'); // Remove os dados do usuário no logout
    setLogoutDialogOpen(false);
  };

  // Função para cancelar o logout
  const handleLogoutCancel = () => setLogoutDialogOpen(false);

  // Função para fechar o Snackbar
  const handleSnackbarClose = () => setOpenSnackbar(false);

  return (
    <body className='bodyPerfil'>
      <StyledContainer>
        <StyledContent >
          <Grid container spacing={1.5} justifyContent="center">
            {/* Coluna da esquerda */}
            <Grid item xs={12} md={3}>
              <StyledPaper>
                <Box display="flex" flexDirection="column">
                  <StyledButton fullWidth variant="text" color="inherit" onClick={navigateToHome}>HOME</StyledButton>
                  <Divider />
                  <StyledButton fullWidth variant="text" color="inherit" onClick={navigateToCalendar}>AGENDAMENTOS</StyledButton>
                  <Divider />
                  <StyledButton fullWidth variant="text" color="inherit" onClick={handleLogoutClick}>SAIR</StyledButton>
                </Box>
              </StyledPaper>
            </Grid>
            {/* Coluna da direita */}
            <Grid item xs={12} md={9}>
              <StyledPaper>
                <Grid container spacing={3}>
                  {/* Seção da foto de perfil e dados pessoais */}
                  <Grid item xs={12} md={4}>
                    <StyledAvatarBox>
                      <Box textAlign="center" style={{ marginBottom: '40px' }}>
                        <Avatar alt="Profile Picture" src={profileImage} sx={{ width: '200px', height: '190px' }} />
                      </Box>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="profile-picture-input"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="profile-picture-input">
                        <Button variant="contained" component="span" style={{ marginBottom: '20px' }}>
                          Alterar Foto
                        </Button>
                      </label>
                    </StyledAvatarBox>
                  </Grid>

                  {/* Seção dos dados do perfil */}
                  <Grid item xs={12} md={8}>
                    <StyledPaper>
                      <Box display="flex" flexDirection="column" padding="20px">
                        <Typography variant="h5" fontWeight="bold" marginBottom="20px">
                          Dados do Perfil
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Nome"
                              variant="outlined"
                              name="name"
                              value={userData.name}
                              onChange={handleChange}
                              disabled={!editing}
                              error={!!nameError}
                              helperText={nameError}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Email"
                              variant="outlined"
                              name="email"
                              value={userData.email}
                              onChange={handleChange}
                              disabled={!editing}
                              error={!!emailError}
                              helperText={emailError}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Senha"
                              variant="outlined"
                              name="password"
                              type={showPassword ? 'text' : 'password'}
                              value={userData.password}
                              onChange={handleChange}
                              disabled={!editing}
                              error={!!passwordError}
                              helperText={passwordError}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      edge="end"
                                      onClick={handleTogglePasswordVisibility}
                                      onMouseDown={(e) => e.preventDefault()}
                                    >
                                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Confirmar Senha"
                              variant="outlined"
                              name="confirmPassword"
                              type={showPassword ? 'text' : 'password'}
                              value={userData.confirmPassword}
                              onChange={handleChange}
                              disabled={!editing}
                              error={!!confirmPasswordError}
                              helperText={confirmPasswordError}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Telefone"
                              variant="outlined"
                              name="phone"
                              value={userData.phone}
                              onChange={handleChange}
                              disabled={!editing}
                              error={!!phoneError}
                              helperText={phoneError}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Data de Nascimento"
                              variant="outlined"
                              name="birthdate"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              value={userData.birthdate}
                              onChange={handleChange}
                              disabled={!editing}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="CPF"
                              variant="outlined"
                              name="cpf"
                              value={userData.cpf}
                              onChange={handleChange}
                              disabled={!editing}
                              error={!!cpfError}
                              helperText={cpfError}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Número de Matrícula"
                              variant="outlined"
                              name="registrationNumber"
                              value={userData.registrationNumber}
                              onChange={handleChange}
                              disabled={!editing}
                              error={!!registrationNumberError}
                              helperText={registrationNumberError}
                            />
                          </Grid>
                        </Grid>
                        <Box textAlign="center" marginTop="20px">
                          {editing ? (
                            <>
                              <Button variant="contained" color="primary" onClick={handleConfirmClick}>
                                Confirmar
                              </Button>
                              <Button variant="outlined" color="secondary" onClick={() => setEditing(false)} style={{ marginLeft: '10px' }}>
                                Cancelar
                              </Button>
                            </>
                          ) : (
                            <Button variant="contained" color="primary" onClick={handleEditClick}>
                              Editar
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </StyledPaper>
                  </Grid>
                </Grid>
              </StyledPaper>
            </Grid>
          </Grid>
        </StyledContent>
      </StyledContainer>

      {/* Snackbar de Notificação */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      {/* Dialog de Logout */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Confirmar Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja sair?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancelar</Button>
          <Button onClick={handleLogoutConfirm} color="primary">Sair</Button>
        </DialogActions>
      </Dialog>
    </body>
  );
};

export default ProfilePage;
