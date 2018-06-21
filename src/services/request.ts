import Storage from '../storage';

interface Options {
  url: string;
  method?: string;
  headers?: any;
  data?: any;
};

function getConfig(options: Options) {
  return Storage.getItem('token').then(token => {
    const config: any = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Basic ${token}`,
        ...options.headers,
      },
      method: options.method || 'GET',
    };
    if (config.method !== 'GET' && config.method !== 'DELETE') {
      config.body = JSON.stringify(options.data || {});
    }
    return config;
  });
}

export default function request(options: Options) {
  
  return getConfig(options).then(config => {
    return fetch(options.url, config).then(response => {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.indexOf('application/json;') !== -1) {
        return response.json();
      } else {
        return response.text();
      }
    }).then(resp => {
      return {
        success: true,
        data: resp,
        message: null,
      }
    }).catch(error => {
      return {
        success: false,
        data: null,
        message: error.message || error.stack || 'request error',
      };
    });
  });
}