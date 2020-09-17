import { getRequest } from './index';

export const getAllShops = async () => getRequest('/shops/all');

// TODO
/**
 * creo que es aqui donde van los postRequest, putRequest y etc... con su respectivo endpoint
 *
 */

export const getShopsByDistance = async (
  longitude,
  latitude,
  distance = 10000
) =>
  getRequest(
    `/shops/near-me?longitude=${longitude}&latitude=${latitude}&distance=${distance}`
  );
