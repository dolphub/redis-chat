var app = angular.module('nodeChat', ['ui.bootstrap', 'cgPrompt']);

// TODO: Able to forward socket connections through ngin

app.factory('socket', function () {
	var socket = io.connect(`${location.protocol+'//'+location.hostname}/ws`);
	return socket;
});

app.controller('chatCtrl', ['$scope', '$timeout', '$interval', 'socket', 'prompt', function ($scope, $timeout, $interval, socket, prompt) {
	$scope.headerMessage = "RedisChat v1.0.0";
	$scope.subMessage = "Powered by AngularJS, NodeJS, ExpressJS, Socket.IO and Redis";
	$scope.msgQueue = [];
	$scope.msg = "";
	$scope.username = "";
	$scope.update = false;


	/**
	 * @param {object} Keypress Event
	 * On Enter key it will send the message to the server
	 */
	$scope.sendMessage = function (e) {
		if (e.which === 13 && $scope.msg !== "") {
			socket.emit('chat message', $scope.msg);
			$scope.msg = "";
		}
	}

	// Message event
	socket.on('chat::message', function (msg) {
		$scope.addMsg(msg);
	});

	// New user has logged in
	// socket.on('user login', function (usr) {
	// 	$scope.addMsg(usr + ' has joined the channel.');
	// });

	// Private message
	// socket.on('whisper message', function (msg, usr) {
	// 	$scope.addMsg('[' + usr + '] whispers: ' + msg);
	// });


	/**
	 * @param {string} Message to put into the messageQueue
	 * Adds a message to the message model
	 */
	$scope.addMsg = function (msg) {
		msgObj = typeof msg === "object" ? msg : JSON.parse(msg);
		msgObj.ts = moment(Date.now());
		// Socket service not an angualr module, not on the digest cycle
		$timeout(function () {
			$scope.msgQueue.push(msgObj);
		}, 0);
	}

	$interval(function () {
		$scope.update = !$scope.update;
	}, 5000);

	/**
	 * Prompts the user for their username, and ensures
	 * they have a username before allowing to participate
	 */
	$scope.promptUsername = function () {
		prompt({
			"title": "Login",
			"message": "",
			"input": true,
			"label": "Enter a Username",
			"value": ""
		}).then(function (result) {
			$scope.username = result;
			socket.emit('user login', result);
			$scope.addMsg({ user: 'Server', payload: 'Welcome to RedisChat ' + result + '!', ts: Date.now() });
		}).finally(function () {  // Checks to see if they have entered a username or not
			if ($scope.username === "")
				$scope.promptUsername();
		});
	};

}]);
