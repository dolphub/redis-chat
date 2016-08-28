'use strict';
require('dotenv').config();

var config = {
	PORT: getEnv('PORT') || 3001,
	REDISURL: getEnv('REDISURL') || '127.0.0.1:6379'
};
module.exports = config;

function getEnv(variable) {
	if (!process.env.hasOwnProperty(variable)) {
		console.warn(`No environment variable set for ${variable}`);
		return null;
	}
	return process.env[variable];
}
