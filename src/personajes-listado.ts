import { Personaje } from './personajes-listado.modelo';
import { obtenerPersonajes } from './personajes-listado.api';

const crearElementoImagen = (personaje: string, nombre: string): HTMLImageElement => {
  const imagen = document.createElement('img');
  imagen.src = personaje;
  imagen.alt = nombre;
  return imagen;
};

const crearElementoParrafo = (nombre: string, texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement('p');
  parrafo.innerHTML = `<span class ="bold">${nombre}: </span>${texto}`;
  return parrafo;
};

const crearContenedorPersonaje = (personaje: Personaje): HTMLDivElement => {
  const elementoPersonaje = document.createElement('div');
  elementoPersonaje.classList.add('personaje-container');

  const imagenContainer = document.createElement('div');
  imagenContainer.classList.add('img-container');
  elementoPersonaje.appendChild(imagenContainer);

  const imagen = crearElementoImagen(`http://localhost:3000/${personaje.imagen}`, personaje.nombre);
  imagenContainer.appendChild(imagen);

  const nombrePersonaje = crearElementoParrafo('Nombre', personaje.nombre);
  const especialidadPersonaje = crearElementoParrafo('Especialidad', personaje.especialidad);
  const habilidadesPersonaje = crearElementoParrafo(
    'Habilidades',
    personaje.habilidades.join(', ')
  );
  elementoPersonaje.appendChild(nombrePersonaje);
  elementoPersonaje.appendChild(especialidadPersonaje);
  elementoPersonaje.appendChild(habilidadesPersonaje);

  return elementoPersonaje;
};

const pintarPersonajes = async () => {
  const personajes = await obtenerPersonajes();
  const listadoPersonajesContainer = document.querySelector('#listado-personajes-container');

  if (listadoPersonajesContainer && listadoPersonajesContainer instanceof HTMLDivElement) {
    personajes.forEach((personaje) => {
      const personajeContainer = crearContenedorPersonaje(personaje);
      listadoPersonajesContainer.appendChild(personajeContainer);
    });
  } else {
    throw new Error('No se ha encontrado el contenedor del listado de personajes');
  }
};

const filtrarPersonaje = async () => {
  const inputForm = document.querySelector('#nombre') as HTMLInputElement;
  const listadoPersonajesContainer = document.querySelector('#listado-personajes-container');
  if (
    inputForm &&
    inputForm instanceof HTMLInputElement &&
    listadoPersonajesContainer &&
    listadoPersonajesContainer instanceof HTMLDivElement
  ) {
    const personajes = await obtenerPersonajes();
    const nombreAFiltrar = inputForm.value.toLowerCase();
    listadoPersonajesContainer.innerHTML = '';
    personajes.forEach((personaje) => {
      const nombrePersonaje = personaje.nombre.toLowerCase();
      if (nombrePersonaje.includes(nombreAFiltrar)) {
        const personajeContainer = crearContenedorPersonaje(personaje);
        listadoPersonajesContainer.appendChild(personajeContainer);
      }
    });
  } else {
    throw new Error('No se ha encontrado el contenedor del listado de personajes');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  pintarPersonajes();
  const form = document.querySelector('#form');
  if (form && form instanceof HTMLFormElement) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      filtrarPersonaje();
    });
  }
});
