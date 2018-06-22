import fetch from './request';

export function* getAllGists(data: any) {
  return yield fetch({
    url: 'https://api.github.com/gists',
    method: 'GET',
    data,
  });
}

export function* getGistFileContent(fileUrl: string) {
  return yield fetch({
    url: fileUrl,
    method: 'GET',
  });
}