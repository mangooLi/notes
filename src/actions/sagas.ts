import { takeEvery, call, put } from 'redux-saga/effects';
import { Gist } from 'src/services';
import { ActionType, Action } from 'src/typings';
import { getTimeString } from 'src/utils';
import { normalizeGistList } from './model';

function* getGistList(action: Action) {
  const { payload = {} } = action;
  const { since = getTimeString('1971-01-01', 'YYYY-MM-DDTHH:MM:SSZ') } = payload;
  const { success, data, message } = yield call(Gist.getAllGists, { since });
  if (success) {
    if (data.length === 0) {
      // 没有了
      return;
    }
    const normalizedData = normalizeGistList(data.map((gist: any) => {
      gist.files = Object.keys(gist.files).map(filename => gist.files[filename]);
      return gist;
    }));
    yield put({
      type: ActionType.STATE_GIST_DATA,
      payload: {
        gists: normalizedData.entities.gists,
      },
    });
    yield put({
      type: ActionType.STATE_USER_DATA,
      payload: {
        users: normalizedData.entities.users,
      },
    });
    yield put({
      type: ActionType.STATE_FILE_DATA,
      payload: {
        files: normalizedData.entities.files,
      },
    });
    yield put({
      type: ActionType.STATE_GIST_LIST,
      payload: {
        list: normalizedData.result,
      },
    });
  } else {
    console.error('getGistList: ', message);
  }
}

function* getGistFileContent(action: Action) {
  const { url, fileName } = action.payload;
  const { success, data, message } = yield call(Gist.getGistFileContent, url);
  if (success) {
    yield put({
      type: ActionType.STATE_FILE_DATA,
      payload: {
        files: {
          [fileName]: {
            content: data,
          },
        },
      },
    });
  } else {
    console.error('getGistFileContent: ', message);
  }
}

function loadingWrapper(func: Function) {
  return function* (action: Action) {
    yield put({
      type: ActionType.UI_SHOW_LOADING,
    });
    yield func(action);
    yield put({
      type: ActionType.UI_HIDE_LOADING,
    });
  }
}

export default function* sagas() {
  yield takeEvery(ActionType.API_GET_GIST_LIST, loadingWrapper(getGistList));
  yield takeEvery(ActionType.API_GET_GIST_FILE, loadingWrapper(getGistFileContent));
  // yield takeEvery(ActionType.API_GET_GIST_LIST, getGistList);
  // yield takeEvery(ActionType.API_GET_GIST_FILE, getGistFileContent);
}