<?php

	$con = mysqli_connect("wrytek.net", "ohako", "karaoke", "ohako") or die("Failed to connect to MySQL: " . mysqli_connect_error());
	
	$sql = "SELECT `message`, `sender`, `time` FROM `venueChat` ORDER BY `venueChat`.`time` ASC";
	
	$result = mysqli_query($con,$sql) or die('Query Error: ' . mysqli_error($con));
	
	if(mysqli_num_rows($result) == 0){
		echo '<h2 style="text-align:center;">No Messages</h2>';
		return;
	}

	$tempLastSender = null;
	while( $row = mysqli_fetch_array($result) ){
	
		//If a different sender than the last sender and not the current user
		if( $tempLastSender != null && $tempLastSender != $row['sender'] && $row['sender'] != $_POST[user] ){
			echo '<div class="chatMessageDetails">' . $row['sender'] . ':</div>';
		}
		
		echo '<div class="chatMessage ';
			if($row['sender'] == $_POST[user])
				echo 'sentChat';
			else
				echo 'recievedChat';
		echo '" title="By: ' . $row['sender'] . ' On: ' . $row[time] . '">';
		echo $row['message'] . '</div>';
		$tempLastSender = $row['sender'];
	}
	
	mysqli_close($con);
?>