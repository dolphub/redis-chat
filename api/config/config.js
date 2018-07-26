'use strict';

module.exports = {
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    PORT: process.env.PORT || 3000,
    PORT: process.env.SOCKET_PORT || 3002    
};
