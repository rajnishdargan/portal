const envVariables = require('./config/environment');
var publicRequestHeaders = {
    authorization: `Bearer ${envVariables.API_AUTH_TOKEN}`,
    "x-channel-id": envVariables.CHANNEL_ID
};

var contentTypeHeaders = {
    'content-type': "application/json"
}

const decoratePublicRequestHeaders = function () {
    return function (proxyReqOpts, srcReq) {
        proxyReqOpts.headers = Object.assign({}, proxyReqOpts.headers, publicRequestHeaders, contentTypeHeaders);
        return proxyReqOpts;
    }
}

const customDecorateReqHeaders = function () {
    return function (proxyReqOpts, srcReq) {
        proxyReqOpts.headers = Object.assign({}, proxyReqOpts.headers, publicRequestHeaders);
        return proxyReqOpts;
    }
}

module.exports.decoratePublicRequestHeaders = decoratePublicRequestHeaders
module.exports.customDecorateReqHeaders = customDecorateReqHeaders
