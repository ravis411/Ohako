/* *******************************************************
	Functions for venue chat
******************************************************** */
var chatMessagesDivScrollPaneAPI = null;
var chatUsersDivScrollPaneAPI = null;
var venueLastUpdate = null;
var venueLastChat = null;

function initVenueChat(){
	//Initialise the JScrollPane
	chatMessagesDivScrollPaneAPI = $('#chatBoxScroll').jScrollPane({animateScroll:true, maintainPosition:true, stickToBottom:true}).data('jsp');
	chatUsersDivScrollPaneAPI = ($("#chatUsersList").jScrollPane()).data('jsp');
	chatUsersDivScrollPaneAPI.getContentPane().html("");
	chatUsersDivScrollPaneAPI.reinitialise();

	$("#chatBoxInputDiv input").keyup(function (e) {	if (e.keyCode == 13) {	saveChat();	}	});

	reloadChats();
	reloadUsers();
	chatMessagesDivScrollPaneAPI.scrollToBottom();
	$("#chatBoxInputDiv input").focus(function(){reloadChats(); reloadUsers(); chatMessagesDivScrollPaneAPI.scrollToBottom();});
	setInterval(function(){reloadChats(); reloadUsers();}, 2500);
}


function reloadUsers(){

	$.post("/scripts/venueChat/",{
		intent:"getUsers",
		lastUpdate:venueLastUpdate,
		venueID:"0"
	},function(result){
		result = JSON.parse(result);
		updateUsers(result);
		venueLastUpdate = result["time"];
	});
	
}

function updateUsers(data){

	if(data["updates"]){
		chatUsersDivScrollPaneAPI.getContentPane().html("");
		data['userList'] = jQuery.parseJSON(data['userList']);

		for (var user in data['userList']){
			chatUsersDivScrollPaneAPI.getContentPane().prepend('<div class="userProfile" value="'+ data['userList'][user]['userID'] + '">' + data['userList'][user]['userName'] + '</div>');
		}
		$(".userProfile").on('click', function(){displayView(View.SongBook, $(this).attr('value'))});
		chatUsersDivScrollPaneAPI.reinitialise();
	}
}

/*
function reloadChats(){
		$.post("/scripts/venueChat/",{
			intent:"getChats",
			lastID:venueLastChat
		}, function(data){
			data = JSON.parse(data);
			updateChats(data);
		});
}

function updateChats(chats){
	if(chats["chats"].length == 0){
		return;
	}
	if(venueLastChat == null){
		chatMessagesDivScrollPaneAPI.getContentPane().html("");
	}
	venueLastChat = chats["chats"][chats["chats"].length - 1]["ID"];


	var tempLastSender = null;

	for(var chat in chats["chats"]){
		var temp = "Sender: " + chats["chats"][chat]["sender"] + "<br>";

		chatMessagesDivScrollPaneAPI.getContentPane().append(temp);
	}
	chatMessagesDivScrollPaneAPI.reinitialise();
	chatMessagesDivScrollPaneAPI.scrollToBottom();
}*/



function reloadChats(){
		$.post("/scripts/venueChat/getChats.php",{}, function(result){
			var scrollable = chatMessagesDivScrollPaneAPI.getIsScrollableV();
			chatMessagesDivScrollPaneAPI.getContentPane().html(result);
			chatMessagesDivScrollPaneAPI.reinitialise();
			if(scrollable != chatMessagesDivScrollPaneAPI.getIsScrollableV())
				chatMessagesDivScrollPaneAPI.scrollToBottom(false);
		});
}

function saveChat(){
	var chatText = $("#chatBoxInputDiv input").val();
	
	$.post("http://wrytek.us/scripts/venueChat/saveChat.php",
		{
			message:chatText
		},
		function(data, status){
			if(data == "Success"){
				reloadChats();
				$("#chatBoxInputDiv input").val("");
			}else{
				//alert("Data: " + data + ". Success: " + status);
				reloadChats();
			}
		});
}

/*
	End of chat functions
*/