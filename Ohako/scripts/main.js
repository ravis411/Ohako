
// View of what is currently being displayed.  None for main page without any of the overlaying divs.
View = {Home: "home", Venue: "venue", KaraokeSongBook: "karaokeSongBook", Mailbox: "mailbox", SongBook: "songBook", Search: "search", Settings: "settings"}; 
view = null;

PullDown = {CheckIn: "checkIn", Closed: "closed"};
pullDown = PullDown.Closed;

Home = {SearchAndDiscover: "searchAndDiscover", Venue: "venue"};
home = Home.SearchAndDiscover;

checkedIn = false; 

//The current user
currentUser = "NAME";

// Called after page loads to set up functionality.
function init(){
	buttonsInit();
	view = View.Home;
	initMail();
	initChat();
	
	hackForChangeingUser();
	
	//Set to true when testing venueinterior
	if(true){
		checkIn();
	}
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

	$('#pullDown').on('click', function(){displayPullDown()});

	$('#buttonCheckIn').on('click', function(){checkIn()});

	$('#interiorNavSongBook').on('click', function(){displayView(View.KaraokeSongBook)});
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

	if (home == Home.Venue){
		if (view!=View.Home && view!=View.KaraokeSongBook)
			$('#interiorControlsBox').fadeOut();
		else
			$('#interiorControlsBox').fadeIn();

		if (view==View.KaraokeSongBook)
			$('#interiorNavSongBook').css("border", "1px solid #ba26ff");
		else
			$('#interiorNavSongBook').css("border", "");
	}

	$('#'+view).show( "slide", 500);
	$('#'+view+'Nav').css("background-color", "red");

	$('#songBookInterior').jScrollPane();
}

/*
	Checks User into the received venue.

		TODO:  Add parameter to allow function to check User in.
			Will pull the necessary data for the Venue page, log user in on server, etc...
*/
function checkIn(){
	if (!checkedIn){
		checkedIn = true; 
		$('#buttonCheckIn').attr("src", 'images/checkout.png');
	}
	else{
		checkedIn = false;
		$('#buttonCheckIn').attr("src", 'images/checkin.png');
	}

	if (pullDown != PullDown.Closed)
		displayPullDown();

	changeHome();
}

/*
	Switches User's home.
*/
function changeHome(){
	if (home == Home.SearchAndDiscover && checkedIn){
			home = Home.Venue;
			$('#searchAndDiscover').fadeOut();
			$('#homeVenue').fadeIn();
			$('#interiorControlsBox').fadeIn();
			nightUI();
			reloadChats();
		}

	else if (home != Home.SearchAndDiscover){
		home = Home.SearchAndDiscover;
		$('#interiorControlsBox').fadeOut();
		$('#homeVenue').fadeOut();
		$('#searchAndDiscover').fadeIn();
		dayUI();
		closeInteriorViews();
	}
}

function closeInteriorViews(){
	if (view == View.KaraokeSongBook)
		displayView(View.Home);
}

function nightUI(){
	$('#header').css("background", '#3e3e3e');
	$('#header').css("border-bottom", '2px solid #a4a4a4');

	$('#content').css("background-color", '#b0b0b0');

	$('#controlsNav').css("background-color", '#ba26ff');

	$('#logo').attr("src", 'images/logo_ohako_night.png');

	updateNavs('#ba26ff');
}

function dayUI(){
	$('#header').css("background", '#ffdcaa');
	$('#header').css("border-bottom", '2px solid #ffc066');

	$('#content').css("background-color", '#ffe8c7');

	$('#controlsNav').css("background-color", '#ffb54b');

	$('#logo').attr("src", 'images/logo_ohako.png');

	updateNavs('#ffbf4b');
}

function updateNavs(color){
	$('#mailboxNav').css("background-color", color);
	$('#songBookNav').css("background-color", color);
	$('#settingsNav').css("background-color", color);
	$('#searchNav').css("background-color", color);

	$('#'+view+'Nav').css("background-color", "red");
}

/*
	Handles the pulldown.
*/
function displayPullDown(){
	if (pullDown != PullDown.Closed){
		pullDown = PullDown.Closed;
		closePullDown();
	}
	
	else if (pullDown == PullDown.Closed){
		pullDown = PullDown.CheckIn;
		openPullDown();
	}
}

function openPullDown(){
	$('#pullDown').animate({top: "+=199px"}, 500, function(){});
	$('#checkIn').slideDown(500);
}

function closePullDown(){
	$('#checkIn').slideUp(500);
	$('#pullDown').animate({top: "-=199px"}, 500, function(){});
}

/*
	Closes the current view and resets views that require a reset. 
*/
function closeCurrentView()
{
	$('#'+view).hide( "slide", 500);
	if (home==Home.SearchAndDiscover)
		$('#'+view+'Nav').css("background-color", "#ffb54b");
	else
		$('#'+view+'Nav').css("background-color", "#ba26ff");
}


/* ****
	Functions for mail messages
*/
var mailMessagesDivScrollPaneAPI = null;

function initMail(){
	//Initialise the JScrollPane
	mailMessagesDivScrollPaneAPI = $('#mailMessagesDiv').jScrollPane().data('jsp');
	
	$('#mailList').on('click', '.mailItem' , handleMailClick);
	
	$('#mailMessageSubmitButton').on('click', saveMessage);
	$("#mailInputDiv input").keyup(function (e) {	if (e.keyCode == 13) {	saveMessage();	}	});

	loadMailThreads();
}

function loadMailThreads(){
	$.post("/scripts/getThreads.php",{}, function(result){
		$("#mailList").html(result);
	});
}


function handleMailClick(e){
	if( $(this).hasClass("selectedMailThread") ){
		mailMessagesDivScrollPaneAPI.getContentPane().html("Select a message from left.");
		mailMessagesDivScrollPaneAPI.reinitialise();
		$(this).removeClass("selectedMailThread");
	}
	else{
		$(".selectedMailThread").removeClass("selectedMailThread");
		$(this).addClass("selectedMailThread");
		displayMailForSelectedThread();
	}

}

function displayMailForSelectedThread(){
		$.post("/scripts/getMessages.php",{thread:$(".selectedMailThread").html()}, function(result){
			mailMessagesDivScrollPaneAPI.getContentPane().html(result);
			mailMessagesDivScrollPaneAPI.reinitialise();
			mailMessagesDivScrollPaneAPI.scrollToBottom()
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
				displayMailForSelectedThread();
				$("#mailInputDiv input").val("");
			}else{
				//alert("Data: " + data + ". Success: " + status);
				displayMailForSelectedThread();
			}
		});
}

/*
	End of mail functions
*//* ****
	Functions for mail messages
*/
var mailMessagesDivScrollPaneAPI = null;

function initMail(){
	//Initialise the JScrollPane
	mailMessagesDivScrollPaneAPI = $('#mailMessagesDiv').jScrollPane().data('jsp');
	
	$('#mailList').on('click', '.mailItem' , handleMailClick);
	
	$('#mailMessageSubmitButton').on('click', saveMessage);
	$("#mailInputDiv input").keyup(function (e) {	if (e.keyCode == 13) {	saveMessage();	}	});

	loadMailThreads();
}

function loadMailThreads(){
	$.post("/scripts/getThreads.php",{}, function(result){
		$("#mailList").html(result);
	});
}


function handleMailClick(e){
	if( $(this).hasClass("selectedMailThread") ){
		mailMessagesDivScrollPaneAPI.getContentPane().html("Select a message from left.");
		mailMessagesDivScrollPaneAPI.reinitialise();
		$(this).removeClass("selectedMailThread");
	}
	else{
		$(".selectedMailThread").removeClass("selectedMailThread");
		$(this).addClass("selectedMailThread");
		displayMailForSelectedThread();
	}

}

function displayMailForSelectedThread(){
		$.post("/scripts/getMessages.php",{thread:$(".selectedMailThread").html()}, function(result){
			mailMessagesDivScrollPaneAPI.getContentPane().html(result);
			mailMessagesDivScrollPaneAPI.reinitialise();
			mailMessagesDivScrollPaneAPI.scrollToBottom()
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
				displayMailForSelectedThread();
				$("#mailInputDiv input").val("");
			}else{
				//alert("Data: " + data + ". Success: " + status);
				displayMailForSelectedThread();
			}
		});
}

/*
	End of mail functions
*/


/* ****
	Functions for mail messages
*/
var mailMessagesDivScrollPaneAPI = null;

function initMail(){
	//Initialise the JScrollPane
	mailMessagesDivScrollPaneAPI = $('#mailMessagesDiv').jScrollPane().data('jsp');
	
	$('#mailList').on('click', '.mailItem' , handleMailClick);
	
	$('#mailMessageSubmitButton').on('click', saveMessage);
	$("#mailInputDiv input").keyup(function (e) {	if (e.keyCode == 13) {	saveMessage();	}	});
	loadMailThreads();
}

function loadMailThreads(){
	$.post("http://wrytek.us/scripts/mail/getThreads.php",{}, function(result){
		$("#mailList").html(result);
	});
}


function handleMailClick(e){
	if( $(this).hasClass("selectedMailThread") ){
		mailMessagesDivScrollPaneAPI.getContentPane().html("Select a message from left.");
		mailMessagesDivScrollPaneAPI.reinitialise();
		$(this).removeClass("selectedMailThread");
	}
	else{
		$(".selectedMailThread").removeClass("selectedMailThread");
		$(this).addClass("selectedMailThread");
		displayMailForSelectedThread();
	}

}

function displayMailForSelectedThread(){
		$.post("http://wrytek.us/scripts/mail/getMessages.php",{thread:$(".selectedMailThread").html()}, function(result){
			mailMessagesDivScrollPaneAPI.getContentPane().html(result);
			mailMessagesDivScrollPaneAPI.reinitialise();
			mailMessagesDivScrollPaneAPI.scrollToBottom()
		});
}

function saveMessage(){
	var threadName = $(".selectedMailThread").html();
	var messageText = $("#mailInputDiv input").val();
	
	if(threadName == undefined){
		return;
	}
	$.post("http://wrytek.us/scripts/mail/saveMessage.php",
		{
			thread:threadName,
			message:messageText
		},
		function(data, status){
			if(data == "Success"){
				displayMailForSelectedThread();
				$("#mailInputDiv input").val("");
			}else{
				//alert("Data: " + data + ". Success: " + status);
				displayMailForSelectedThread();
			}
		});
}

/*
	End of mail functions
*/

/* *******************************************************
	Functions for venue chat
******************************************************** */
var chatMessagesDivScrollPaneAPI = null;

function initChat(){
	//Initialise the JScrollPane
	chatMessagesDivScrollPaneAPI = $('#chatBoxScroll').jScrollPane().data('jsp');
	
	$("#chatBoxInputDiv input").keyup(function (e) {	if (e.keyCode == 13) {	saveChat();	}	});

	reloadChats();
	
	$("#chatBoxInputDiv input").focus(reloadChats);
}


function reloadChats(){
		$.post("http://wrytek.us/scripts/venueChat/getChats.php",{user:"NAME"}, function(result){
			chatMessagesDivScrollPaneAPI.getContentPane().html(result);
			chatMessagesDivScrollPaneAPI.reinitialise();
			chatMessagesDivScrollPaneAPI.scrollToBottom()
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
			sender:currentUser,
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

function swap(targetId){
  if (document.getElementById){
        target = document.getElementById(targetId);
        if (target.style.display == "none")
             target.style.display = ""; 
        else
            target.style.display = "none";      
  }

  $('#karaokeSongBookList').jScrollPane();
}



