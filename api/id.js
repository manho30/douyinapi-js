/**
 * @Description : GET video ID from share link
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 19/11/2022 19:47
 * @File        : id.js
 * @IDE         : WebStorm
 */

const http = require('http')

const express = require('express');
const router = express.Router();

const cors = require('../helper/cors');

/**
 * @Description : GET video ID from video link
 * @param link
 * @returns {*}
 */
function parseId(link){
    console.log(link)
    try {
        return link.match(/video\/(\d+)?/)[1]
    } catch {
        try {
            return link.match(/modal_id=(\d+)/)[1]
        } catch {
            return;
        }
    }
}


/**
 * @Description : GET video ID from share link
 * @Interface
 * @param {string} share link
 * @return {string} video ID
 */
router.get('/id', async (req, res) => {
    let _link = req.query.link;
    let _json = req.query.json || true; // default is true

    if (!_link) {
        res.status(400)
        cors.addCorsHeader(res)
        _json ? res.json({
            'ok': false,
            'status': 400,
            'error': 'No URL provided'
        }) : res.send('No URL provided');
        return;
    }

    try {
        if (_link.includes('v.douyin.com')) {
            await http.get(`http://${req.headers.host}/link?link=${_link}`, (response) => {
                response.on('data', (data) => {
                    res.status(200);
                    cors.addCorsHeader(res);
                    _json ? res.json({
                        'ok': true,
                        'status': 200,
                        'result': parseId(JSON.parse(data).result)
                    }) : res.send(parseId(JSON.parse(data).result));
                    return;
                })
            })
        }
    } catch (e) {
        res.status(400)
        cors.addCorsHeader(res)
        _json ? res.json({
            'ok': false,
            'status': 500,
            'error': 'Internal Server Error' + e
        }) : res.send('Internal Server Error' + e);
        return;
    }

    try {
        if (_link.match(/video\/(\d+)?/) || _link.match(/modal_id=(\d+)/)) {
            res.status(200)
            cors.addCorsHeader(res)
            _json ? res.json({'ok': true, 'status': 200, 'result': parseId(_link)}) : res.send(parseId());
            return;
        }
    } catch (e) {
        res.status(400)
        cors.addCorsHeader(res)
        _json ? res.json({
            'ok': false,
            'status': 500,
            'error': 'Internal Server Error' + e
        }) : res.send('Internal Server Error' + e);
        return;
    }
})

module.exports = router;
