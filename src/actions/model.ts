import { normalize, schema } from 'normalizr';
import { Gist } from 'src/typings';

const user = new schema.Entity('users');
const file = new schema.Entity('files', undefined, {
  idAttribute: 'filename',
});
const gist = new schema.Entity('gists', {
  owner: user,
  user,
  files: [ file ],
});

const gists = [ gist ];

export function normalizeGistList(data: Gist[]) {
  return normalize(data, gists);
}