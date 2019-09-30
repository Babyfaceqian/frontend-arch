/**
 * 使用async/await封装fetch
 **/ 

const config = {
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },
  // mode: 'no-cors',
  // cache: 'default'
};
export default {
  async post(request, data, init) {
    let options = Object.assign({}, config);
    if (init) {
      options = Object.assign(options, init);
    }
    if (data) {
      options.body = JSON.stringify(data);
    }
    options.method = 'post';
    try {
      let res = await fetch(request, options);
      return res.json();
    } catch (e) {
      return undefined;
    }
  },
  async get(request, data, init) {
    let options = Object.assign({}, config);
    if (init) {
      options = Object.assign(options, init);
    }
    let _url = request;
    if (data) {
      _url += '?';
      Object.keys(data).forEach(function (key) {
        _url += key + '=' + data[key];
      })
    }
    options.method = 'get';
    try {
      let res = await fetch(_url, options);
      return res.json();
    } catch (e) {
      return undefined;
    }
  },
}