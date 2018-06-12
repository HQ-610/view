var host = 'http://localhost:8800';

/**
 * 利用get方式请求数据
 * @param {String} url 
 * @param {Object} params 
 */
function getData(url, params) {
    return axios.get(host + url, params)
        .then(function(res) {
            if (res.status === 200) {
                return res.data;
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

/**
 * 利用post方式请求数据
 * @param {String} url 
 * @param {Object} data 
 */
function postData(url, data) {
    return axios.post(host + url, data)
        .then(function(res) {
            if (res.status === 200) {
                return res.data;
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}