import 'whatwg-fetch'

const defaultTimeout = 3000;
let defaultOption = {
    method: 'GET',
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
   },
    mode: 'cors',
    redirect: 'follow',
    credentials: 'same-origin',
    cache: 'only-if-cached',
    async: true
}

/**
 * 设置一个超时时间，如果超时则抛出异常。当超时时长小于0时则直接执行对应操作。
 * @param {Promise|thenable} thenable
 * @param {Number} [_timeout=defaultTimeout]
 * @returns {Promise}
 */
const timeout = (thenable, _timeout = defaultTimeout) => {
    if (_timeout < 0) {
        return thenable;
    }
    var timerId = 0;
    var timeoutPromise = new Promise(function (resolve, reject) {
        timerId = setTimeout(() => { throw new Error('Request Timeout') }, _timeout);
   });
    return Promise.race([thenable, timeoutPromise]).then(data => { clearTimeout(timerId); return data });
}

/**
 * 检查请求结果的状态，如果异常(>=400)则抛出异常
 * @param {Response} response
 * @returns {Response}
 * @throws Error
 */
const checkStatus = (response) => {
    switch (Math.floor(response.status / 100)) {
         case 5:
            throw new Error('Server Error');
         case 4:
            throw new Error('Bad Request');
         case 3:
            console.warn('Moved');
            return response;
         case 2:
            return response;
         default:
            throw new Error('Can\'t find Code of ' + response.status);
   }
}

/**
 * 将响应数据转换成文本
 * @param {Response} response
 * @returns {String}
 */
const _parseText = (response) => response.text();
/**
 * 将相应数据转换成对象
 * @param {Response} response
 * @returns {Object}
 */
const _parseJSON = (response) => response.json();
/**
 * 将相应数据转换成Blob
 * @param {Response} response
 * @returns {Blob}
 */
const _parseBlob = (response) => response.blob();
/**
 * 将Blob数据转化成本地Url
 * 使用后url后释放资源  window.URL.revokeObjectURL(url);
 * @param {Blob} blob
 * @returns {Url}
 */
const _createObjectURL = (blob) => URL.createObjectURL(blob);

/**
 * 通过响应数据中的Content-Type自动判断转换类型
 * @param {Response} response
 * @returns {String|Object}
 */
const _switchType = (response) => {
    var contentType = response.headers.get('Content-Type');
    if (contentType.indexOf('text') >= 0) {
        return response.text();
   } else if (contentType.indexOf('json') >= 0) {
        return response.json();
   } else {
        return response.blob().then(_createObjectURL);
   }
}

/**
 * 在option中包含async,timeout,body,async是指对应请求是否异步,timeout为超时时间,body为请求参数,其余与fetch的option一致
 * @param {String} url
 * @param {Object} [option=defaultOption]
 * @returns {Promise}
 */
export const betterFetch = async function (url, option = defaultOption) {
    option = { ...defaultOption, ...option }
    if (option.method.toUpperCase() === 'GET') {
        url += '?';
        for (var key in option.body) {
            url += encodeURIComponent(key) + '=' + encodeURIComponent(option.data[key]) + '&';
       }
        url = url.substr(0, url.length - 1);
   }

    if (option.async) {
        return timeout(fetch(url, option), option.timeout);
   }
    return await timeout(fetch(url, option), option.timeout);
}

/**
 * fetch一个JSON数据，并将其解析成为对象
 * 在option中包含async,timeout,body,async是指对应请求是否异步,timeout为超时时间,body为请求参数,其余与fetch的option一致
 * @param {String} url
 * @param {Object} [option=defaultOption]
 * @returns {Promise}
 */
export const fetchJson = async (url, option = defaultOption) => {
    option = { ...defaultOption, ...option }
    if (option.async) {
        return betterFetch(url, option, option.async).then(checkStatus).then(_parseJSON);
   }
    return await betterFetch(url, option, option.async)
                        .then(checkStatus)
                        .then(_parseJSON);
}

/**
 * fetch一个Blob数据，并将其解析成为本地Url
 * 在option中包含async,timeout,body,async是指对应请求是否异步,timeout为超时时间,body为请求参数,其余与fetch的option一致
 * @param {String} url
 * @param {Object} [option=defaultOption]
 * @returns {Promise}
 */
export const fetchBlob = async (url, option = defaultOption) => {
    option = { ...defaultOption, ...option }
    if (option.async) {
        return betterFetch(url, option, option.async)
                    .then(checkStatus)
                    .then(_parseBlob)
                    .then(_createObjectURL);
   }
    return await betterFetch(url, option, option.async)
                        .then(checkStatus)
                        .then(_parseBlob)
                        .then(_createObjectURL);
}

/**
 * fetch一个文本数据，并将其解析成为字符串
 * 在option中包含async,timeout,body,async是指对应请求是否异步,timeout为超时时间,body为请求参数,其余与fetch的option一致
 * @param {String} url
 * @param {Object} [option=defaultOption]
 * @returns {Promise}
 */
export const fetchText = async (url, option = defaultOption) => {
    option = { ...defaultOption, ...option }
    if (option.async) {
        return betterFetch(url, option, option.async)
                    .then(checkStatus)
                    .then(_parseText);
   }
    return await betterFetch(url, option, option.async)
                        .then(checkStatus)
                        .then(_parseText);
}

/**
 * 根据返回数据类型自动Parse
 * 在option中包含async,timeout,body,async是指对应请求是否异步,timeout为超时时间,body为请求参数,其余与fetch的option一致
 * @param {String} url
 * @param {Object} [option=defaultOption]
 * @returns {Promise}
 */
export const _fetch = async (url, option = defaultOption) => {
    option = { ...defaultOption, ...option }
    if (option.async) {
        return betterFetch(url, option, option.async)
                .then(checkStatus)
                .then(_switchType);
   }
    return await betterFetch(url, option, option.async)
                        .then(checkStatus)
                        .then(_switchType);
}

export default _fetch;
