import jwtDecode from 'jwt-decode';
import get from 'lodash/get';

export const jwtTokenName = 'token';

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(jwtTokenName) || '';
  }
  return '';
}

export const setToken = (token) => {
  try {
    window.localStorage.setItem(jwtTokenName, token);
  } catch {
    return false;
  }
  return true;
};

export const getDecodedToken = (token) => {
  const jwtToken = token || getToken();
  if (jwtToken) {
    try {
      return jwtDecode(jwtToken);
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

export const expIsValid = (token) => {
  const decodedToken = getDecodedToken(token);
  if (!decodedToken) {
    return false;
  }
  return (decodedToken.exp || 0) * 1000 > new Date().getTime();
};

export const jwtIsValid = (manualToken) => {
  const token = manualToken || getToken();

  if (!token) {
    return false;
  }

  return expIsValid(token);
};

export const clearToken = () => {
  localStorage.removeItem(jwtTokenName);
  if (typeof window !== 'undefined') {
    window.location.replace('/');
  }
};

export const isAdmin = () => {
  const user = getDecodedToken(getToken());
  return get(user, 'role', []).includes('ADMIN');
};
