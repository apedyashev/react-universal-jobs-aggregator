import {action, createRequestTypes} from 'helpers/action';

export const SET_AUTH_HEADER = 'AUTH/SET_HEADER';
export const LOGIN = createRequestTypes('LOGIN');

export const setAuth = ({authHeader}) => action(SET_AUTH_HEADER, {authHeader});

export const login = {
  request: () => action(LOGIN.REQUEST),
  success: (response) => action(LOGIN.SUCCESS, {response}),
  failure: (error) => action(LOGIN.FAILURE, {error}),
};
