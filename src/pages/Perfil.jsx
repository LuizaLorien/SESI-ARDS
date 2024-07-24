import React, { useState } from 'react';
import { Container, Grid, Paper, Box, Avatar, Button, Typography, TextField, Divider, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'; 
import "../styles/pages.css";

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
});

const StyledContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '15px',
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
  width: '100vw',
  maxHeight: 'calc(100vh - 40px)',
  overflowY: 'auto',
  position: 'relative',
  zIndex: 1,
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  backgroundColor: 'white',
  height: '100%',
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
    password: '********',
    phone: '(00) 1234-5678',
    birthdate: '01/01/1990',
    cpf: '123.456.789-00',
    registrationNumber: '123456789',
  });
  const [profileImage, setProfileImage] = useState('/path/to/default-profile-pic.jpg'); //Para armazenar a URL da imagem do perfil
  const navigate = useNavigate(); 

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleConfirmClick = () => {
    // GAlera do back end aqui é pra voces fazerem a logica pra puxar os dados do usuario
    updateUserData(userData); // simulação para atulizar os dados
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Ele puxa o dado da imagem
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result); // Muda o dado de acordo com a imagem que o usuarioe escolheu
    };

    if (file) {
      reader.readAsDataURL(file); // Converte para URL
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Função simulada para atualizar os dados no backend
  const updateUserData = (userData) => {
    // Simulação de uma requisição ao backend para atualizar os dados
    console.log('Dados atualizados:', userData);
    // Aqui você poderia fazer uma requisição HTTP para o backend
    // utilizando fetch, axios ou outra biblioteca para enviar os dados atualizados
    // e tratar possíveis erros ou feedbacks da atualização
    // Peguem essa ideia aq galera do back
  };

  const navigateToHome = () => {
    navigate('/home'); 
  };

  const navigateToLogin = () => {
    //Cpoloquem aqui no futuro a função para limpar os tokens e outras coisas assim que a pessoa sair da conta
    navigate('/login'); 
  };

  return (
    <section>
      <StyledContainer>
      <StyledContent>
        <Grid container spacing={1} justifyContent="center">
          {/* Coluna da esquerda */}
          <Grid item xs={12} md={3}>
            <StyledPaper>
              <Box display="flex" flexDirection="column">
                <StyledButton fullWidth variant="text" color="inherit" disableRipple onClick={navigateToHome}>HOME</StyledButton>
                <Divider />
                <StyledButton fullWidth variant="text" color="inherit" disableRipple>AGENDAMENTOS</StyledButton>
                <Divider />
                <StyledButton fullWidth variant="text" color="inherit" disableRipple onClick={navigateToLogin}>SAIR</StyledButton>
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
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
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
              <Box textAlign="center" style={{ marginTop: '20px' }}>
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
    </section>
    
  );
};

export default ProfilePage;
