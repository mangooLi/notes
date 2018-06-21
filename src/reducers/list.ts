import { Action, ActionType } from 'src/typings';

export default function listReducer(state: string[] = [], action: Action) {
  switch (action.type) {
    case ActionType.STATE_GIST_LIST:
      const payload = action.payload;
      return state.concat(payload.list || []);
  }
  return state;
}