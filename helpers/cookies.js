import snakeCase from 'lodash/snakeCase';

export const cookiePrefix = '_yearbook_';

export const acceptedCookiesKey = 'acceptedCookies';

export const acceptCookies = () => {
  window.localStorage.setItem(acceptedCookiesKey, 'accepted');
};

export const alreadyAcceptedCookies = () => window.localStorage.getItem(acceptedCookiesKey);

const createCookieName = (name) => `${cookiePrefix}${snakeCase(name)}`;

export default createCookieName;
