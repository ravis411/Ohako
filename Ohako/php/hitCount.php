<?php
	session_start();
	//This file will keep track of the hit count.
	//Data is recorded.
	
	//$_SESSION["test"] = "testttt";
	//print_r($_SESSION);
	
	$con=mysqli_connect("wrytek.net", "one", "conquest", "ohako") or die("Failed to connect to MySQL: " . mysqli_connect_error());
		
	$sql = "INSERT INTO hitLog (HTTP_HOST, HTTP_USER_AGENT, HTTP_REFERER, SERVER_NAME, REMOTE_ADDR, QUERY_STRING, REQUEST_URI, PHP_SELF) VALUES ( '$_SERVER[HTTP_HOST]', '$_SERVER[HTTP_USER_AGENT]', '$_SERVER[HTTP_REFERER]', '$_SERVER[SERVER_NAME]', '$_SERVER[REMOTE_ADDR]', '$_SERVER[QUERY_STRING]', '$_SERVER[REQUEST_URI]', '$_SERVER[PHP_SELF]')";
	
	mysqli_query($con,$sql) or die('Query Error: ' . mysqli_error($con));
	
	mysqli_close($con);
	//echo "\n<br>Success";
	
	//echo '<script>alert("hit");</script>';
	
	
	
	//For Testing hit data
	if(false){
		echo '<div style="width:300px; height:200px; color:white; background:black; position:absolute; margin:0px; top:40%; padding:10px; overflow:auto; z-index:10;">';
		
			echo "<br>HTTP_HOST: " . $_SERVER['HTTP_HOST'] .
			"<br>HTTP_USER_AGENT: " . $_SERVER['HTTP_USER_AGENT'] .
			"<br>HTTP_REFERER:  " . $_SERVER['HTTP_REFERER'].
			"<br>SERVER_NAME: " . $_SERVER['SERVER_NAME']. 
			"<br>REMOTE_ADDR: " . $_SERVER['REMOTE_ADDR'].
			"<br>QUERY_STRING: " . $_SERVER['QUERY_STRING'].
			"<br>REQUEST_URI: " . $_SERVER['REQUEST_URI'].
			"<br>PHP_SELF: " . $_SERVER['PHP_SELF'];
	
		echo "<br><br><br><br>_Server output:<br>";
		foreach ($_SERVER as $key => $value) {
			echo "Key: $key; Value: $value<br />\n";
		}
			
			echo '</div>';
	}
	
?>