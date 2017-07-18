import {schema, normalize} from 'normalizr';
import http from 'helpers/http';

const jobSchema = new schema.Entity('jobs');
const jobsSchemaArray = new schema.Array(jobSchema);
export const fetchJobs = () => http.get({
  url: 'jobs',
  shema: {items: jobsSchemaArray}
});
