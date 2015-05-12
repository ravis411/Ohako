//Chat.js 
//Client chat class
var socketURL = "http://wrytek.us";
var chat = null;

//Params:
//userID: username/userID
//divID: the id of the div that will contain the chat.
var Chat = function(userID, divID, room){

	//Can only have one Chat
	if(chat === null || chat === undefined){
		chat = this;
		console.log("Initializing sockets...");
	}else return $(window).Chat;

	this.room = room === undefined?"default":room;
	this.socket = null;
	if(divID === null || divID === undefined)	divID = "Chat";
	this.$div = $("#" + divID);
	this.$input = null;
	this.$messages = null;
	this.initSocket(userID);
	this.initHTML();
}


// initSocket
//
Chat.prototype.initSocket = function(userID){
	this.socket = io(socketURL + ":8080/chat/");
	this.socket.emit('set user', userID);//Set the user id for this connection.

	this.socket.on('chat message', function(data){
		chat.addChatMessage(data);
		console.log("chat message: " + data);
	});

	//Join and Leave room events
	this.socket.on('joined room', function(data){
		chat.addRoomJoinedMessage(data);
	});
	this.socket.on('left room', function(data){
		chat.addRoomLeftMessage(data);
	});

	//Chat Typing Events
	this.socket.on('typing', function(data){

	});
	this.socket.on('stop typing', function(data){

	});


}///End initSocket

//Function addChatMessage
// params: data {room: x, username: x}
Chat.prototype.addChatMessage = function(data){
	appendMessage(data.username + ": " + data.msg);
}

Chat.prototype.addRoomJoinedMessage = function(data){
	appendMessage(data.username + " joined room " + data.room);
}
Chat.prototype.addRoomLeftMessage = function(data){
	appendMessage(data.username + " left room " + data.room);
}

Chat.prototype.joinRoom = function(room){
	this.socket.emit('joinRoom', room);
	this.room = room;
}
// Leave the chat room
//If room is supplied leaves only that room
//If not given leaves the current room.
Chat.prototype.leaveRoom = function(room){
	if(room === null || room === undefined){
		room = this.room;
		this.room = null;
	}
	this.socket.emit('leaveRoom', room);
}
Chat.prototype.switchRooms = function(room){
	this.leaveRoom(this.room);
	this.joinRoom(room);
}

Chat.prototype.initHTML = function(){
	
	this.$div.html('');
	this.$div.addClass("Chat");
	this.$div.append('<link rel="stylesheet" type="text/css" href="/scripts/Chat/Chat.css">');
	this.$input = $('<form class="chat_input_form" action=""><input class="messageInput" autocomplete="off" /><button>Send</button></form>');
	this.$messages = $('<div class="Chat_messages_container"></div>');
	var $wrapper = $("<div class='Chat_wrapper'></div>");

	$wrapper.append(this.$messages);
	this.$div.append($wrapper);
	this.$div.append(this.$input);

	this.$div.on('submit', 'form', function(){
		var msg = chat.$input.children('.messageInput').val();
		chat.socket.emit('chat message', {room: chat.room, msg: msg});
		chat.$input.children('.messageInput').val('');
		console.log('Sending message: ', msg);
		return false;
  });
}




function appendMessage(message){
	chat.$messages.append("<li>" + message + "</li>");
}