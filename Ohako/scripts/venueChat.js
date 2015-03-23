/* *******************************************************
	Functions for venue chat
******************************************************** */
var chatMessagesDivScrollPaneAPI = null;

function initVenueChat(){
	//Initialise the JScrollPane
	chatMessagesDivScrollPaneAPI = $('#chatBoxScroll').jScrollPane().data('jsp');
	
	$("#chatBoxInputDiv input").keyup(function (e) {	if (e.keyCode == 13) {	saveChat();	}	});

	reloadChats();
	//reloadUsers();
	
	$("#chatBoxInputDiv input").focus(reloadChats);
	//setInterval(reloadChats, 2000);

	//hackForChangeingUser();
}

function reloadUsers(){

	$.post("http://wrytek.us/scripts/venueChat/getUsers.php",{},function(){
		$("#chatUsersList").html(result);
	});
	
}


function reloadChats(){
		$.post("http://wrytek.us/scripts/venueChat/getChats.php",{}, function(result){
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