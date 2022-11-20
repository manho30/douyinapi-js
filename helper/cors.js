/**
 * @Description : Add CORS headers to response header
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 19/11/2022 13:44
 * @File        : cors.js
 * @IDE         : WebStorm
 */

const express = require('express');

function addCorsHeader(res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    return res;
}

exports.addCorsHeader = addCorsHeader;