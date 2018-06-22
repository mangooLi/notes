import { State, Action, ActionType } from 'src/typings';


const defaultUI: State['ui'] = {
  loading: false,
};

export default function uiReducer(state: State['ui'] = defaultUI, action: Action) {
  const { type } = action;
  let newState;
  switch (type) {
    case ActionType.UI_SHOW_LOADING:
      newState = {
        ...state,
        loading: true,
      };
      return newState;
    case ActionType.UI_HIDE_LOADING:
      newState = {
        ...state,
        loading: false,
      };
      return newState;
    default:
      return state;
  }
}