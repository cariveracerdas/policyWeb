import { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { EstadoPolizaResponse } from '../models/EstadoPolizaResponse';
import { obtenerEstadosPoliza } from '../services/estadoPolizaService';

interface Props {
  value: number | null;
  onChange: (value: number) => void;
  label?: string;
  sx?: object; 
}

export const SelectEstado: React.FC<Props> = ({ value, onChange, label = "Estado de Póliza", sx }) => {
  const [estados, setEstados] = useState<EstadoPolizaResponse[]>([]);

  useEffect(() => {
    const cargar = async () => {
      const datos = await obtenerEstadosPoliza();
      setEstados(datos);
    };
    cargar();
  }, []);

  return (
    <TextField
      select
      fullWidth
      label={label}
      value={value ?? ''}
      sx={{ ...sx, width: '500px' }}
      onChange={(e) => onChange(parseInt(e.target.value))}
    >
      {estados.map((estado) => (
        <MenuItem key={estado.idEstado} value={estado.idEstado}>
          {estado.nombre}
        </MenuItem>
      ))}
    </TextField>
  );
};
