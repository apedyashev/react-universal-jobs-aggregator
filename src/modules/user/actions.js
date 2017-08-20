import {action, createRequestTypes} from 'helpers/action';

export const asyncActions = {
  PROFILE: {
    GET: createRequestTypes('PROFILE/GET'),
  },
};

export const fetchProfile = {
  request: () => action(asyncActions.PROFILE.GET.REQUEST),
  success: (response) => action(asyncActions.PROFILE.GET.SUCCESS, {response}),
  failure: (error) => action(asyncActions.PROFILE.GET.FAILURE, {error}),
};
