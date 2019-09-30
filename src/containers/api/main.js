import worm from 'utils/worm';
import * as APIS from './api';

function makeRequestCreator(url, method) {
  let _time;
  if (method == 'get') {
    return async function (params, isTakeLast) {
      if (isTakeLast) {
        let time = new Date().valueOf();
        _time = time;
        return worm.get(url, params).then((res) => {
          console.log('time', _time, time);
          return _time === time ? res : undefined;
        });
      } else {
        return worm.get(url, params);
      }
    }
  } else if (method == 'post') {
    if (isTakeLast) {
      let time = new Date().valueOf();
      _time = time;
      return worm.post(url, params).then((res) => {
        console.log('time', _time, time);
        return _time === time ? res : undefined;
      });
    } else {
      return worm.post(url, params);
    }
  }
}

export const getWeather = makeRequestCreator(APIS.getWeatherApi, 'get');

export const getSatin = makeRequestCreator(APIS.getSatinApi, 'get');