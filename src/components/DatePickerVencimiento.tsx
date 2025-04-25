import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale';

interface Props {
  value: Date | null;
  onChange: (value: Date | null) => void;
  label?: string;
}

export const DatePickerVencimiento: React.FC<Props> = ({
  value,
  onChange,
  label = 'Fecha de Vencimiento'
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format="dd/MM/yyyy"
        slotProps={{
          textField: { 
            fullWidth: true,
            sx: { width: '500px' } 
          }
        }}
      />
    </LocalizationProvider>
  );
};
