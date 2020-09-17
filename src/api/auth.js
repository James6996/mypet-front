import { getRequest, postRequest } from './index';

export const checkSessions = async () => getRequest('/auth/check-session');

export const login = async (body) => postRequest('/auth/login', body);

export const logout = async () => getRequest('/auth/logout');

export const register = async (body) => postRequest('/auth/register', body);


