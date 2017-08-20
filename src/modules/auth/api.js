// import {schema} from 'normalizr';
import http from 'helpers/http';
import {userSchema} from 'modules/user/api';

export const login = ({email, password}) => http.post({
  url: 'auth/login',
  data: {email, password},
  shema: {user: userSchema},
});
