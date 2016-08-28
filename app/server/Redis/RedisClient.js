'use strict';
const config = require(base`./config`);
const redis = require('redis');
const url = require('url');

let redisConfig = url.parse(config.REDISURL);
let client = redis.createClient(redisConfig.port, redisConfig.hostname);

if (redisConfig.auth !== null) {
    client.auth(redisConfig.auth);
}

client.on('error', (e) => {
    console.log(e);
});

module.exports = client;
