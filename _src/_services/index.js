import {browserHistory} from 'react-router';
import * as _api from './api';
// import withScroll from 'scroll-behavior';

export const api = _api;
// export const history = withScroll(browserHistory);
export const history = browserHistory;
