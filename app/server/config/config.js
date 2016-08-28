'use strict';
require('dotenv').config();

var config = {
	PORT: getEnv('PORT') || 3001,
	REDISURL: getEnv('REDISURL') || 'user:auth123@localhost:6379'
};
module.exports = config;

function getEnv(variable) {
	if (!process.env.hasOwnProperty(variable)) {
		console.warn(`No environment variable set for ${variable}`);
		return undefined;
	}
	return process.env[variable];
}
