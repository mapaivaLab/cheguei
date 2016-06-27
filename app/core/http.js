const SERVER_URL = "http://192.168.0.104:8242/codit.afx";

class RequestError extends Error {
  constructor(message, name) {
    super(message);

    this.name = name;
  }
}

export class Http {

  constructor() {}

  get(URL, opts = {}) {
    this._request('GET', URL, opts);
  }

  put(method, URL, userServerURL = true) {

  }

  post(method, URL, userServerURL = true) {

  }

  delete() {

  }

  _request(method, URL, opts) {
    opts.params = opts.params || new Map();
    opts.useServerURL = opts.useServerURL;

    if (opts.useServerURL === undefined) {
      opts.useServerURL = true;
    }

    let xhr = new XMLHttpRequest();
    let queryParams = '?';

    if (opts.useServerURL) {
      URL = `${SERVER_URL}/ws/${URL}`;
    }

    let i = 1;

    for (var [key, value] of opts.params.entries()) {
      console.log(key + " = " + value);
      queryParams = queryParams.concat(key).concat('=').concat(value);

      if (i < opts.params.size) {
        queryParams = queryParams.concat('&');
      }

      i++;
    }

    xhr.open(method, `${URL}${queryParams}`);

    if (opts.useServerURL) {
      xhr.setRequestHeader('Accept', 'application/json');
    }

    xhr.onreadystatechange = function(e) {

      if (this.readyState == 4) {
        let resp, err;

        switch (this.status) {
          case 200:
            resp = JSON.parse(this.responseText);

            if (resp['@error'] == 'true') {
              err = new RequestError(resp['@errorMessage'], resp['@exceptionName']);
            }
            break;
          case 404:
            err = new RequestError(`Destino não encontrado ${this.status}`, 'HTTP404');
            break;
          case 500:
            err = new RequestError(`Erro interno do servidor ${this.status}`, 'HTTP500';
            break;
          default:
            err = new RequestError(`Unrecognized status ${this.status}`, 'UnrecognizedHttpStatus');
            break;
        }

        if (opts.handler && typeof opts.handler == 'function') {
          opts.handler.call(this, resp, err);
        }
      }
    };

    xhr.send();
  }
}
