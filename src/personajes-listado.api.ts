import axios from 'axios';
import { Personaje } from './personajes-listado.modelo';
export const obtenerPersonajes = async (nombre: string): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get(`http://localhost:3000/personajes/?nombre_like=${nombre}`);
    return data;
  } catch (error) {
    throw new Error('Error al obtener los personajes');
  }
};
