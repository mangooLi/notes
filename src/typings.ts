export interface Payload {
  [propName: string]: any;
}

export enum ActionType {
  API_GET_GIST_LIST = 'API_GET_GIST_LIST',
  API_ADD_GIST = 'API_ADD_GIST',
  API_DELETE_GIST = 'API_DELETE_GIST',
  API_UPDATE_GIST = 'API_UPDATE_GIST',
  API_GET_GIST_FILE = 'API_GET_GIST_FILE',
  STATE_GIST_DATA = 'STATE_GIST_DATA',
  STATE_USER_DATA = 'STATE_USER_DATA',
  STATE_FILE_DATA = 'STATE_FILE_DATA',
  STATE_GIST_LIST = 'STATE_GIST_LIST',
  STATE_GIST_DETAIL = 'STATE_GIST_DETAIL',
  UI_SHOW_LOADING = 'UI_SHOW_LOADING',
  UI_HIDE_LOADING = 'UI_HIDE_LOADING',
}

export interface Action {
  type: ActionType;
  payload: Payload;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface GistFile {
  size: number;
  raw_url: string;
  type: string;
  truncated: boolean;
  language: string;
  content: string;
  filename: string;
}

export interface Gist {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  description: string;
  public: boolean;
  owner: number | User;
  user: number | User;
  files: [ string ],
  truncated: boolean;
  comments: number;
  comments_url: string;
  html_url: string;
  git_pull_url: string;
  git_push_url: string;
  created_at: string;
  updated_at: string;
}

export interface State {
  gists: {
    [propName: string]: Gist;
  };
  users: {
    [propName: number]: User;
  };
  files: {
    [propName: string]: GistFile;
  };
  list: string[];
  ui: {
    loading: boolean;
  };
}

export interface ReactNavigationProps {
  navigation: {
    navigate: Function;
    goBack: Function;
    addListener: Function;
    isFocused: Function;
    state: any;
    setParams: Function;
    getParam: Function;
    dispatch: Function;
    push: Function;
  },
}