<?php
ob_start();


	echo "<br><br>_COOKIE:<br>";
	setCookie("TestInfoCookie", date("g:i:s"), time()+60*60*24*30, "/scripts/login/");
	print_r($_COOKIE);
	
	/* echo "<br><br>Clearing _COOKIEs:<br>";
	if (isset($_SERVER['HTTP_COOKIE'])) {
		$cookies = explode(';', $_SERVER['HTTP_COOKIE']);
		foreach($cookies as $cookie) {
			$parts = explode('=', $cookie);
			$name = trim($parts[0]);
			setcookie($name, '', time()-1000);
			setcookie($name, '', time()-1000, '/');
			setCookie($name, date("g:i:s"), time()-1000, "/", ".ryanwalkerdavis.com", TRUE, true);
		}
	}
	print_r($_COOKIE); */
	session_start();
	echo "<br><br>_SESSION:<br>";
	$_SESSION["test"] = "testttt";
	print_r($_SESSION);
	
	echo "<br><br>_SERVER:<br>";
	foreach ($_SERVER as $key => $value) {
		echo "Key: $key; Value: $value<br />\n";
	}
	
	ob_end_flush();
	//ob_end_clean();
	?>