<?php

	$con = mysqli_connect("wrytek.net", "ohako", "karaoke", "ohako") or die("Failed to connect to MySQL: " . mysqli_connect_error());
	
	$sql = "SELECT `message`, `sender` FROM `messages` WHERE `thread`='$_POST[thread]' ORDER BY `messages`.`time` ASC";
	
	$result = mysqli_query($con,$sql) or die('Query Error: ' . mysqli_error($con));
	
	if(mysqli_num_rows($result) == 0){
		echo '<h2 style="text-align:center;">No Messages</h2>';
		return;
	}
	
	while( $row = mysqli_fetch_array($result) ){
		echo '<div class="mailMessage ';
			if($row['sender'] == $_POST[thread])
				echo 'mailRecievedMessage';
			else
				echo 'mailSentMessage';
		echo '">';
		echo $row['message'] . '</div>';
	}
	
	mysqli_close($con);
?>