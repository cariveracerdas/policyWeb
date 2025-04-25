import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Alert
} from '@mui/material';

import { useEffect, useState } from 'react';
import { SelectTipoPoliza } from './SelectTipoPoliza';
import { SelectEstado } from './SelectEstado';
import { SelectCobertura } from './SelectCobertura';
import { DatePickerVencimiento } from './DatePickerVencimiento';
import { CrearPolizaRequest } from '../models/CrearPolizaRequest';
import { crearOActualizarPoliza } from '../services/PolizaService';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: CrearPolizaRequest;
}

export const PolizaModal: React.FC<Props> = ({ open, onClose, onSuccess, initialData }) => {
    const [form, setForm] = useState<CrearPolizaRequest>({
        numeroPoliza: '',
        cedulaAsegurado: '',
        idTipoPoliza: 0,
        idEstadoPoliza: 0,
        idCobertura: 0,
        montoAsegurado: 0,
        fechaVencimiento: '',
        fechaEmision: '',
        fechaInclusion: '',
        periodo: '',
        prima: 0,
        aseguradora: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) setForm(initialData);
        else resetForm();
    }, [initialData, open]);

    const resetForm = () => {
        setForm({
            numeroPoliza: '',
            cedulaAsegurado: '',
            idTipoPoliza: 0,
            idEstadoPoliza: 0,
            idCobertura: 0,
            montoAsegurado: 0,
            fechaVencimiento: '',
            fechaEmision: '',
            fechaInclusion: '',
            periodo: '',
            prima: 0,
            aseguradora: '',
        });
    };
    const camposRequeridosCompletos = () => {
        const {
            numeroPoliza, cedulaAsegurado, idTipoPoliza, idEstadoPoliza, idCobertura,
            montoAsegurado, fechaVencimiento, fechaEmision, fechaInclusion,
            periodo, prima, aseguradora
        } = form;

        return (
            numeroPoliza.trim() !== '' &&
            cedulaAsegurado.trim() !== '' &&
            idTipoPoliza > 0 &&
            idEstadoPoliza > 0 &&
            idCobertura > 0 &&
            montoAsegurado > 0 &&
            fechaVencimiento !== '' &&
            fechaEmision !== '' &&
            fechaInclusion !== '' &&
            periodo.trim() !== '' &&
            prima > 0 &&
            aseguradora.trim() !== ''
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setError('');

        if (!camposRequeridosCompletos()) {
            setError('Todos los campos son requeridos.');
            return;
        }

        const confirmar = window.confirm('¿Deseas guardar esta póliza?');
        if (!confirmar) return;

        const result = await crearOActualizarPoliza(form);
        if (result.success) {
            onSuccess();
            onClose();
        } else {
            setError(result.message);
        }
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{form.idPoliza ? 'Modificar Póliza' : 'Crear Póliza'}</DialogTitle>
            <DialogContent dividers>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box display="flex" gap={2} mb={2}>
                    <TextField
                        label="Número de Póliza"
                        name="numeroPoliza"
                        value={form.numeroPoliza}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Cédula Asegurado"
                        name="cedulaAsegurado"
                        value={form.cedulaAsegurado}
                        onChange={handleChange}
                        fullWidth
                    />
                </Box>

                <Box display="flex" gap={2} mb={2}>
                    <SelectTipoPoliza value={form.idTipoPoliza} onChange={(v) => setForm({ ...form, idTipoPoliza: v })} />
                    <SelectCobertura value={form.idCobertura} onChange={(v) => setForm({ ...form, idCobertura: v })} />
                    <SelectEstado value={form.idEstadoPoliza} onChange={(v) => setForm({ ...form, idEstadoPoliza: v })} />
                </Box>

                <Box display="flex" gap={2} mb={2}>
                    <TextField
                        label="Monto Asegurado"
                        name="montoAsegurado"
                        type="number"
                        value={form.montoAsegurado}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Prima"
                        name="prima"
                        type="number"
                        value={form.prima}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Aseguradora"
                        name="aseguradora"
                        value={form.aseguradora}
                        onChange={handleChange}
                        fullWidth
                    />
                </Box>


                <Box display="flex" gap={2} mb={2}>
                    <DatePickerVencimiento
                        value={form.fechaVencimiento ? new Date(form.fechaVencimiento) : null}
                        onChange={(date) =>
                            setForm({ ...form, fechaVencimiento: date?.toISOString().split('T')[0] || '' })
                        }
                        label="Fecha Vencimiento"
                    />
                    <DatePickerVencimiento
                        value={form.fechaEmision ? new Date(form.fechaEmision) : null}
                        onChange={(date) =>
                            setForm({ ...form, fechaEmision: date?.toISOString().split('T')[0] || '' })
                        }
                        label="Fecha Emisión"
                    />
                    <DatePickerVencimiento
                        value={form.fechaInclusion ? new Date(form.fechaInclusion) : null}
                        onChange={(date) =>
                            setForm({ ...form, fechaInclusion: date?.toISOString().split('T')[0] || '' })
                        }
                        label="Fecha Inclusión"
                    />
                </Box>


                <Box mb={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                        <DatePicker
                            views={['year', 'month']}
                            label="Periodo"
                            value={form.periodo ? new Date(form.periodo) : null}
                            onChange={(date) =>
                                setForm({ ...form, periodo: date?.toISOString().split('T')[0] || '' })
                            }
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </LocalizationProvider>
                </Box>
            </DialogContent>


            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};
