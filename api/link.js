/**
 * @Description : Convert share link to video link
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 19/11/2022 13:05
 * @File        : link.js
 * @IDE         : WebStorm
 */

const https = require('https');

const express = require('express');
const router = express.Router();

const cors = require('../helper/cors');

/**
 * @Description : Convert share link to video link
 * @Interface
 * @param {string} share link
 * @return {string} video link
 */
router.get('/link', (req, res) => {
    let _link = req.query.link;
    let _json = req.query.json || true; // default is true

    if (!_link) {
        res.status(400)
        cors.addCorsHeader(res)
        _json ? res.json({
            'ok': false,
            'status': 400,
            'result': 'No URL provided'
        }) : res.send('No URL provided');
        return;
    }

    // regex check is link valid
    let _regex = /^https:\/\/v\.douyin\.com\/[a-zA-Z0-9]+\/$/;
    if (!_regex.test(_link)) {
        res.status(400)
        cors.addCorsHeader(res)
        _json ? res.json({
            'ok': false,
            'status': 400,
            'result': 'Invalid URL'
        }) : res.send('Invalid URL');
        return;
    }

    https
        .get(_link, (response) => {
            response.statusCode === 302 ? _link = response.headers.location.split('?')[0] : _link = _link.split('?')[0];
            res.status(200);
            cors.addCorsHeader(res);
            _json ? res.json({'ok': true, 'status': 200, 'result': _link}) : res.send(_link);
            return;
        })
});

module.exports = router;