
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
	currentUser=1;

	/*
		TODO
			Move initMail to when mail is opened.
			DO call the server to retrieve any new messages.
	*/

	//initMail();
	
	/*
		TODO
			Move initVenueChat to when it is opened.
	*/
	//initVenueChat();
	//getAds("CA");

	//hackCurrentView("venue");
	
	//Set to true when testing venueinterior
	if(false){
		checkIn();
	}

	initCheckIn();
}

function getAds(location) {
	$.post("/scripts/getData/getAds.php", {location: location}, function(result){
			venueData = jQuery.parseJSON(result);
		});
}

function hackCurrentView(display){
	displayView(display);
}

// Initializes all of the buttons
function buttonsInit(){
	// Initialize header buttons
	$('#logo').on('click', function(){displayView(View.Home)});
	$('#header_user_div').on('click', function(){displayView(View.SongBook, currentUser.ID)});

	// Initialize control buttons
	$('#mailboxNav').on('click', function(){displayView(View.Mailbox)});
	$('#songBookNav').on('click', function(){displayView(View.SongBook, currentUser.ID)});
	$('#searchNav').on('click', function(){displayView(View.Search)});
	$('#settingsNav').on('click', function(){displayView(View.Settings)});
	$('#featuredImage').on('click', function(){displayView(View.Venue, $('#featuredImage').attr('value'))});
	$('#customImage').on('click', function(){displayView(View.Venue, $('#customImage').attr('value'))});

	$('#pullDown').on('click', function(){displayPullDown()});

	$('#buttonCheckIn').on('click', function(){checkIn()});

	$('#interiorNavSongBook').on('click', function(){displayView(View.KaraokeSongBook)});

	slideImages();
}

function slideImages(){
	setInterval(function(){
		if ($('#featuredImage').attr("src") == "images/ads/1.png") {
			$('#featuredImage').attr("src", "images/ads/2.png");
			$('#featuredImage').attr("value", "2");
		}
		else{
			$('#featuredImage').attr("src", "images/ads/1.png");
			$('#featuredImage').attr("value", "1");
		}
	}, 10000);

	setInterval(function(){
		if ($('#customImage').attr("src") == "images/ads/3.png"){
			$('#customImage').attr("src", "images/ads/4.png");
			$('#customImage').attr("value", "4");
		}
		else
			$('#customImage').attr("src", "images/ads/3.png");
			$('#customImage').attr("value", "3");
	}, 7000);
}

/*
	Displays the view provided.

	INPUT:  Div ID
*/
function displayView(div, id)
{
	//Prevents closing and reopening home when we are already there
	if(div == view && view == View.Home)
		return;

	$('#toggleSongBook').hide();
	
	closeCurrentView();

	if (view==div)
		div = 'home';

	view = div;

	if (view==View.Venue)
		getVenueData(id);
	else if (view==View.SongBook)
		getProfileData(id);
	else if (view==View.KaraokeSongBook){
		getSongBook(id);
		getSongs();
		$('#toggleSongBook').show();
	}

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

	// Famous opens the view
	//$('#'+view).show( "slide", 500);

	$('#'+view+'Nav').css("background-color", "red");

	$('#profileSongBook').jScrollPane();
}

function getVenueData(venueID) {
	$.get("/venueProfile/"+venueID.value, function(result){
			famousDisplay(result);
		});
}

function getSongBook(vID) {
	$.post("/scripts/getData/songBook.php", {id: ""}, function(result){
			songs = jQuery.parseJSON(result);
			songBook = "";
			for (artist in songs){
				if(songs[artist]['songs'].length<1)
					break;

				songBook += " <li>\
					<a href=\"#\" onclick=\"swap('"+songs[artist]['id']+"');return false;\">"+songs[artist]['artist_name'] + "</a>\
					<ul id="+songs[artist]['id']+" style=\"display: none;\">";

				for (song in songs[artist]['songs']) {
					songBook +="<li><div class=\"songSelection\" value=\""+ songs[artist]['artist_name'] +"\">"+songs[artist]['songs'][song]['title']+"</div></li>";
				}
				songBook +="</ul>\
				            </li>";
			}
			// $('#profilePicture').html("<img width=120 height=105 src=\"" + profileData[0].profilePicture +"\" />");
			// $('#profileUserName').html(profileData[0].userName);
			$('#songBookAdd').html(songBook);
			karaokeInit();

			//$('#karaokeSongBookList').jScrollPane();
		});
}

function getProfileData(userID) {
	$.post("/scripts/getData/userData.php", {id: userID}, function(result){
			profileData = jQuery.parseJSON(result);
			$('#profilePicture').html("<img width=120 height=105 src=\"" + profileData[0].profilePicture +"\" />");
			$('#profileUserName').html(profileData[0].userName);
		});
}

/*
	Checks User into the received venue.

		TODO:  Add parameter to allow function to check User in.
			Will pull the necessary data for the Venue page, log user in on server, etc...
*/
function checkIn(venueID){
	 venueID = typeof a !== 'undefined' ? venueID : 0;

	if (!checkedIn){
		
		//TODO Set venueID
		//var venueID = 0;
		if(currentUser != null)
			currentUser.checkIn(venueID);
		else
			alert("You should probably log in before checking in!");
		
		checkedIn = true; 
		$('#buttonCheckIn').attr("src", 'images/checkout.png');
	}
	else{
		checkedIn = false;
		if(currentUser != null)
			currentUser.checkOut();
		$('#buttonCheckIn').attr("src", 'images/checkin.png');
	}

	if (pullDown != PullDown.Closed)
		displayPullDown();

	changeHome();
}

//Checks if a user is checked in and then calls checkIn
function initCheckIn(){
	
	//This doesn't belong here....
	if(currentUser != null){
		$.post("/scripts/User/",
			{
				intent: "checkedIn"
			},
			function(data, status){
				data = JSON.parse(data);
				if(data["checkedIn"] === true){
					checkIn(data["venueID"]);
				}
		});
	}
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
	//$('#'+view).hide( "slide", 500);
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
