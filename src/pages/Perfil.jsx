import React, { useState } from 'react';
import { Container, Grid, Paper, Box, Avatar, Button, Typography, TextField, Divider, IconButton, InputAdornment, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'; 
import MuiAlert from '@mui/material/Alert';
import "../styles/pages.css";
import zIndex from '@mui/material/styles/zIndex';

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
});

const StyledContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '15px',
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
  height: '100%',
  width: '100%',
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  backgroundColor: 'white',
  height: '100%',
  zIndex: zIndex.modal,
});

const StyledAvatarBox = styled(Box)({
  display: 'flex',
  marginTop: '120px',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '10px'
});

const StyledButton = styled(Button)({
  marginBottom: '10px',
  marginTop: '10px',
});

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Fulano de Tal',
    email: 'fulano@example.com',
    password: 'fulano123',
    phone: '(00) 1234-5678',
    birthdate: '01/01/1990',
    cpf: '123.456.789-00',
    registrationNumber: '123456789',
  });
  const [initialUserData, setInitialUserData] = useState(userData);
  const [profileImage, setProfileImage] = useState('/path/to/default-profile-pic.jpg');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleEditClick = () => setEditing(true);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const updateUserData = (userData) => {
    console.log('Dados atualizados:', userData);
    setTimeout(() => {
      console.log('Dados enviados ao servidor.');
    }, 1000);
  };

  const validateForm = () => {
    const { name, email, phone, birthdate, cpf, registrationNumber } = userData;
    if (!name || !email || !phone || !birthdate || !cpf || !registrationNumber) {
      alert('Por favor, preencha todos os campos.');
      return false;
    }
    return true;
  };

  const navigateToHome = () => navigate('/home'); 

  const handleLogoutClick = () => setLogoutDialogOpen(true);

  const handleLogoutConfirm = () => {
    localStorage.removeItem('authToken'); // Exemplo de remover os dados rapaziada
    setLogoutDialogOpen(false);
  };

  const handleLogoutCancel = () => setLogoutDialogOpen(false);

  const handleSnackbarClose = () => setOpenSnackbar(false);

  return (
    <section>
      <StyledContainer>
        <StyledContent>
          <Grid container spacing={1} justifyContent="center">
            {/* Coluna da esquerda */}
            <Grid item xs={12} md={3}>
              <StyledPaper>
                <Box display="flex" flexDirection="column">
                  <StyledButton fullWidth variant="text" color="inherit" onClick={navigateToHome}>HOME</StyledButton>
                  <Divider />
                  <StyledButton fullWidth variant="text" color="inherit">AGENDAMENTOS</StyledButton>
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
                        id="upload-photo"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="upload-photo">
                        <Button variant="outlined" color="primary" component="span">
                          MUDAR FOTO
                        </Button>
                      </label>
                    </StyledAvatarBox>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5">Dados Pessoais</Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Nome"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Senha"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={userData.password}
                      onChange={handleChange}
                      disabled={!editing}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* Seção de dados adicionais */}
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Telefone"
                          name="phone"
                          value={userData.phone}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Data de Nascimento"
                          name="birthdate"
                          value={userData.birthdate}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="CPF"
                          name="cpf"
                          value={userData.cpf}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Número de Matrícula"
                          name="registrationNumber"
                          value={userData.registrationNumber}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Botão de atualizar perfil */}
                <Box textAlign="center" style={{ marginTop: '20px', marginLeft: '280px' }}>
                  {!editing ? (
                    <StyledButton variant="contained" color="primary" onClick={handleEditClick}>Editar Perfil</StyledButton>
                  ) : (
                    <StyledButton variant="contained" color="primary" onClick={handleConfirmClick} size="large">Confirmar Edição</StyledButton>
                  )}
                </Box>
              </StyledPaper>
            </Grid>
          </Grid>
        </StyledContent>
      </StyledContainer>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>{"Confirmar Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza de que deseja sair?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default ProfilePage;
