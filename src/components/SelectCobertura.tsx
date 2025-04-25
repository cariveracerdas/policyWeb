import { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { CoberturaResponse } from '../models/CoberturaResponse';
import { obtenerCoberturas } from '../services/coberturaService';

interface Props {
  value: number | null;
  onChange: (value: number) => void;
  label?: string;
  sx?: object; 
}

export const SelectCobertura: React.FC<Props> = ({ value, onChange, label = "Cobertura" , sx}) => {
  const [coberturas, setCoberturas] = useState<CoberturaResponse[]>([]);

  useEffect(() => {
    const cargar = async () => {
      const datos = await obtenerCoberturas();
      setCoberturas(datos);
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
      {coberturas.map((cob) => (
        <MenuItem key={cob.idCobertura} value={cob.idCobertura}>
          {cob.nombre}
        </MenuItem>
      ))}
    </TextField>
  );
};
