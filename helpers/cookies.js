import snakeCase from 'lodash/snakeCase';

export const cookiePrefix = '_yearbook_';

export const acceptedCookiesKey = 'acceptedCookies';

export const acceptCookies = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(acceptedCookiesKey, 'accepted');
  }
};

export const alreadyAcceptedCookies = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(acceptedCookiesKey);
  }
  return false;
};

const createCookieName = (name) => `${cookiePrefix}${snakeCase(name)}`;

export default createCookieName;
