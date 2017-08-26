'use strict';
const config = require(base`./config`);
const redis = require('redis');
const url = require('url');

module.exports = {
    getConnection: getConnection
};

function getConnection() {
    let client = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);
    // if (redisConfig.auth !== null) {
    //     client.auth(redisConfig.auth);
    // }
    client.on('error', (e) => {
        console.log(`RedisClient::getConnection() - ${e}`);
    });
    return client;
}
