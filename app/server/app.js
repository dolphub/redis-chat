'use strict'

const express = require('express');
const http = require('http');
const path = require('path');

global.base = (literals) => `${__dirname}/${literals}`;

let config = require('./config');
let app = express();
let server = http.createServer(app);
let io = require('./SocketServer')(server);

let redisClient = require('./Redis');

app.set('port', config.PORT);
app.use(express.static('./app/client'));
app.use(express.static('./bower_components'));

server.listen(app.get('port'), () => {
	console.log('Express running on port', app.get('port'));
});
