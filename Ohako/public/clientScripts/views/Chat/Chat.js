//Chat.js 
//Client chat class
var socketURL = "http://wrytek.us";
var chatManager = null;

//Params:
//userID: username/userID
//divID: the id of the div that will contain the chat.
var Chat = function(userID, divID, room){

	//Can only have one Chat
	if(chatManager === null || chatManager === undefined){
		chatManager = this;
		console.log("Initializing sockets...");
	}else return $(window).Chat;

	this.room = room === undefined?"default":room;
	this.socket = null;
	if(divID === null || divID === undefined)	divID = "Chat";
	this.$div = $("#" + divID);
	this.$input = null;
	this.$messages = null;
	if(userID !== null && userID !== undefined){
		this.userID = userID;
		
	}else{this.userID = "Guest";}
	this.initSocket(this.userID);
	this.initHTML();
}


// initSocket
//
Chat.prototype.initSocket = function(userID){
	this.socket = io(socketURL + ":8080/chat/");
	this.socket.emit('set user', userID);//Set the user id for this connection.

	this.socket.on('chat message', function(data){
		chatManager.addChatMessage(data);
		console.log("chat message: " + data);
	});

	//Join and Leave room events
	this.socket.on('joined room', function(data){
		chatManager.addRoomJoinedMessage(data);
	});
	this.socket.on('left room', function(data){
		chatManager.addRoomLeftMessage(data);
	});

	//Chat Typing Events
	this.socket.on('typing', function(data){

	});
	this.socket.on('stop typing', function(data){

	});


}///End initSocket

Chat.prototype.setUser = function(userName){
	this.userID = userName;
	this.socket.emit('set user', this.userID);
}

//Function addChatMessage
// params: data {room: x, username: x, msg: x}
Chat.prototype.tempLastSender = null;
Chat.prototype.addChatMessage = function(data){
	var message = ""
		
		//If a different sender than the last sender and not the current user
		if(chatManager.tempLastSender != data.username && data.username != chatManager.userID )
		{
			message = message + '<div class="chatMessageDetails">' + data.username + ':</div>';
		}
		
		message += '<div class="chatMessage ';
			if(data.username == chatManager.userID)
				message += 'sentChat';
			else
				message += 'recievedChat';
		message += '" title="By: '+ data.username + '">';
		message += data.msg + '</div>';
		chatManager.tempLastSender = data.username;
	
	//appendMessage(data.username + ": " + data.msg);
	chatManager.appendMessage(message);
}


Chat.prototype.appendMessage = function(message){
	chatManager.$messages.append(message);
	chatManager.scrollToBottom();
}


Chat.prototype.addRoomJoinedMessage = function(data){
	chatManager.appendMessage("<div class='joinedRoom roomChangeMessage'>" + data.username + " joined room " + data.room + "</div>");
}
Chat.prototype.addRoomLeftMessage = function(data){
	chatManager.appendMessage("<div class='leftRoom roomChangeMessage'>" + data.username + " left</div>");
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
	this.$div.append('<link rel="stylesheet" type="text/css" href="/clientScripts/views/Chat/Chat.css">');
	this.$input = $('<form class="chat_input_form" action=""><input class="messageInput" autocomplete="off" placeholder="Chat"/></form>');//<button>Send</button>
	this.$messages = $('<div class="Chat_messages_container"></div>');
	var $wrapper = $("<div class='Chat_wrapper'></div>");

	$wrapper.append(this.$messages);
	this.$div.append($wrapper);
	this.$div.append(this.$input);

	$(window).on('resize', function(){
		//chat.setHeightOfMessagesContainer();
	});
	//chat.setHeightOfMessagesContainer();
	this.$div.on('submit', 'form', function(){
		var msg = chatManager.$input.children('.messageInput').val();
		chatManager.socket.emit('chat message', {room: chatManager.room, msg: msg});
		chatManager.$input.children('.messageInput').val('');
		console.log('Sending message: ', msg);
		return false;
  });
}


Chat.prototype.setHeightOfMessagesContainer = function(scroll){
	var prevHeight = $(".Chat").height();
	$(".Chat_wrapper").height( $(".Chat").height() - $(".Chat_input_form").outerHeight(true) );
	setTimeout(function(){if(prevHeight != $(".Chat").height())setHeightOfMessagesContainer();}, 100);
	if(scroll != false)
		chatManager.scrollToBottom();
}

Chat.prototype.scrollToBottom = function(){
	chatManager.$messages.scrollTop((chatManager.$messages)[0].scrollHeight);
}

Chat.prototype.clearChat = function(){
	chatManager.$messages.html("");
}