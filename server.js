/**
 * @Description :
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 19/11/2022 12:58
 * @File        : server.js
 * @IDE         : WebStorm
 */

const express = require('express');

const link = require('./api/link');
const id = require('./api/id')
const download = require('./api/download');

const serveDouyinApi = port => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.get('/' , (req, res) => {
        res.send('Hello World');
    });

    app.get('/link', link);
    app.get('/id', id);
    app.get('/download', download);

    // CORS PREFLIGHT
    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.send();
    })

    app.listen(port, () => {
        console.log(`Douyin API Server is running on port ${port}`);
    });
};

module.exports = serveDouyinApi;