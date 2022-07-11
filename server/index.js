const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const urlHelper = require('url');
const proxyUtils = require('./proxyUtils.js');
const uuid = require('uuid/v1');
const routes = require('./config/constants');
const latexService = require('./latexService.js');

const envVariables = require('./config/environment');
const BASE_URL = envVariables.BASE_URL;

var app = express();
app.set('port', 3000);
app.use(express.json())

app.get(routes.API.LATEX.CONVERT, latexService.convert);
app.post(routes.API.LATEX.CONVERT, bodyParser.json({ limit: '1mb' }), latexService.convert);

app.post(routes.API.USERS, function (req, res) {
    let users = [];
    if (req.body && req.body.roleType && req.body.roleType.toLowerCase() == 'creator') {
        users = envVariables.CREATORS;
        res.send({
            id: "api.v1.users",
            ts: new Date().toISOString(),
            params: {
                resmsgid: uuid(),
                msgid: uuid(),
                status: "successful",
                err: null,
                errmsg: null,
            },
            responseCode: "OK",
            result: {
                users
            }
        });
    } else if (req.body && req.body.roleType && req.body.roleType.toLowerCase() == 'reviewer') {
        users = envVariables.REVIEWERS;
        res.send({
            id: "api.v1.users",
            ver: "1.0",
            ts: new Date().toISOString(),
            params: {
                resmsgid: uuid(),
                msgid: uuid(),
                status: "successful",
                err: null,
                errmsg: null,
            },
            responseCode: "OK",
            result: {
                users
            }
        });
    } else {
        res.status(400).send({
            id: "api.v1.users",
            ver: "1.0",
            ts: new Date().toISOString(),
            params: {
                resmsgid: uuid(),
                msgid: uuid(),
                status: "error",
                err: "INVALID_REQUEST",
                errmsg: "Request should have the roleType",
            },
            responseCode: "CLIENT_ERROR",
            result: {
                users
            }
        });
    }
});

app.use([routes.API.COMPOSITE,
routes.API.CHANNEL,
routes.API.FRAMEWORK], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function (req) {
        let originalUrl = req.originalUrl.replace("/action/", "/api/");
        originalUrl = originalUrl.replace("/v3/", "/v1/");
        return urlHelper.parse(originalUrl).path;
    },
    proxyReqOptDecorator: proxyUtils.decoratePublicRequestHeaders()
}));

app.all([routes.API.LEARNER.FRAMEWORK,
routes.API.LEARNER.QUESTIONSET_HIERARCHY], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function (req) {
        console.log('proxyReqPathResolver ', urlHelper.parse(req.url).path);
        return urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: proxyUtils.decoratePublicRequestHeaders()
}));

app.use([routes.API.PREFIX.ACTION], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function (req) {
        let originalUrl = req.originalUrl.replace("/action/", "/api/");
        return urlHelper.parse(originalUrl).path;
    },
    proxyReqOptDecorator: proxyUtils.decoratePublicRequestHeaders()
}));

app.use([routes.API.PREFIX.API], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function (req) {
        return urlHelper.parse(req.originalUrl).path;
    },
    proxyReqOptDecorator: proxyUtils.decoratePublicRequestHeaders()
}));

http.createServer(app).listen(app.get('port'), 3000);
