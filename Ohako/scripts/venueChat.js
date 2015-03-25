/* *******************************************************
	Functions for venue chat
******************************************************** */
var chatMessagesDivScrollPaneAPI = null;
var venueLastUpdate = 0;

function initVenueChat(){
	//Initialise the JScrollPane
	chatMessagesDivScrollPaneAPI = $('#chatBoxScroll').jScrollPane().data('jsp');
	
	$("#chatBoxInputDiv input").keyup(function (e) {	if (e.keyCode == 13) {	saveChat();	}	});
	$("#chatUsersList").html("");

	reloadChats();
	reloadUsers();
	
	$("#chatBoxInputDiv input").focus(function(){reloadChats(); reloadUsers();});
	//setInterval(reloadChats, 2000);

	//hackForChangeingUser();
}

function reloadUsers(){

	$.post("/scripts/venueChat/",{
		intent:"getUsers",
		lastUpdate:"0",
		venueID:"0"
	},function(result){
		result = JSON.parse(result);
		updateUsers(result);
	});
	
}

function updateUsers(data){
	for (var userData in data){
		$("#chatUsersList").prepend('<div class="userProfile">' + data[userData] + '</div>');
	}
}


function reloadChats(){
		$.post("/scripts/venueChat/getChats.php",{}, function(result){
			chatMessagesDivScrollPaneAPI.getContentPane().html(result);
			chatMessagesDivScrollPaneAPI.reinitialise();
			chatMessagesDivScrollPaneAPI.scrollToBottom();
		});
}

//Hack for changeing user
function hackForChangeingUser(){
	currentUser = "NAME";
	$("#chatUsersList").on('click', '.userProfile' , function(){
		currentUser = $(this).html();
	});
	$("#header_user_div").on('click', function(){currentUser = "NAME"});
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