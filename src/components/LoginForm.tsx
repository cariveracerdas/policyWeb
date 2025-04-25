import { useState, FormEvent } from 'react';
import { TextField, Button, Typography, Box, Alert, Paper } from '@mui/material';
import { login } from '../services/LoginService';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (!username || !password) return;

    const res = await login(username, password);
    if (res.success) {
      localStorage.setItem('usuario', username);
      navigate('/polizas');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',  
        backgroundColor: '#ffe0b2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: '#fff3e0'
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          Iniciar sesión
        </Typography>

        {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

        <TextField
          label="Usuario"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={submitted && !username}
          helperText={submitted && !username ? 'El usuario es requerido' : ''}
        />

        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={submitted && !password}
          helperText={submitted && !password ? 'La contraseña es requerida' : ''}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Iniciar sesión
        </Button>
      </Paper>
    </Box>
  );
};
