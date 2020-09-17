import { getRequest, putRequest } from './index';

export const getAllCareTakers = async () => getRequest('/mypet/caretakers');

export const getCaretakers = async (longitude, latitude, distance = 800000) =>
  getRequest(
    `/mypet/caretakers?longitude=${longitude}&latitude=${latitude}&distance=${distance}`
  );

export const bookCaretakers = async (caretakerId) =>
  putRequest('/user/book', { caretakerId });

export const cancelBookings = async () =>
  putRequest('/user/cancel-booking', {});

export const turnIntoCaretaker = async () =>
  putRequest('/user/caretaker-register');

export const turnIntoBasicUser = async () =>
  putRequest('/user/caretaker-unsuscribe');

export const updateLocations = async (longitude, latitude) =>
  putRequest('/user/update-location', { longitude, latitude });

export const addService = async (service) =>
  putRequest('/user/edit/services', service);

export const removeService = async (service) =>
  putRequest('/user/edit/remove-service', service);

export const viewMyBookings = async () => getRequest('/user/my-bookings');
