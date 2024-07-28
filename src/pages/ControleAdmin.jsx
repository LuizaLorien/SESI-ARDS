import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button, Switch, Modal, TextField, Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ControleAdminContainer = styled(Box)({
  backgroundColor: '#7da0ca',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minHeight: '100%',
  paddingTop: '20px',
});

const InnerDiv = styled(Box)({
  backgroundColor: '#fff',
  width: '100vh',
  maxWidth: '1440px',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: '20px',
});

const SectionTitle = styled(Typography)({
  color: '#000',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 700,
  fontSize: '32px',
  marginBottom: '20px',
  textAlign: 'center',
});

const Text = styled(Typography)({
  color: '#000',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '10px',
  textAlign: 'left',
});

const ProfileImage = styled('img')({
  borderRadius: '50%',
  width: '120px',
  height: '120px',
  marginBottom: '10px',
});

const CustomButton = styled(Button)({
  backgroundColor: '#0053d3',
  color: '#fff',
  borderRadius: '10px',
  padding: '10px 20px',
  fontWeight: 700,
  fontSize: '16px',
  marginTop: '10px',
});

const ButtonWithSwitch = ({ label, on, onToggle }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
    <Typography>{label}</Typography>
    <Switch checked={on} onChange={onToggle} />
  </Box>
);

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateName = (name) => {
  const re = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
  return re.test(name);
};

const AddUserModal = ({ open, onClose, onSave }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSave = () => {
    if (!validateName(userName) || !validateEmail(userEmail) || userPassword.length < 6) {
      onSave(null);
    } else {
      onSave({ name: userName, email: userEmail, senha: userPassword, isAdmin });
      setUserName('');
      setUserEmail('');
      setUserPassword('');
      setIsAdmin(false);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bgcolor="white"
        padding="20px"
        borderRadius="10px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        width="400px"
      >
        <Typography variant="h6" marginBottom="20px">Adicionar Usuário</Typography>
        <TextField
          label="Nome"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          margin="normal"
          error={!validateName(userName) && userName.length > 0}
          helperText={!validateName(userName) && userName.length > 0 ? 'Nome inválido. Use apenas letras e espaços.' : ''}
        />
        <TextField
          label="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          fullWidth
          margin="normal"
          error={!validateEmail(userEmail) && userEmail.length > 0}
          helperText={!validateEmail(userEmail) && userEmail.length > 0 ? 'Email inválido.' : ''}
        />
        <TextField
          label="Senha"
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          fullWidth
          margin="normal"
          error={userPassword.length > 0 && userPassword.length < 6}
          helperText={userPassword.length > 0 && userPassword.length < 6 ? 'Senha deve ter pelo menos 6 caracteres.' : ''}
        />
        <Box display="flex" alignItems="center" marginTop="10px">
          <Typography>Administrador</Typography>
          <Switch checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%" marginTop="20px">
          <CustomButton variant="contained" onClick={handleSave}>Salvar</CustomButton>
          <Button variant="outlined" onClick={onClose}>Cancelar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

const ControleAdmin = () => {
  const [adminData, setAdminData] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (data) {
      setAdminData(data);
    }
    setUsers(storedUsers);
  }, []);

  const handleAddUser = (newUser) => {
    if (newUser) {
      const emailExists = users.some(user => user.email === newUser.email);
      if (emailExists) {
        setSnackbar({ open: true, message: 'Email já cadastrado. Por favor, use um email diferente.', severity: 'error' });
      } else {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setSnackbar({ open: true, message: 'Novo usuário adicionado!', severity: 'success' });
      }
    } else {
      setSnackbar({ open: true, message: 'Por favor, preencha todos os campos corretamente.', severity: 'error' });
    }
  };

  const handleSelectUser = (user) => {
    if (selectedUser && selectedUser.email === user.email) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
      setEditProfile(user.permissions.editProfile);
      setDeleteProfile(user.permissions.deleteProfile);
      setAddUser(user.permissions.addUser);
    }
  };

  const handleSavePermissions = () => {
    if (selectedUser) {
      const updatedUsers = users.map(user =>
        user.email === selectedUser.email
          ? { ...user, permissions: { editProfile, deleteProfile, addUser } }
          : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setSelectedUser(null);
      setSnackbar({ open: true, message: 'Permissões atualizadas!', severity: 'success' });
    }
  };

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setSelectedUser(null); 
    setSnackbar({ open: true, message: 'Usuário excluído!', severity: 'success' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ControleAdminContainer>
      <InnerDiv>
        <SectionTitle>Controle de Usuários</SectionTitle>
        <Box display="flex" flexDirection="column" alignItems="center">
          <ProfileImage src='../assets/sesi-senai.png' alt="Profile" />
          {adminData && !selectedUser && (
            <>
              <Typography variant="h6" marginBottom="10px">{adminData.name}</Typography>
            </>
          )}
          <CustomButton variant="contained" onClick={() => setModalOpen(true)}>Adicionar Usuário</CustomButton>
        </Box>
        <AddUserModal open={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleAddUser} />
        
        {/* Lista de Usuários */}
        <Box marginTop="20px">
          {users.map((user, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom="10px"
              bgcolor={selectedUser?.email === user.email ? '#e0f7fa' : 'transparent'}
              onClick={() => handleSelectUser(user)}
              sx={{ cursor: 'pointer', padding: '10px', borderRadius: '10px' }}
            >
              <Box display="flex" alignItems="center">
                <ProfileImage src='../assets/default-user.png' alt="User" />
                <Box marginLeft="10px">
                  <Text>{user.name}</Text>
                  <Typography>{user.email}</Typography>
                </Box>
              </Box>
              <IconButton onClick={(e) => {
                e.stopPropagation();
                handleDeleteUser(user.email);
              }}>
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        {/* Descrição do ADMINISTRADOR */}
        {selectedUser && (
          <Box marginTop="20px">
            <Text>Permissões para {selectedUser.name}</Text>
            <Box>
              <ButtonWithSwitch
                label="Excluir Perfil"
                on={deleteProfile}
                onToggle={() => setDeleteProfile(!deleteProfile)}
              />
              <ButtonWithSwitch
                label="Editar Perfil"
                on={editProfile}
                onToggle={() => setEditProfile(!editProfile)}
              />
              <ButtonWithSwitch
                label="Adicionar Usuário"
                on={addUser}
                onToggle={() => setAddUser(!addUser)}
              />
            </Box>
            <CustomButton variant="contained" onClick={handleSavePermissions}>Salvar Permissões</CustomButton>
          </Box>
        )}
      </InnerDiv>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ControleAdminContainer>
  );
};

export default ControleAdmin;
