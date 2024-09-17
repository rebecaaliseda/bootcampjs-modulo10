import axios from 'axios';
import { Personaje } from './personajes-listado.modelo';
export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get('http://localhost:3000/personajes');
    return data;
  } catch (error) {
    throw new Error('Error al obtener los personajes');
  }
};

export const obtenerPersonajesFiltradosPorNombre = async (nombre: string): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get(`http://localhost:3000/personajes/?nombre_like=${nombre}`);
    return data;
  } catch (error) {
    throw new Error('Error al obtener los personajes filtrados');
  }
};
