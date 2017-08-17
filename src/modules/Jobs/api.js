import {schema} from 'normalizr';
import http from 'helpers/http';

const jobSchema = new schema.Entity('jobs');
const jobsSchemaArray = new schema.Array(jobSchema);
export const fetchJobs = ({page, perPage}) => http.get({
  url: 'jobs',
  query: {page, perPage, sortBy: 'created:DESC'},
  shema: {items: jobsSchemaArray},
});
