const express = require('express')
const rateLimit = require('express-rate-limit')

const limit = rateLimit({
    //in 1 Hour we can hit max 100 API's
    windowMs: 1*60*60*1000,
    max: 100,
    message: "Too many requests from the user"
})

module.exports  = {limit}
