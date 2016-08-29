'use strict';
require('dotenv').config({silent: true});

var config = {
	PORT: getEnv('PORT') || 3001,
	REDISURL: getEnv('REDISURL') || 'user:auth123@localhost:6379'
};
module.exports = config;

function getEnv(variable) {
	if (!process.env.hasOwnProperty(variable)) {
		return undefined;
	}
	return process.env[variable];
}
