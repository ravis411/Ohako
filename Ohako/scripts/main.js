
// View of what is currently being displayed.  None for main page without any of the overlaying divs.
View = {Home: "home", Venue: "venue", Mailbox: "mailbox", SongBook: "songBook", Search: "search", Settings: "settings"}; 
view = null;

// Temp for mail
mail=false;

// Called after page loads to set up functionality.
function init(){
	buttonsInit();
	view = View.Home;
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
}

/*
	Displays the view provided.

	INPUT:  Div ID
*/
function displayView(div)
{
	closeCurrentView();

	if (view==div)
		div = 'home';
	
	

	view = div;

	//$('#'+view).css("display", "inline");
	$('#'+view).show( "slide", 500);
	$('#'+view+'Nav').css("background-color", "red");

	$('#songBookInterior').jScrollPane();
}

function displayMail(){
	if (!mail){
		$('#mailView').html("<img src=\"images/email.png\">");
		mail=true;
	}
	else{
		$('#mailView').html("Select a message from left.");
		mail=false;
	}
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