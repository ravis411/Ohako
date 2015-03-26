/* *******************************************************
	Functions for venue chat
******************************************************** */
var chatMessagesDivScrollPaneAPI = null;
var venueLastUpdate = null;
var venueLastChat = null;

function initVenueChat(){
	//Initialise the JScrollPane
	chatMessagesDivScrollPaneAPI = $('#chatBoxScroll').jScrollPane().data('jsp');
	
	$("#chatBoxInputDiv input").keyup(function (e) {	if (e.keyCode == 13) {	saveChat();	}	});
	$("#chatUsersList").html("");

	reloadChats();
	reloadUsers();
	
	$("#chatBoxInputDiv input").focus(function(){reloadChats(); reloadUsers();});
	//setInterval(reloadChats, 2000);
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
		$("#chatUsersList").html("");
		data['userList'] = jQuery.parseJSON(data['userList']);

		for (var user in data['userList']){
			$("#chatUsersList").prepend('<div class="userProfile" value="'+ data['userList'][user]['userID'] + '">' + data['userList'][user]['userName'] + '</div>');
		}
		$(".userProfile").on('click', function(){displayView(View.SongBook, $(this).attr('value'))});
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
			chatMessagesDivScrollPaneAPI.getContentPane().html(result);
			chatMessagesDivScrollPaneAPI.reinitialise();
			chatMessagesDivScrollPaneAPI.scrollToBottom();
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