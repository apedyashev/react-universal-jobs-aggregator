import {schema, normalize} from 'normalizr';
import {callApi} from 'services/api';
const jobSchema = new schema.Entity('jobs', {}, {
  // idAttribute: 'login'
});
const jobsSchemaArray = new schema.Array(jobSchema);
export const fetchJobs = () => callApi(`http://localhost:1337/jobs`, {items: jobsSchemaArray});
