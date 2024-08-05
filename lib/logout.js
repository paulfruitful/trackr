import { setCookie, deleteCookie } from 'cookies-next';

export function logout() {
  deleteCookie('jwt');
  deleteCookie('color');
  deleteCookie('name')
}