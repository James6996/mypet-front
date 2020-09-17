import { getRequest, postRequest, deleteRequest } from './index';

export const addPet = async (body) => postRequest('/user/add-pet', body);

export const viewPet = async () => getRequest('/user/my-pets');

export const deletePet = async (id) => deleteRequest(`/user/delete-pet/${id}`);
