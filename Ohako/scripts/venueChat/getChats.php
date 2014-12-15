<?php

	$con = mysqli_connect("wrytek.net", "one", "conquest", "ohako") or die("Failed to connect to MySQL: " . mysqli_connect_error());
	
	$sql = "SELECT `message`, `sender`, `time` FROM `venueChat` ORDER BY `venueChat`.`time` ASC";
	
	$result = mysqli_query($con,$sql) or die('Query Error: ' . mysqli_error($con));
	
	if(mysqli_num_rows($result) == 0){
		echo '<h2 style="text-align:center;">No Messages</h2>';
		return;
	}
	
	while( $row = mysqli_fetch_array($result) ){
		echo '<div class="chatMessage ';
			if($row['sender'] == $_POST[user])
				echo 'sentChat';
			else
				echo 'recievedChat';
		echo '" title="By: ' . $row['sender'] . ' On: ' . $row[time] . '">';
		echo $row['message'] . '</div>';
	}
	
	mysqli_close($con);
?>