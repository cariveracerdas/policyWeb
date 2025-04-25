import axios from 'axios';
import { CoberturaResponse } from '../models/CoberturaResponse';

const API_URL = 'https://localhost:7050/api/cobertura';

export const obtenerCoberturas = async (): Promise<CoberturaResponse[]> => {
  const res = await axios.get<CoberturaResponse[]>(API_URL);
  return res.data;
};
