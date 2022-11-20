/**
 * @Description : Download interface
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 19/11/2022 22:06
 * @File        : download.js
 * @IDE         : WebStorm
 */

const https = require('https');

const express = require('express');
const router = express.Router();

const cors = require('../helper/cors');
const parse = require('../helper/parse');

router.get('/download', async (req, res) => {
    const _id = req.query.id;
    const _json = req.query.json || true; // default is true
    let _result_ = '';
    let _type_ = '';

    if (!_id) {
        res.status(400)
        cors.addCorsHeader(res)
        _json ? res.json({
            'ok': false,
            'status': 400,
            'result': 'No video ID provided'
        }) : res.send('No video ID provided');
        return;
    }

    https.get(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${_id}`, (response) => {
        response.on('data', (data) => {
            _result_ += data
        })
        response.on('end', () => {

            _result_ = JSON.parse(_result_);

            if (!_result_.item_list[0]) {
                res.status(400)
                cors.addCorsHeader(res)
                _json ? res.json({
                    'ok': false,
                    'status': 400,
                    'result': 'No video found'
                }) : res.send('No video found');
                return;
            }

            if (_result_.item_list[0].image) {
                /** handle image */
                _type_ = 'image'
                res.json(parse.parseImageResponse(_result_, _id))
            } else {
                res.json(parse.parseVideoResponse(_result_, _id))
            }

        })
    })
})

module.exports = router;