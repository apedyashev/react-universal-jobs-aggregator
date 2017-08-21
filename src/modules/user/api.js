import {schema} from 'normalizr';
import http from 'helpers/http';
import {subscriptionSchemaArray} from 'modules/subscriptions/api';

export const userSchema = new schema.Entity('users', {
  subscriptions: subscriptionSchemaArray,
});

export const fetchProfile = () => http.get({
  url: 'users/profile',
  shema: {item: userSchema},
});
