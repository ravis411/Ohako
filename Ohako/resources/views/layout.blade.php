<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="csrf-token" content="{{ csrf_token() }}" />
<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1">
	<title>OHAKO</title>
	<link rel="shortcut icon" href="/images/logo_ohako_night.png">

	<!-- latest jQuery direct from google's CDN -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" />
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>

	<link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" type="text/css" href="http://code.famo.us/famous/0.3.4/famous.css" />
    <script type="text/javascript" src="http://code.famo.us/famous/0.3.4/famous-global.min.js"></script>


    <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>

		{!! HTML::script('/clientScripts/rateIt/jquery.rateit.js') !!}
		{!! HTML::style('/clientScripts/rateIt/rateit.css') !!}

		{!! HTML::script('/clientScripts/scrollbar/jquery.jscrollpane.min.js') !!}
		{!! HTML::script('/clientScripts/scrollbar/jquery.mousewheel.js') !!}
		{!! HTML::style('/clientScripts/scrollbar/style/jquery.jscrollpane.css') !!}
		{!! HTML::script('http://malsup.github.io/min/jquery.form.min.js') !!}

		{!! HTML::script('/clientScripts/famous.js') !!}

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

	{!! HTML::style('/css/login.css') !!}

	 {!! HTML::script('/clientScripts/mail.js') !!}
	 {!! HTML::script('/clientScripts/venueChat.js') !!}
	 {!! HTML::script('/clientScripts/karaoke.js') !!}
	 {!! HTML::script('/clientScripts/views/Header.js') !!}
	 {!! HTML::script('/clientScripts/views/Content.js') !!}
	 {!! HTML::script('/clientScripts/views/Footer.js') !!}
	 {!! HTML::script('/clientScripts/views/Mailbox.js') !!}
	 {!! HTML::script('/clientScripts/views/UserProfile.js') !!}
	 {!! HTML::script('/clientScripts/views/Search.js') !!}
	 {!! HTML::script('/clientScripts/views/Settings.js') !!}
	 {!! HTML::script('/clientScripts/views/Login.js') !!}
	 
	<script>
		$(document).ready(function()
		{	
			$('#featuredContent').jScrollPane();


			//input = <?php echo csrf_token() ?>

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

		</div>

		</div>

</body>
</html>

