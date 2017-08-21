import {schema} from 'normalizr';

export const subscriptionSchema = new schema.Entity('subscriptions');
export const subscriptionSchemaArray = new schema.Array(subscriptionSchema);
