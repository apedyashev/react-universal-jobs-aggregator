import {schema, normalize} from 'normalizr';
// import {callApi} from 'services/api';
import http from 'helpers/http';
const jobSchema = new schema.Entity('jobs', {}, {
  // idAttribute: 'login'
});
const jobsSchemaArray = new schema.Array(jobSchema);
export const fetchJobs = () => http.get({
  url: `jobs`,
  shema: {items: jobsSchemaArray}
});
