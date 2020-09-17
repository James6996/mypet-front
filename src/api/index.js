export const baseUrl = 'https://mypet-backup.herokuapp.com/api';
// export const baseUrl = 'http://localhost:3000/api';

const fetchOptions = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getRequest = async (endpoint) =>
  fetch(`${baseUrl}${endpoint}`, {
    ...fetchOptions,
    method: 'GET',
  }).then(async (res) => {
    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data;
  });
export const putRequest = async (endpoint, body) =>
  fetch(`${baseUrl}${endpoint}`, {
    ...fetchOptions,
    method: 'PUT',
    body: JSON.stringify(body),
  }).then(async (res) => {
    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data;
  });

//TODO
/**
 * Aqui van el resto de los metodos postRquest, putRequest, etc
 */

export const postRequest = async (endpoint, body) =>
  fetch(`${baseUrl}${endpoint}`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(body),
  }).then(async (res) => {
    const response = await res.json();
    console.log('hola');
    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data;
  });

export const deleteRequest = async (endpoint) =>
  fetch(`${baseUrl}${endpoint}`, {
    ...fetchOptions,
    method: 'DELETE',
  }).then(async (res) => {
    const response = await res.json();
    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data;
  });
