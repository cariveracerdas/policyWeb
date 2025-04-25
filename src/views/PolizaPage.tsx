import { Typography, Container, Button } from '@mui/material';
import { PolizaTable } from '../components/PolizaTable';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export const PolizaPage: React.FC = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (!user) {
      navigate('/');
    }
  }, []);

  return (
    <Container  maxWidth={false}
    sx={{
      padding: 2,
      width: '100%'
    }}>
      <Button variant="outlined" color="error" onClick={logout}>
        Cerrar sesión
      </Button>
      <Typography variant="h4" gutterBottom>
        Módulo Pólizas
      </Typography>
      <PolizaTable />
    </Container>
  );
};
