import axios from 'axios';
import { TipoPolizaResponse } from '../models/tipoPolizaResponse';

const API_URL = 'https://localhost:7050/api/tipoPoliza';

export const obtenerTiposPoliza = async (): Promise<TipoPolizaResponse[]> => {
  const res = await axios.get<TipoPolizaResponse[]>(API_URL);
  return res.data;
};
