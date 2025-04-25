import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Box, Button, Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { eliminarPoliza, filtrarPolizas } from '../services/PolizaService';
import { GetPolizaRequest } from '../models/GetPolizaRequest';
import { PolizaResponse } from '../models/PolizaResponse';
import { CrearPolizaRequest } from '../models/CrearPolizaRequest';
import { PolizaModal } from './PolizaModal';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { SelectTipoPoliza } from './SelectTipoPoliza';
import { DatePickerVencimiento } from './DatePickerVencimiento';

export const PolizaTable: React.FC = () => {
  const [polizas, setPolizas] = useState<PolizaResponse[]>([]);
  const [filtro, setFiltro] = useState<GetPolizaRequest>({});
  const [openModal, setOpenModal] = useState(false);
  const [limpiar, setLimpiar] = useState(false);
  const [polizaEdit, setPolizaEdit] = useState<CrearPolizaRequest | undefined>(undefined);

  const cargarPolizas = async () => {
    setLimpiar(false)
    const result = await filtrarPolizas(filtro);
    setPolizas(result);
  };

  const handleLimpiar = () => {
    setFiltro({});
    setLimpiar(true);
  };

  useEffect(() => {
    cargarPolizas();
  }, []);

  useEffect(() => {
    if (filtro && limpiar) { 
      cargarPolizas();
    }
  }, [filtro , limpiar]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  const handleEliminar = async (id: number) => {
    const confirm = window.confirm('¿Estás seguro que deseas eliminar esta póliza?');
    if (!confirm) return;

    const exito = await eliminarPoliza(id);
    if (exito) cargarPolizas();
    else alert('Error al eliminar la póliza');
  };

  const handleCrear = () => {
    setPolizaEdit(undefined);
    setOpenModal(true);
  };

  const handleModificar = (data: PolizaResponse) => {
    const editable: CrearPolizaRequest = {
      idPoliza: data.idPoliza,
      numeroPoliza: data.numeroPoliza,
      cedulaAsegurado: data.cedulaAsegurado,
      idTipoPoliza: data.idTipoPoliza,
      idEstadoPoliza: data.idEstadoPoliza,
      idCobertura: data.idCobertura,
      montoAsegurado: data.montoAsegurado,
      fechaVencimiento: data.fechaVencimiento,
      fechaEmision: data.fechaEmision,
      fechaInclusion: data.fechaInclusion,
      periodo: data.periodo,
      prima: data.prima,
      aseguradora: data.aseguradora
    };
    setPolizaEdit(editable);
    setOpenModal(true);
  };

  return (
    <Box sx={{ padding: 2}}>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5">Gestión de Pólizas</Typography>
        <Button variant="contained" color="success" onClick={handleCrear}>
          Crear Nueva Póliza
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        <TextField
          label="Número de Póliza"
          name="numeroPoliza"
          value={filtro.numeroPoliza || ''}
          onChange={handleChange}
          sx={{ minWidth: '150px' }}
        />
        <TextField
          label="Cédula"
          name="cedulaAsegurado"
          value={filtro.cedulaAsegurado || ''}
          onChange={handleChange}
          sx={{ minWidth: '150px' }}
        />
        <TextField
          label="Nombre o Apellidos"
          name="nombreCompleto"
          value={filtro.nombreCompleto || ''}
          onChange={handleChange}
          sx={{ minWidth: '150px' }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        <SelectTipoPoliza
          value={filtro.idTipoPoliza || 0}
          onChange={(val) => setFiltro({ ...filtro, idTipoPoliza: val })}
          sx={{ minWidth: '150px' }}
        />
        <DatePickerVencimiento
          value={filtro.fechaVencimiento ? new Date(filtro.fechaVencimiento) : null}
          onChange={(date) =>
            setFiltro({
              ...filtro,
              fechaVencimiento: date?.toISOString().split('T')[0] || ''
            })
          }
          label="Fecha Vencimiento"
        />
        <Button variant="contained" onClick={cargarPolizas} sx={{ alignSelf: 'center', minWidth: '100px' }}>
          Buscar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLimpiar}
          sx={{ alignSelf: 'center', minWidth: '100px' }}
        >
          Limpiar
        </Button>
      </Box>

      {polizas.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">
          No se encontraron pólizas con los criterios ingresados.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Número</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Cédula</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Vencimiento</TableCell>
                <TableCell>Emisión</TableCell>
                <TableCell>Cobertura</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Prima</TableCell>
                <TableCell>Periodo</TableCell>
                <TableCell>Inclusión</TableCell>
                <TableCell>Aseguradora</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {polizas.map((p) => (
                <TableRow key={p.idPoliza}>
                  <TableCell>{p.numeroPoliza}</TableCell>
                  <TableCell>{p.tipoPoliza}</TableCell>
                  <TableCell>{p.cedulaAsegurado}</TableCell>
                  <TableCell>₡{p.montoAsegurado.toLocaleString()}</TableCell>
                  <TableCell>{new Date(p.fechaVencimiento).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(p.fechaEmision).toLocaleDateString()}</TableCell>
                  <TableCell>{p.cobertura}</TableCell>
                  <TableCell>{p.estadoPoliza}</TableCell>
                  <TableCell>₡{p.prima.toLocaleString()}</TableCell>
                  <TableCell>
                    {p.periodo
                      ? format(new Date(p.periodo), 'MMMM yyyy', { locale: es })
                      : ''}
                  </TableCell>
                  <TableCell>{new Date(p.fechaInclusion).toLocaleDateString()}</TableCell>
                  <TableCell>{p.aseguradora}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleModificar(p)}
                    >
                      Modificar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleEliminar(p.idPoliza)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <PolizaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={cargarPolizas}
        initialData={polizaEdit}
      />
    </Box>
  );
};
