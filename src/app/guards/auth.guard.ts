import { CanActivateFn, CanMatchFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return localStorage.getItem('session') != undefined
};

export const lockLogin: CanActivateFn = (route, state) => {
  return localStorage.getItem('session') == undefined;
};

export const isAuth = (): boolean => {
  return localStorage.getItem('session') != undefined;
}
