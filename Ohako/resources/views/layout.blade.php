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

	<link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>

		{!! HTML::script('/clientScripts/rateIt/jquery.rateit.js') !!}
		{!! HTML::style('/clientScripts/rateIt/rateit.css') !!}

		{!! HTML::script('/clientScripts/scrollbar/jquery.jscrollpane.min.js') !!}
		{!! HTML::script('/clientScripts/scrollbar/jquery.mousewheel.js') !!}
		{!! HTML::style('/clientScripts/scrollbar/style/jquery.jscrollpane.css') !!}


		{!! HTML::script('/clientScripts/main.js') !!}
		{!! HTML::script('/clientScripts/user/User.js') !!}

		{!! HTML::style('/css/header.css') !!}
		{!! HTML::style('/css/viewHomeDiscover.css') !!}
		{!! HTML::style('/css/viewHomeVenue.css') !!}
		{!! HTML::style('/css/viewKaraokeSongBook.css') !!}
		{!! HTML::style('/css/viewMailbox.css') !!}
		{!! HTML::style('/css/viewSearch.css') !!}
		{!! HTML::style('/css/viewSettings.css') !!}
		{!! HTML::style('/css/viewSongbook.css') !!}
		{!! HTML::style('/css/interiorControls.css') !!}
		{!! HTML::style('/css/checkIn.css') !!}
		{!! HTML::style('/css/main.css') !!}
		{!! HTML::style('/css/footer.css') !!}

	<?php /*if(!User::isLoggedIn()){
		echo'<script type="text/javascript" src="scripts/login/login.js"></script>
		<link rel="stylesheet" type="text/css" href="stylesheets/login.css">';
	 }else{
	 	echo '<script type="text/javascript" src="scripts/User/User.js"></script>';
	}*/
	 ?>

	 {!! HTML::script('/clientScripts/login.js') !!}
	 {!! HTML::style('/css/login.css') !!}

	 {!! HTML::script('/clientScripts/mail.js') !!}
	 {!! HTML::script('/clientScripts/venueChat.js') !!}
	 {!! HTML::script('/clientScripts/karaoke.js') !!}

	<script>
		$(document).ready(function()
		{	
			$('#featuredContent').jScrollPane();

			init();

			<?php //This is kinda hacked should be waay cleaner...
				/*if(User::isLoggedIn()){
					echo 'currentUser = new User(' . User::getData() . ');';
					echo '
					init();';
				}else{
	 				echo '
	 				init();';
				}
				*/
			?>
	
		});
	</script>
</head>

<body>

	<div id="wrapper">

		<div id="contents">

			<div id="header">

				<span id="title"><img id="logo" src="images/logo_ohako.png" alt="OHAKO" /></span>

				<div id="header_user_div">
					<?php /*
						//If user !logged in output login button
							//Otherwise output username and userimage
						if(!User::isLoggedIn()){
							echo'<div id="headerLogInDiv">Login</div>';
						}else{
							echo '<div id="header_user_image">
									<img src="images/userProfileImage.png" alt="Profile Picture" width ="25px" height="25px" /> 
								</div>
								<div id="header_user_name">' .	User::getUserName() .'</div>';
						}*/
					?>
				</div>

			</div>

			<div id="content">
				<!-- PullDown:  -->
				<div id="pullDown">

				</div>
				<!-- END PullDown:  -->

				@yield('content')

				<div id="mainContent">

				</div>

				<!-- CheckIn:  -->
				<div id="checkIn">
					<div id="checkInInterior">
						<div id="checkInLogo">
							Logo here
						</div>

						<div id="checkInDetails">
							Going on's here.
						</div>
						<br style="clear: both;" />
						
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

