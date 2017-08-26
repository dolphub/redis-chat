'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
require('dotenv').config();

global.base = (literals) => `${__dirname}/${literals}`;

let config = require('./config');
let app = express();
let server = http.createServer(app);
let io = require('./SocketServer')(server);

let redisClient = require('./Redis');

app.set('port', config.PORT);
app.use(express.static('./app/client'));
app.use(express.static('./bower_components'));

app.get('/api', (req, res) => {
    var number = Math.random();
    for (var i = 1; i < 20000; i++) {
        number = Math.tan((Math.tan(number) + Math.random() * i * 192874129847124) / 4.23424);
    }
    res.json(number);
});

server.listen(app.get('port'), () => {
	console.log('Express running on port', app.get('port'));
});
