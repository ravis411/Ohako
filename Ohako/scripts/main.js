
// View of what is currently being displayed.  None for main page without any of the overlaying divs.
View = {Home: "home", Venue: "venue", Mailbox: "mailbox", SongBook: "songBook", Search: "search", Settings: "settings"}; 
view = null;

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
	if (view!=div)
		closeCurrentView();
	else
		return;

	view = div;

	$('#'+view).css("display", "inline");
	$('#'+view+'Nav').css("background-color", "red");
}

function displayMail(){
	$('#mailView').html("<img src=\"images/email.png\">");
}

/*
	Closes the current view and resets views that require a reset. 
*/
function closeCurrentView()
{
	$('#'+view).css("display", "none");
	$('#'+view+'Nav').css("background-color", "#ffb54b");
}