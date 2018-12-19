'use strict';

(function () {
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking/';

  var xhrRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  };

  var download = function (onSuccess, onError) {
    var xhr = xhrRequest(onSuccess, onError);
    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };

  var upload = function (onSuccess, onError, data) {
    var xhr = xhrRequest(onSuccess, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };

})();