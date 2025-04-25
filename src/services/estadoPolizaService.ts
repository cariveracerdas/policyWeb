import axios from 'axios';
import { EstadoPolizaResponse } from '../models/EstadoPolizaResponse';

const API_URL = 'https://localhost:7050/api/estadoPoliza';

export const obtenerEstadosPoliza = async (): Promise<EstadoPolizaResponse[]> => {
  const res = await axios.get<EstadoPolizaResponse[]>(API_URL);
  return res.data;
};
