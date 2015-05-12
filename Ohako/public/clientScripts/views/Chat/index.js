var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/Chat.js', function(req, res){
  res.sendFile(__dirname + '/Chat.js');
});


var sockets = [];
var users = [];
var rooms = [];


var chat = io.of('/chat/')
.on('connection',function(socket){


	socket.userData = new User(socket);
	socket.userData.setUserID("ravis");
	users.push(socket.userData);
	console.log("new /chat/ connection: ", socket.id);



	socket.on('set user', function(username){
		console.log(socket.id, " is now ", username)
		socket.userData.setUserID(username);
	});


	socket.on('chat message', function(data){
		console.log('chat message: from: ', socket.userData.userID, data, " room: ", data.room, " msg: ", data.msg);
		chat.to(data.room).emit('chat message', {username: socket.userData.userID, msg: data.msg});
	});





	socket.on('typing', function(){
		socket.broadcast.emit('typing', {username: socket.userData.userID});
	});
	socket.on('stop typing', function(){
		socket.broadcast.emit('stop typing', {username: socket.userData.userID})
	});


	socket.on('joinRoom', function(room){
		console.log('\njoinRoom: ', room, ' already in: ', socket.rooms);
		socket.join(room)
		chat.to(room).emit('joined room', {username: socket.userData.userID, room: room});
		socket.userData.joinRoom(room);
		if(rooms[room] === null || rooms[room] === undefined){
			rooms[room] = [];
		}
		if(rooms[room].indexOf(socket.userData.userID) < 0)
			rooms[room][rooms[room].length] = socket.userData.userID;
		console.log("RRRRooms: ", rooms);
	});

	socket.on('leaveRoom', function(msg){
		leaveRoom(socket, msg);
	});


	socket.on('request room members', function(room){
		console.log("Request room members: ", room);
		socket.emit('request room members', rooms[room]);
	});

	socket.on('disconnect', function(reason){
		console.log(socket.userData.userID, ' disconnected: ', reason);

		var user = users.indexOf(socket.userData);

		for (var i = users[user].rooms.length - 1; i >= 0; i--) {
			leaveRoom(socket, users[user].rooms[i])
		};

		delete users[user];
		users.splice(user, 1);
	});

});



function leaveRoom(socket, room){
	rooms[room].splice( rooms[room].indexOf(socket.userData.userID), 1);
	console.log(socket.id, " leaving room ", room)
	chat.to(room).emit('left room', {username: socket.userData.userID, room: room})
	socket.leave(room)
}





var User = function(socket){
	this.socket = socket;
	this.userID = null;
	this.rooms = socket.rooms.slice();
	console.log("New User added: ", this.rooms)
}
User.prototype.joinRoom = function(room){
	console.log("User joining room: ", this.rooms)
	if(this.rooms.indexOf(room) != -1){
		console.log("Duplicate room: ", this.rooms)
	}else
		this.rooms.push(room);
}
User.prototype.setUserID = function(id){
	this.userID = id;
}














http.listen(8080, function(){
  console.log('listening on *:8080');
	console.log("Path: ", io.path());
});