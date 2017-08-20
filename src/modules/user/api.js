import {schema} from 'normalizr';
import http from 'helpers/http';

export const subscriptionSchema = new schema.Entity('subscriptions');
export const userSchema = new schema.Entity('users', {
  subscriptions: subscriptionSchema,
});

export const fetchProfile = () => http.get({
  url: 'users/profile',
  shema: {item: userSchema},
});
