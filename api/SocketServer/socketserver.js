'use strict';
var io;
var users = {};
const config = require('../config');
const os = require('os');
module.exports = () => {

    // Initialize SocketIO
    io = require('socket.io')();
    const redisAdapter = require('socket.io-redis');
    io.adapter(redisAdapter({ host: config.REDIS_HOST, port: config.REDIS_PORT }));

    io.on('connection', function(socket) {
        console.log('New connection');
        socket.on('disconnect', onDisconnection.bind(socket));
        socket.on('user login', onUserLogin.bind(socket));
        socket.on('chat message', onChatMessage.bind(socket));
    });
    return io;
};

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
        hostname: os.hostname(),
        user: this.username,
        payload: message
    };
    io.emit('chat::message', JSON.stringify(msgObj));
    console.log(`Socket::onChatMessage() - ${this.hostname}: ${msgObj.payload}`);
}
