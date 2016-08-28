'use strict';

const SocketIO = require('socket.io');
const pub = require(base`Redis`);
const sub = require(base`Redis`);

var io;
var users = {};
module.exports = function(server) {
	io = SocketIO.listen(server);
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
		user: this.username,
		payload: message
	};
	io.emit('chat message', msgObj);
	console.log(`${this.username}: ${msgObj.payload}`);
}
