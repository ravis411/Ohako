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
	this.userID = userID;
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
// params: data {room: x, username: x, msg: x}
Chat.prototype.tempLastSender = null;
Chat.prototype.addChatMessage = function(data){
	var message = ""
		
		//If a different sender than the last sender and not the current user
		if(chat.tempLastSender != data.username && chat.tempLastSender != chat.userID )
		{
			message = message + '<div class="chatMessageDetails">' + data.username + ':</div>';
		}
		
		message += '<div class="chatMessage ';
			if(data.username == chat.userID)
				message += 'sentChat';
			else
				message += 'recievedChat';
		message += "title='By:"+ data.username + "'>";
		message += data.msg + '</div>';
		chat.tempLastSender = data.username;
	
	//appendMessage(data.username + ": " + data.msg);
	chat.appendMessage(message);
}



Chat.prototype.appendMessage = function(message){
	chat.$messages.append(message);
}

Chat.prototype.addRoomJoinedMessage = function(data){
	chat.appendMessage(data.username + " joined room " + data.room);
}
Chat.prototype.addRoomLeftMessage = function(data){
	chat.appendMessage(data.username + " left room " + data.room);
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
	this.clearChat();
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

	$(window).on('resize', function(){
		setHeightOfMessagesContainer();
	});

	this.$div.on('submit', 'form', function(){
		var msg = chat.$input.children('.messageInput').val();
		chat.socket.emit('chat message', {room: chat.room, msg: msg});
		chat.$input.children('.messageInput').val('');
		console.log('Sending message: ', msg);
		return false;
  });
}


Chat.prototype.scrollToBottom = function(){
	chat.$messages.scrollTop((chat.$messages)[0].scrollHeight);
}

Chat.prototype.clearChat = function(){
	chat.$messages.html("");
}