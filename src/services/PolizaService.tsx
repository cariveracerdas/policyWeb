import axios from 'axios';
import { GetPolizaRequest } from '../models/GetPolizaRequest';
import { PolizaResponse } from '../models/PolizaResponse';
import { CrearPolizaRequest } from '../models/CrearPolizaRequest';

const API_URL = 'https://localhost:7050/api/poliza/';

export const filtrarPolizas = async (
  filtros: GetPolizaRequest
): Promise<PolizaResponse[]> => {
  try {
    const response = await axios.post<PolizaResponse[]>(API_URL + 'Filtrar', filtros);
    return response.data;
  } catch (error) {
    console.error('Error al obtener pólizas:', error);
    return [];
  }
};

export const eliminarPoliza = async (id: number): Promise<boolean> => {
  try {
    const res = await axios.delete(`${API_URL}${id}`);
    return res.status === 204;
  } catch (error) {
    console.error('Error al eliminar póliza:', error);
    return false;
  }
};

export const crearOActualizarPoliza = async (data: CrearPolizaRequest): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_URL}guardar`, data);
    return {
      success: true,
      message: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data || 'Error al guardar la póliza',
    };
  }
};

