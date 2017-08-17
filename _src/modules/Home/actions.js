import {action} from 'helpers/action';

const LOAD_HOME_PAGE = 'LOAD_HOME_PAGE';

export const loadHomePage = () => {
  return action(LOAD_HOME_PAGE);
};
