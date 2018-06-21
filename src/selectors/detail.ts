import { createSelector } from 'reselect';
import { State } from 'src/typings';
import cloneDeep from 'lodash.clonedeep';


function getUsers(state: State) {
  return state.users;
}

function getDetail(state: State, gistId: string) {
  return state.gists[gistId] || {};
}

function getFiles(state: State) {
  return state.files;
}

export default createSelector(
  [getUsers, getFiles, getDetail],
  (userObj, fileObj, detail) => {
    const gist = cloneDeep(detail);
    gist.owner = userObj[gist.owner as number];
    for (let file in gist.files) {
      if (fileObj[`${gist.id}-${file}`]) {
        gist.files[file] = {
          ...gist.files[file],
          content: fileObj[`${gist.id}-${file}`],
        };
      }
    }
    return gist;
  }
);