<?php
	error_reporting(E_ALL);
	require_once __DIR__ . '/scripts/login/loginFunctions.php';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1">
	<title>OHAKO</title>
	<link rel="shortcut icon" href="/images/logo_ohako_night.png">

	<!-- latest jQuery direct from google's CDN -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" />
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>

	<!-- styles needed by jScrollPane -->
	<link type="text/css" href="scripts/scrollbar/style/jquery.jscrollpane.css" rel="stylesheet" media="all" />

	<!-- the mousewheel plugin - optional to provide mousewheel support -->
	<script type="text/javascript" src="scripts/scrollbar/jquery.mousewheel.js"></script>

	<!-- the jScrollPane script -->
	<script type="text/javascript" src="scripts/scrollbar/jquery.jscrollpane.min.js"></script>

	<link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" type="text/css" href="stylesheets/main.css">
	<link rel="stylesheet" type="text/css" href="stylesheets/footer.css">
	<link rel="stylesheet" type="text/css" href="stylesheets/header.css">

	<script type="text/javascript" src="scripts/main.js"></script>
	<?php if(!user_logged_in()){
		echo'<script type="text/javascript" src="scripts/login/login.js"></script>
		<link rel="stylesheet" type="text/css" href="stylesheets/login.css">';
	 }?>

	<script>
		$(document).ready(function()
		{	
			$('#featuredContent').jScrollPane();
			init();
		});
	</script>
</head>

<body>

	<div id="wrapper">

		<div id="contents">

			
		<?php //If user not logged in output the login/registration div

		if(!user_logged_in()){
			echo'<div id="upperDiv">
			
				<div id="loginDiv">
					<form id="loginForm" name="loginForm" method="post" action="">
						<h2>Log in</h2>
						<div id="loginFail" class="fail"></div>
						<input id="loginFormUserName" name="username" type="text" placeholder="User Name or Email" autofocus required /><br>
						<input id="loginFormPassword" name="password" type="password" placeholder="Password" required /><br>
						<input id="loginFormSubmitButton" type="submit" name="submit" class="button" value="Login" /><div id="loginFormSwitchToRegistrationButton">Register?</div>
					</form>
				</div>
				
				<div id="registrationDiv">
					 <form id="registrationForm" name="registrationForm" method="post" action="">
						<h2>Register!</h2>
						<div id="registrationFail" class="fail"></div>
						<input id="registrationFirstName" class="registrationName" name="firstName" type="text" placeholder="First Name" required /><input id="registrationLastName" class="registrationName" name="lastName" type="text" placeholder="Last Name" required /><br>
						<input id="registrationUserName" name="username" type="text" placeholder="User Name" required /><br>
						<input id="registrationEmail" name="email" type="email" placeholder="Email" required /><br>
						<input id="registrationPassword" name="password" type="password" placeholder="Password" required /><br>
						<input id="registrationPassword2" name="password2" type="password" placeholder="Verify Password" required /><br>
						<input id="registrationSubmitButton" type="submit" name="submit" class="button" value="Register" />
						<div id="registrationSwitchToLoginButton">Login?</div>
					</form>
				</div>
				
			
				
				
			</div><!--End of upperDiv-->';
		} ?>
			<div id="header">

				<span id="title"><img id="logo" src="images/logo_ohako.png" alt="OHAKO" /></span>

				<div id="header_user_div">
					<?php
						//If user !logged in output login button
							//Otherwise output username and userimage
						if(!user_logged_in()){
							echo'<div id="headerLogInDiv">Login</div>';
						}else{
							echo '<div id="header_user_image">
									<img src="images/userProfileImage.png" alt="Profile Picture" width ="25px" height="25px" /> 
								</div>
								<div id="header_user_name">' .	$_SESSION["userName"] .'</div>';
						}
					?>
				</div>

			</div>
		
			<div id="content">

			<!-- PullDown:  -->
				<div id="pullDown">

				</div>
				<!-- END PullDown:  -->

				<!-- Main view...  View.Home -->
				<div id="home">
					<!-- Home.SearchAndDiscover -->
                	<div id="searchAndDiscover">
                        <div id="featuredContent">
                            <div id="title"> Featured This Week </div>
                            <img class="contentVenueImage" src="images/barAd1.png" id="featuredImage"/>
                        </div>
    
                        <div id="customContent">
                            <div id="title"> Happening Tonight </div>
                            <img class="contentVenueImage" src="images/barAd3.png" id="customImage"/>
                        </div>
                    </div>
                    <!-- End Home.SearchAndDiscover -->

                    <!-- Home.Venue -->
                    <div id="homeVenue">
						<div id="homeChatBoxDiv">
							<div id="chatUsers">
								<img id="usersLogo" src="images/logo_users.png" alt="Current Users" width="80px" height="26" />
								<div id="chatUsersList">
									<div class="userProfile" id="userProfileID1"> Don </div> 
									<div class="userProfile" id="userProfileID2"> June </div>
									<div class="userProfile" id="userProfileID3"> Cool Guy </div> 
									<div class="userProfile" id="userProfileID4"> Missy </div> 
									<div class="userProfile" id="userProfileID5"> LF Duet </div> 
									<div class="userProfile" id="userProfileID6"> Tommy </div> 
								</div>
							
							</div>

							<div id ="chatBox">
								<div id ="chatBoxScroll">
									<div class="chatMessage recievedChat">A Recieved Message</div>
									<div class="chatMessage sentChat">Sent by User</div>
								</div>
							</div>
							<div id="chatBoxInputDiv">
								<input type="text" placeholder="Chat">
							</div>
						</div>
                    </div>
                </div>
                
				<!-- End main view...  View.Home -->

				<!-- Venue: View.Venue -->
				<div id="venue">
					<div id="venueInterior">
						<img src="images/venueprofile.png"/>
					</div>
				</div>
				<!-- END Venue: View.Venue -->

				<!-- Mailbox: View.Mailbox -->
				<div id="mailbox">
					<div id="mailboxInterior">
						<div id="mailList">
								<div class="mailItem" id="mailItem1"> Friend </div> 
								<div class="mailItem" id="mailItem2"> Venue </div>
								<div class="mailItem" id="mailItem3"> Friend1 </div> 
						</div>

						<div id="mailView">
							<div id="mailMessagesDiv">
								<div>Select a message from left.</div>
							</div>
							<div id="mailInputDiv">
								<input type="text" name="message" placeholder="Enter a message..."><div id="mailMessageSubmitButton"></div>
							</div>
						</div>
					</div>
				</div>
				<!-- END Mailbox: View.Mailbox -->

				<!-- SongBook: View.SongBook -->
				<div id="songBook">
					<div id="songBookInterior">
						<img src="images/profile.png"/>
					</div>
				</div>
				<!-- END SongBook: View.SongBook -->

				<!--Search: View.Search -->
				<div id="search">
					<div id="searchInterior">
						<div id="searchMap">
							<iframe
							  width="350"
							  height="300"
							  frameborder="0" style="border:0"
							  src="https://www.google.com/maps/embed/v1/search?key=AIzaSyALqRx10_DMkJMChXFLtBBy6VJiBmyiZFc&q=karaoke&zoom=12&center=36.150000,-115.174247">
							</iframe>

							<div id="searchInput">
							<form id="settingsForm" action="http://www.usc.edu/cgi-bin/mail_form/shiffer@usc.edu" method="post" name="ContactForm" >

							<input id="settingsName" class="formField" type="text" name="displayName" required placeholder="Search" style="text-align: right;"/>
							</div>
							<br style="clear:both;"/> <br/>
							</form>
						</div>
					</div>
				</div>
				<!-- END Search: View.Search -->

				<!--Settings: View.Settings -->
				<div id="settings">
					<div id="settingsInterior">
						<form id="settingsForm" action="http://www.usc.edu/cgi-bin/mail_form/shiffer@usc.edu" method="post" name="ContactForm" >

						<span class="settingsLabel">Display Name </span>
							<input id="settingsName" class="formField" type="text" name="displayName" required placeholder="current user name" style="text-align: right;"/>
						<br style="clear:both;"/> <br/>

						<span class="settingsLabel">Email</span>
							<input id="settingsEmail" class="formField" type="text" name="email" style="text-align: right;" required placeholder="current email"/>
						<br style="clear:both;"/> <br/>

					    <span class="settingsLabel">Receive Notifications?</span>
							<input type="radio" name="workRelated" id="chooseYes" value="Yes" /> Yes
							<input type="radio" name="workRelated" id="chooseNo" value="Yes" /> No </span>
						<br style="clear:both;"/> <br/>

						<div id="submitContact" class="label" type="submit">
				    		<input type="submit" value="Save" id="submit"/>
				    	</div>
						</form>
					</div>
				</div>
				<!-- END Settings: View.Settings -->

				<!-- KaraokeSongBook: View.KaraokeSongBook -->
				<div id="karaokeSongBook">
					<div id="karaokeSongBookNavMenu">
						<img src="images/sortBy.png" alt="Sort By" />
							<div id="sortByMenu">
								<div id ="sortByArtist" class="karaokeSongBookNavMenu">
									Artist
								</div>
								<div id ="sortByTitle" class="karaokeSongBookNavMenu">
									Title
								</div>
							</div>
						<img src="images/viewMy.png" alt="View My" />
						<div id="viewMyMenu">
								<div id="viewMySuggestions" class="karaokeSongBookNavMenu">
									Suggestions
								</div>
								<div id="viewMyFavorites" class="karaokeSongBookNavMenu">
									Faves
								</div>
						</div>
					</div>
					
					<div id="karaokeSongBookList">
						<ul>
				            <li>
				                <a href="#" onclick="swap('abba');return false;">ABBA</a>
				                <ul id="abba" style="display: none;">
				                  <li><div class="songSelection">Dancing Queen</div></li>
				                  <li><div class="songSelection">Gimme! Gimme! Gimme!</div></li>
				                  <li><div class="songSelection">Lay All Your Love On Me</div></li>
				                  <li><div class="songSelection">Mamma Mia</div></li>
				                  <li><div class="songSelection">Money Money Money</div></li>
				                  <li><div class="songSelection">S.O.S.</div></li>
				                </ul>
				            </li>
				            <li>
				                <a href="#" onclick="swap('aerosmith');return false;">Aerosmith</a>
				                <ul id="aerosmith" style="display: none;">
				                  <li><div class="songSelection">Back In The Saddle</div></li>
				                  <li><div class="songSelection">Dream On</div></li>
				                  <li><div class="songSelection">Dude (Looks Like A Lady)</div></li>
				                  <li><div class="songSelection">Hole In My Soul</div></li>
				                  <li><div class="songSelection">Love In An Elevator</div></li>
				                  <li><div class="songSelection">Walk This Way</div></li>
				                </ul>
				            </li>
				            <li>
				                <a href="#" onclick="swap('dollyParton');return false;">Dolly Parton</a>
				                <ul id="dollyParton" style="display: none;">
				                  <li><div class="songSelection">9 to 5</div></li>
				                  <li><div class="songSelection">Baby I'm Burnin'</div></li>
				                  <li><div class="songSelection">Tennessee Homesick Blues</div></li>
				                </ul>
				            </li>
				        </ul>
					</div>
				</div>
				<!-- END KaraokeSongBook: View.KaraokeSongBook -->

				<div id="interiorControlsBox">
					<div id="interiorNav">
								<img src="images/activities.png" alt="Activities" style="top: -5px;"/>
	                        	<div id="interiorNavSongBook" class="option">
	                            	Karaoke
	                            </div>

	                            <div id="interiorNavTrivia" class="option">
	                            	Trivia
	                            </div>

	                            <div id="interiorNavBlackjack" class="option">
	                            	Blackjack
	                            </div>
	                </div>

	                <div id="infoPanel">
	                	<img src="images/infoPanel.png" id="infoPanelImage"/>
		                <div id="infoPanelRightNow">

		                </div>

		                <div id="infoPanelLater">
		                </div>

		                <div id="infoPanelStats">

		                </div>
		            </div>
	            </div>
                
                <!-- CheckIn:  -->
				<div id="checkIn">
					<div id="checkInInterior">
						<img src="images/splashImage.png" id="splashImage" /> <br/>
						<img src="images/checkin.png" id="buttonCheckIn" />
					</div>
				</div>
				<!-- END CheckIn:  -->

			</div>
			
			<div id="controlsBox">
				<div id="controlsNav">
					<img id="mailboxNav" class="option" src="images/mailbox.png" alt="Mailbox" />
					<img id="songBookNav" class="option" src="images/songbook.png" alt="Songbook"/>
					<img id="searchNav" class="option" src="images/search.png" alt="Search" />
					<img id="settingsNav" class="option" src="images/settings.png" alt="Settings" />
				</div>
				<div id="adspace">
					<img src="images/ad.jpg" width="326px" height="100px"/>
				</div>
			</div>
			
			
			
		</div><!--End contents-->

	</div><!--End wrapper-->
	
	<div id="footer">
		&copy;
	</div>

</body>
</html>