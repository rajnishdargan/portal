var express = require('express'),
    http = require('http');
    bodyParser = require('body-parser'),
    proxy = require('express-http-proxy'),
    urlHelper = require('url');
// const latexService = require('./latexService.js')

// ENV Variables
const BASE_URL = 'dev.sunbirded.org';
const API_AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzZGNjMzY3OWIwYTE0NmU2YWYyZjlmZDA5NWU5NTlkNCJ9.0NZhX5sqUNy-GZUya90aQFkr5ZNiqfOuELYz_IvoyS8";
const PORTAL_COOKIES= "connect.sid=s%3AiDtG6O5knkn2teub6l3GwdBuW9FPCe9Q.vhPXlLWqnDCu6Qh80jDLim6w75DVSGCwdYt1YzE%2FrXk"
const USER_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsclI0MWpJNndlZmZoQldnaUpHSjJhNlowWDFHaE53a21IU3pzdzE0R0MwIn0.eyJqdGkiOiIyOThjNTgyYy1lMzU4LTRlYjYtOWI0OS0yMjNmMWY3ZjA3ZDQiLCJleHAiOjE2MDAzNjE5OTksIm5iZiI6MCwiaWF0IjoxNjAwMjc1NTk5LCJpc3MiOiJodHRwczovL2Rldi5zdW5iaXJkZWQub3JnL2F1dGgvcmVhbG1zL3N1bmJpcmQiLCJhdWQiOiJwcm9qZWN0LXN1bmJpcmQtZGV2LWNsaWVudCIsInN1YiI6ImY6NWE4YTNmMmItMzQwOS00MmUwLTkwMDEtZjkxM2JjMGZkZTMxOjk1ZTQ5NDJkLWNiZTgtNDc3ZC1hZWJkLWFkOGU2ZGU0YmZjOCIsInR5cCI6IkJlYXJlciIsImF6cCI6InByb2plY3Qtc3VuYmlyZC1kZXYtY2xpZW50IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiNjNkMWMxMDEtYWIxMi00ZjM3LTg5NjUtODM2Zjk0YWRlYWNmIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2Rldi5zdW5iaXJkZWQub3JnIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sIm5hbWUiOiJSZXZpZXdlciBVc2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibnRwdGVzdDEwMyIsImdpdmVuX25hbWUiOiJSZXZpZXdlciIsImZhbWlseV9uYW1lIjoiVXNlciIsImVtYWlsIjoidXMqKioqKioqKkB0ZXN0c3MuY29tIn0.NCiUbiPIbgmcGjjUO6m71cSyXfcf54BSh8bTBCtumxDP37hLdG2ysDTWWlpLGNXQGCYsXWazk4SwZwvhZnsPbOP8ExM-fOr_r4bAQcecePQIrTNawnN_pdq9iL_I22trwB7sP-LQxfh0jmZsHY3mRjBbqM20bDsXK5-wEnI9nu-8Cxd6rszQa09izAHEvEBNG0XJ-ZY4k_Cc9y8O4Mw_RJcsRPzDhqwgy_wOKb2z60YLT_7DnOxCPKfwbzSOTKBBeQ4qmVaiKh4fiaulvgC1us1dNLLMUbY1LQ5F3nU1e_BeAZ8C0LcAPc5RmjuJ1NEbF2-0I8tOpYwTgBNrhJgS5w";

var app = express();
app.set('port', 3000);
app.use(express.json())
// app.get("/latex/convert", latexService.convert)
// app.post("/latex/convert", bodyParser.json({ limit: '1mb' }), latexService.convert);
app.all(['/api/framework/v1/read/*',
     '/learner/framework/v1/read/*',
     '/learner/questionset/v1/hierarchy/*',
     '/api/channel/v1/read/*'], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function(req) {
        console.log('proxyReqPathResolver ',  urlHelper.parse(req.url).path);
        return urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        console.log('proxyReqOptDecorator 2')
        // you can update headers
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        proxyReqOpts.headers['user-id'] = 'content-editor';
        // proxyReqOpts.headers['Cookie'] = PORTAL_COOKIES;
        proxyReqOpts.headers['authorization'] = `Bearer ${API_AUTH_TOKEN}`;
        // proxyReqOpts.headers['x-authenticated-user-token']= USER_TOKEN
        return proxyReqOpts;
    }
}));
app.use(['/action/questionset/v1/*',
    '/action/question/v1/*',
    '/action/collection/v1/*',
    '/action/object/category/definition/v1/*',
    '/action/collection/v1/*'
    ], proxy(BASE_URL, {
    https: true,
    limit: '30mb',
    proxyReqPathResolver: function (req) {
        let originalUrl = req.originalUrl.replace('/action/', '/api/')
        console.log('proxyReqPathResolver questionset', originalUrl, require('url').parse(originalUrl).path);
        return require('url').parse(originalUrl).path;
    },
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
        console.log('proxyReqOptDecorator 3')
        // you can update headers
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        proxyReqOpts.headers['user-id'] = 'content-editor';
        proxyReqOpts.headers['Cookie'] = PORTAL_COOKIES;
        proxyReqOpts.headers['authorization'] = `Bearer ${API_AUTH_TOKEN}`;
        proxyReqOpts.headers['x-authenticated-user-token'] = USER_TOKEN;
         return proxyReqOpts;
    }
}));

app.use(['/action/program/v1/*',
    '/action/question/v1/bulkUpload',
    '/action/question/v1/bulkUploadStatus'
    ], proxy(BASE_URL, {
    https: true,
    limit: '30mb',
    proxyReqPathResolver: function (req) {
        let originalUrl = req.originalUrl.replace('/action/', '/api/')
        console.log('proxyReqPathResolver questionset', originalUrl, require('url').parse(originalUrl).path);
        return require('url').parse(originalUrl).path;
    },
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
        console.log('proxyReqOptDecorator 3')
        // you can update headers
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        proxyReqOpts.headers['user-id'] = 'content-editor';
        proxyReqOpts.headers['Cookie'] = PORTAL_COOKIES;
        proxyReqOpts.headers['authorization'] = `Bearer ${API_AUTH_TOKEN}`;
        proxyReqOpts.headers['x-authenticated-user-token'] = USER_TOKEN;
         return proxyReqOpts;
    }
}));

app.use(['/api','/assets','/action'], proxy(BASE_URL, {
    https: true,
    limit: '30mb',
    proxyReqPathResolver: function(req) {
        console.log('proxyReqPathResolver ',  urlHelper.parse(req.url).path);
        return urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        console.log('proxyReqOptDecorator 4')
        // you can update headers
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        proxyReqOpts.headers['user-id'] = 'content-editor';
        proxyReqOpts.headers['Cookie'] = PORTAL_COOKIES;
        return proxyReqOpts;
    }
}));

app.use(['/action/content/*'], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function (req) {
        let originalUrl = req.originalUrl.replace('/api/', '/api/')
        console.log('proxyReqPathResolver questionset', originalUrl, require('url').parse(originalUrl).path);
        return require('url').parse(originalUrl).path;
    },
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
        console.log('proxyReqOptDecorator 1')
        // you can update headers
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        proxyReqOpts.headers['user-id'] = 'content-editor';
        proxyReqOpts.headers['Cookie'] = PORTAL_COOKIES;
        return proxyReqOpts;
    }
}));
app.use(['/content/preview/*', '/content-plugins/*', '/assets/public/*'], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function(req) {
        return require('url').parse(`https://${BASE_URL}` + req.originalUrl).path
    },
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        console.log('proxyReqOptDecorator 5')
        // you can update headers 
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        proxyReqOpts.headers['user-id'] = 'content-editor';
        proxyReqOpts.headers['Cookie'] = PORTAL_COOKIES;
        proxyReqOpts.headers['authorization'] = `Bearer ${API_AUTH_TOKEN}`;
        return proxyReqOpts;
    }
}));
http.createServer(app).listen(app.get('port'), 3000);
