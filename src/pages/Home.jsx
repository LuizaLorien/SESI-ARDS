import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Importação do hook useNavigate
import "../styles/pages.css";

// Estilização dos componentes
const MainContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#acc3de',
  height: '100%',
  width: '100%',
  padding: 0,
  margin: 0,
  boxSizing: 'border-box',
}));

const GradientBackground = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: 340,
  background: 'linear-gradient(180deg, rgb(0,19.38,48.87) 0%, rgb(0,59.83,150.87) 100%)',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
  boxSizing: 'border-box',
}));

const ButtonBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 161,
  height: 60,
  marginLeft: 50,
  marginTop: theme.spacing(2)
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(8),
  padding: theme.spacing(1),
  boxSizing: 'border-box',
}));

const InfoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxSizing: 'border-box',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  width: '80vh',
  backgroundColor: '#004598',
  color: 'white',
  boxShadow: '0px 4px 35px rgba(0,0,0,0.25)',
  borderRadius: 8,
  padding: theme.spacing(2),
  boxSizing: 'border-box',
}));

const PropositoBox = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: 8,
  padding: theme.spacing(2),
  boxSizing: 'border-box',
}));

const ContribuicoesBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 500,
  backgroundColor: '#fff',
  boxShadow: '0px 4px 35px rgba(0,0,0,0.25)',
  borderRadius: 8,
  marginLeft: -350,
  padding: theme.spacing(2),
  boxSizing: 'border-box',
  marginTop: theme.spacing(2),
}));

const HomeLogado = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleButtonClick = () => {
    navigate('/cliente-calendario'); // Navega para a página /cliente-calendario
  };

  return (
    <body className='bodyHome'>
      <MainContainer disableGutters maxWidth="100%" maxHeight="100%">
        <GradientBackground>
          <Typography sx={{ fontFamily: 'Inter-SemiBold, Helvetica', fontWeight: '600', color: 'white', fontSize: '2.5rem', marginBottom: 2, marginLeft: 6 }}>
            O que é
          </Typography>
          <Typography sx={{ fontFamily: 'Inter-Regular, Helvetica', color: 'white', fontSize: '0.875rem', marginBottom: 2, marginLeft: 6 }}>
            SESI ARDS é uma plataforma digital inovadora criada para facilitar a comunicação entre pais de alunos e a equipe educacional. O sistema permite que os pais agendem reuniões de forma prática e acessível com diretores, professores e outras lideranças escolares. Através de uma interface amigável e recursos inteligentes, o SESI ARDS melhora a organização interna das escolas, garantindo uma distribuição equitativa dos atendimentos e promovendo uma comunicação mais transparente e eficiente.
          </Typography>
          <ButtonBox>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#0fca37', color: 'white', fontSize: '1.25rem', width: '170px', height: '50px' }}
              onClick={handleButtonClick} // Adiciona o manipulador de clique
            >
              Agende - já
            </Button>
          </ButtonBox>
        </GradientBackground>
        <ContentContainer>
          <InfoContainer>
            <PropositoBox>
              <Typography sx={{ fontFamily: 'Inter-SemiBold, Helvetica', fontWeight: '600', color: '#001330', fontSize: '2.5rem', marginLeft: 6 }}>
                Proposito
              </Typography>
              <Typography sx={{ fontFamily: 'Inter-Regular, Helvetica', color: '#001330', fontSize: '0.875rem', marginTop: 1, marginLeft: 6 }}>
                O propósito do SESI ARDS é simplificar e otimizar a interação entre pais e a equipe educacional, proporcionando uma plataforma digital que facilita o agendamento de reuniões. Ao promover uma comunicação mais eficiente, o SESI ARDS busca fortalecer a colaboração entre a comunidade escolar e contribuir para o sucesso acadêmico dos alunos.
              </Typography>
            </PropositoBox>
            <ContentBox>
              <Typography sx={{ fontFamily: 'Inter-SemiBold, Helvetica', fontWeight: '600', fontSize: '2.5rem' }}>
                Diferenciais
              </Typography>
              <Typography sx={{ fontFamily: 'Inter-Regular, Helvetica', fontSize: '0.875rem' }}>
                Design fácil de usar que simplifica o agendamento de reuniões.
              </Typography>
              <Typography sx={{ fontFamily: 'Inter-Regular, Helvetica', fontSize: '0.875rem' }}>
                Ferramentas para organizar e otimizar os horários de atendimento.
              </Typography>
              <Typography sx={{ fontFamily: 'Inter-Regular, Helvetica', fontSize: '0.875rem' }}>
                Disponível a qualquer hora, oferecendo flexibilidade para os usuários
              </Typography>
              <Typography sx={{ fontFamily: 'Inter-Regular, Helvetica', fontSize: '0.875rem' }}>
                Facilita a comunicação clara entre pais e equipe educacional.
              </Typography>
              <Typography sx={{ fontFamily: 'Inter-Regular, Helvetica', fontSize: '0.875rem' }}>
                Compatível com diversos dispositivos, garantindo acesso fácil e rápido.
              </Typography>
            </ContentBox>
          </InfoContainer>
          <ContribuicoesBox>
            <Typography sx={{ fontFamily: 'Inter-SemiBold, Helvetica', fontWeight: '600', color: '#001330', fontSize: '2.5rem' }}>
              Contribuições
            </Typography>
            <Typography sx={{ fontFamily: 'Inter-Regular, Helvetica', color: '#001330', fontSize: '0.875rem', marginTop: 1 }}>
              O SESI ARDS facilita a comunicação entre pais e educadores, promovendo um diálogo mais frequente e produtivo, o que contribui diretamente para o sucesso acadêmico e o desenvolvimento integral dos alunos.
            </Typography>
          </ContribuicoesBox>
        </ContentContainer>
      </MainContainer>
    </body>
  );
};

export default HomeLogado;
