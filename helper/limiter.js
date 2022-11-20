/**
 * @Description : Rate limit for API
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 20/11/2022 10:16
 * @File        : limiter.js
 * @IDE         : WebStorm
 */

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        'ok': false,
        'status': 429,
        'error': 'Too many requests, Please try again later.'
    },
    strandardHeaders: true
});

module.exports = {
    limiter
}