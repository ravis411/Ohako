
// View of what is currently being displayed.  None for main page without any of the overlaying divs.
View = {Home: "home", Venue: "venue", Mailbox: "mailbox", SongBook: "songBook", Search: "search", Settings: "settings"}; 
view = null;

PullDown = {CheckIn: "checkIn", Closed: "closed"};
pullDown = PullDown.Closed;

Home = {SearchAndDiscover: "searchAndDiscover", Venue: "venue"};
home = Home.SearchAndDiscover;

// Temp for mail
mail=false;

checkedIn = false; 

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

	$('.mailItem').on('click', function(){displayMail()});
	$('#mailList').on('click', '.mailItem' , handleMailClick);
	$('#mailMessageSubmitButton').on('click', saveMessage);

	$('#pullDown').on('click', function(){displayPullDown()});

	$('#buttonCheckIn').on('click', function(){checkIn()});
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
			nightUI();
		}

	else if (home != Home.SearchAndDiscover){
		home = Home.SearchAndDiscover;
		$('#homeVenue').fadeOut();
		$('#searchAndDiscover').fadeIn();
		dayUI();
	}
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
	//$('#'+view).css("display", "none");
	$('#'+view).hide( "slide", 500);
	if (home==Home.SearchAndDiscover)
		$('#'+view+'Nav').css("background-color", "#ffb54b");
	else
		$('#'+view+'Nav').css("background-color", "#ba26ff");
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






