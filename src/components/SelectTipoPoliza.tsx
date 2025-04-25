import { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { TipoPolizaResponse } from '../models/tipoPolizaResponse';
import { obtenerTiposPoliza } from '../services/tipoPolizaService';

interface Props {
  value: number | null;
  onChange: (value: number) => void;
  label?: string;
  sx?: object; 
}

export const SelectTipoPoliza: React.FC<Props> = ({ value, onChange, label = "Tipo de Póliza", sx  }) => {
  const [tipos, setTipos] = useState<TipoPolizaResponse[]>([]);

  useEffect(() => {
    const cargar = async () => {
      const datos = await obtenerTiposPoliza();
      setTipos(datos);
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
      {tipos.map((tipo) => (
        <MenuItem key={tipo.idTipoPoliza} value={tipo.idTipoPoliza}>
          {tipo.nombre}
        </MenuItem>
      ))}
    </TextField>
  );
};
