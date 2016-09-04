'use strict';

const session = require("express-session");

const Store = require(base`Redis`);
const Redis = require(base`Redis`);

let sub = Redis.getConnection();
let pub = Redis.getConnection();
var io;
var users = {};
module.exports = function(server) {
    if (!server && io) {
        return io;
    }
    if (!server) {
        throw new Error('SocketServer::constructor() - No server object provided');
    }

    // Initialize SocketIO
    io = require('socket.io')(server);

    io.on('connection', function(socket) {
        console.log('New connection');
        socket.on('disconnect', onDisconnection.bind(socket));
        socket.on('user login', onUserLogin.bind(socket));
        socket.on('chat message', onChatMessage.bind(socket));
    });
    return io;
};

sub.on('message', onRedisMessage.bind(this));
sub.subscribe('chat::message');

sub.on('subscribe', (channel, count) => {
	console.log(channel, count);
});

function onRedisMessage(channel, message) {
	console.log(`Socket::onRedisMessage() - ${message}`);
	io.emit('chat message', JSON.parse(message));
}

function onDisconnection() {
    console.log(`${this.username} disconnected`);
}

function onUserLogin(username) {
    if (!username) {
        console.warn('Username not provided');
        return;
    }
    this.username = username;
    users[this.username] = this;
    console.log(`${this.username} has logged into the server.`);
    this.broadcast.emit('user login', this.username);
}

function onChatMessage(message) {
    if (!this.username) {
        console.log('User has no username');
        return;
    }
    var msgObj = {
        user: this.username,
        payload: message
    };
    pub.publish('chat::message', JSON.stringify(msgObj));
    console.log(`Socket::onChatMessage() - ${this.username}: ${msgObj.payload}`);
}
