import * as _moment from 'moment';
const moment = (_moment as any).default || _moment;

export function getTimeString(srcTime: string, format: string) {
  return moment(srcTime).format(format);
}