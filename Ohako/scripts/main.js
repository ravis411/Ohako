
// View of what is currently being displayed.  None for main page without any of the overlaying divs.
View = {Home: "home", Venue: "venue", KaraokeSongBook: "karaokeSongBook", Mailbox: "mailbox", SongBook: "songBook", Search: "search", Settings: "settings"}; 
view = null;

PullDown = {CheckIn: "checkIn", Closed: "closed"};
pullDown = PullDown.Closed;

Home = {SearchAndDiscover: "searchAndDiscover", Venue: "venue"};
home = Home.SearchAndDiscover;

checkedIn = false; 

//The current user
currentUser = null;

// Called after page loads to set up functionality.
function init(){
	buttonsInit();
	view = View.Home;
	initMail();
	initVenueChat();

	hackCurrentView("venue");
	
	//Set to true when testing venueinterior
	if(false){
		checkIn();
	}
}

function hackCurrentView(display){
	displayView(display);
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

	slideImages();
}

function slideImages(){
	setInterval(function(){
		if ($('#featuredImage').attr("src") == "images/barAd1.png")
			$('#featuredImage').attr("src", "images/barAd2.png");
		else
			$('#featuredImage').attr("src", "images/barAd1.png");
	}, 10000);

	setInterval(function(){
		if ($('#customImage').attr("src") == "images/barAd3.png")
			$('#customImage').attr("src", "images/barAd4.png");
		else
			$('#customImage').attr("src", "images/barAd3.png");
	}, 7000);
}

/*
	Displays the view provided.

	INPUT:  Div ID
*/
function displayView(div)
{
	//Prevents closing and reopening home when we are already there
	if(div == view && view == View.Home)
		return;
	
	closeCurrentView();

	if (view==div)
		div = 'home';

	view = div;

	if (view==View.Venue)
		getData(1);

	if (home == Home.Venue){
		if (view!=View.Home && view!=View.KaraokeSongBook)
			$('#interiorControlsBox').fadeOut();
		else
			$('#interiorControlsBox').fadeIn();

		if (view==View.KaraokeSongBook){
			$('#interiorNavSongBook').css("border", "1px solid #ba26ff");
			$('#infoPanelImage').attr("src", "images/infoPanelKaraoke.png");
			$('#infoPanel').css("background-color", "#c3c3c3");
		}
		else{
			$('#interiorNavSongBook').css("border", "");
			$('#infoPanelImage').attr("src", "images/infoPanel.png");
			$('#infoPanel').css("background-color", "#3e3e3e");
		}
	}

	$('#'+view).show( "slide", 500);
	$('#'+view+'Nav').css("background-color", "red");

	$('#profileSongBook').jScrollPane();
}

function getData(venueID) {
	$.post("/scripts/getData/venueData.php", {id: venueID}, function(result){
		console.log(result);
			venueData = jQuery.parseJSON(result);
			console.log(venueData[0]);
			$('#venueInteriorLogo').html("<img width=135 height=100 src=\"" + venueData[0].imageLocation +"\" />");
			
			if (venueData[0].details[0]['patio']!="true")
				$('#patio').append("<img id=\"prohibited\" src=\"images/icons/prohibited.png\" width=\"25px\" height=\"25px\" \>");
			if (venueData[0].details[0]['drinks']!="true")
				$('#drinks').append("<img id=\"prohibited\" src=\"images/icons/prohibited.png\" width=\"25px\" height=\"25px\" \>");
			if (venueData[0].details[0]['smoking']!="true")
				$('#smoking').append("<img id=\"prohibited\" src=\"images/icons/prohibited.png\" width=\"25px\" height=\"25px\" \>");
			$('#karaokeNights').html(venueData[0].karaoke);
			$('#venueStarCount').rateit('value', venueData[0].rating);
		});
}

/*
	Checks User into the received venue.

		TODO:  Add parameter to allow function to check User in.
			Will pull the necessary data for the Venue page, log user in on server, etc...
*/
function checkIn(){	
	if (!checkedIn){
		
		var venueID = 0;
		currentUser.checkIn(venueID);
		
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

	if (checkedIn)
		$('#splashImage').attr("src", "images/splashImageExit.png");
	else
		$('#splashImage').attr("src", "images/splashImage.png");
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

function getVenueData(id){
	
}

