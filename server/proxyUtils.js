const envVariables = require('./config/environment');

const decoratePublicRequestHeaders = function () {
    return function (proxyReqOpts, srcReq) {
        proxyReqOpts.headers["Content-Type"] = "application/json";
        proxyReqOpts.headers["user-id"] = envVariables.USER_ID;
        proxyReqOpts.headers.authorization = `Bearer ${envVariables.API_AUTH_TOKEN}`;
        proxyReqOpts.headers["x-authenticated-user-token"] = envVariables.USER_API_TOKEN;
        proxyReqOpts.headers["x-channel-id"] = envVariables.CHANNEL_ID;
        return proxyReqOpts;
    }
}

module.exports.decoratePublicRequestHeaders = decoratePublicRequestHeaders
