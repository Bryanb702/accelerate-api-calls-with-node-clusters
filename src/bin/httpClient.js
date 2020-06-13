
'use strict';

const Client = require('node-rest-client').Client;

class HttpClient {
  constructor(headers = null) {

    this.client = new Client();
    this.headers = headers;

  }

  async get(url, payload) {

    var args = {
      data: payload,
      headers: this.headers,
    };

    return new Promise((resolve, reject) => {

      this.client.get(url, args, function (data, response) {

        let responseObj = {};

        // parse response body as js object
        if (Buffer.isBuffer(data)) {
          data = data.toString('utf8');
        }

        // Check for good response status code
        if (response.statusCode === 200 || response.statusCode === 201) {

          responseObj = {
            result: response.statusCode,
            data: data,
            error: null
          }

          resolve(responseObj);

        } else {
          let error = new Error('Request response error');
          error.data = data;
          error.statusCode = response.statusCode;
          reject(error);
        }
      });
    }).catch(error => { return error });
  }

  async post(url, postData) {

    var args = {
      data: postData,
      headers: this.headers,
    };

    return new Promise((resolve, reject) => {

      this.client.post(url, args, function(data, response) {

        let responseObj = {};

        // parse response body as js object
        if (Buffer.isBuffer(data)) {
          data = data.toString('utf8');
        }

        // Check for good response status code
        if (response.statusCode === 201 || response.statusCode === 200) {

          responseObj = {
            result: response.statusCode,
            data: data,
            error: null
          }

          resolve(responseObj);

        } else {
          let error = new Error('Server response error');
          error.data = data;
          error.statusCode = response.statusCode;
          reject(error);
        }
      });
    }).catch(error => { return error });
  }

  async patch(url, postData) {

    var args = {
      data: postData,
      headers: this.headers,
    };

    return new Promise((resolve, reject) => {

      this.client.patch(url, args, function(data, response) {

        let responseObj = {};

        // parse response body as js object
        if (Buffer.isBuffer(data)) {
          data = data.toString('utf8');
        }

        // Check for good response status code
        if (response.statusCode === 201 || response.statusCode === 200) {

          responseObj = {
            result: response.statusCode,
            data: data,
            error: null
          }

          resolve(responseObj);

        } else {

          let error = new Error('Server response error');
          error.data = data;
          error.statusCode = response.statusCode;
          reject(error);
        }
      });
    }).catch(error => { return error });
  }
}

module.exports = HttpClient;
