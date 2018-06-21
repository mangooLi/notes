import fetch from './request';
import { Buffer } from 'buffer';

export function login(userName: string, password: string) {
  const token = new Buffer(userName + ':' + password).toString('base64');
  return fetch({
    url: 'https://api.github.com/user',
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  }).then(resp => {
    const { data, success } = resp;
    if (success && data.type === 'User' && data.id && data.name.toLowerCase() === userName.toLowerCase()) {
      return token;
    } else {
      return null;
    }
  });
}
