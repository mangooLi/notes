import fetch from './request';

export function* getAllGists() {
  return yield fetch({
    url: 'https://api.github.com/gists',
    method: 'GET',
  });
}

export function* getGistFileContent(fileUrl: string) {
  return yield fetch({
    url: fileUrl,
    method: 'GET',
  });
}