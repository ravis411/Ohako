/* *******************************************************
	Functions for venue chat
******************************************************** */
var chatMessagesDivScrollPaneAPI = null;
var venueLastUpdate = null;

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

		for (var userData in data["userList"]){
			$("#chatUsersList").append('<div class="userProfile">' + data["userList"][userData] + '</div>');
		}
	}
}


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