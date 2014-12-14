
// View of what is currently being displayed.  None for main page without any of the overlaying divs.
View = {Home: "home", Venue: "venue", Mailbox: "mailbox", SongBook: "songBook", Search: "search", Settings: "settings"}; 
view = null;

// Temp for mail
mail=false;

// Called after page loads to set up functionality.
function init(){
	buttonsInit();
	view = View.Home;
	loadMailThreads();
}

// Initializes all of the buttons
function buttonsInit(){
	// Initialize header buttons
	$('#logo').on('click', function(){displayView(View.Home)});
	$('#header_user_div').on('click', function(){displayView(View.SongBook)});

	// Initialize control buttons
	$('#mailboxNav').on('click', function(){displayView(View.Mailbox)});
	$('#songBookNav').on('click', function(){displayView(View.SongBook)});
	$('#searchNav').on('click', function(){displayView(View.Search)});
	$('#settingsNav').on('click', function(){displayView(View.Settings)});
	$('.contentVenueImage').on('click', function(){displayView(View.Venue)});
	$('#mailList').on('click', '.mailItem' , handleMailClick);
	$('#mailMessageSubmitButton').on('click', saveMessage);
}

/*
	Displays the view provided.

	INPUT:  Div ID
*/
function displayView(div)
{
	//Prevents closing and reopening home when we are already there
	if(div == view && view == 'home')
		return;
	
	closeCurrentView();

	if (view==div)
		div = 'home';
	
	

	view = div;

	//$('#'+view).css("display", "inline");
	$('#'+view).show( "slide", 500);
	$('#'+view+'Nav').css("background-color", "red");

	$('#songBookInterior').jScrollPane();
}

/*
	Closes the current view and resets views that require a reset. 
*/
function closeCurrentView()
{
	//$('#'+view).css("display", "none");
	$('#'+view).hide( "slide", 500);
	$('#'+view+'Nav').css("background-color", "#ffb54b");
}


/*
	Functions for messages
*/
function loadMailThreads(){
	$.post("/scripts/getThreads.php",{}, function(result){
		$("#mailList").html(result);
	});
}


function handleMailClick(e){
	if( $(this).hasClass("selectedMailThread") ){
		$('#mailMessagesDiv').html("Select a message from left.");
		$(this).removeClass("selectedMailThread");
	}
	else{
		$(".selectedMailThread").removeClass("selectedMailThread");
		displayMail(this);
	}

}

function displayMail(thread){
		$(thread).addClass("selectedMailThread");
		$.post("/scripts/getMessages.php",{thread:$(thread).html()}, function(result){
			$("#mailMessagesDiv").html(result);
		});
}

function saveMessage(){
	var threadName = $(".selectedMailThread").html();
	var messageText = $("#mailInputDiv input").val();
	
	if(threadName == undefined){
		return;
	}
	$.post("/scripts/saveMessage.php",
		{
			thread:threadName,
			message:messageText
		},
		function(data, status){
			if(data == "Success"){
				//alert("Test Successful.");
			}else{
				alert("Data: " + data + ". Success: " + status);
			}
		});
}






