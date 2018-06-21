import merge from 'lodash.merge';
import { State, Action, ActionType } from 'src/typings';

export function users(state: State['users'] = {}, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.STATE_USER_DATA:
      const users = Object.assign({}, state, {
        ...payload.users,
      });
      return users;
  }
  return state;
}

export function gists(state: State['gists'] = {}, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.STATE_GIST_DATA:
      const gists = Object.assign({}, state, {
        ...payload.gists,
      });
      return gists;
  }
  return state;
}

export function files(state: State['files'] = {}, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.STATE_FILE_DATA:
      const newState = merge({}, state, payload.files);
      return newState;
  }
  return state;
}
