<?php
	header("Access-Control-Allow-Origin: *");
	require_once __DIR__ . '/../login/User.php';

	$con = mysqli_connect("wrytek.us", "ohako", "karaoke", "ohako") or die("Failed to connect to MySQL: " . mysqli_connect_error());
	
	//$sql = "SELECT `message`, `sender`, `time` FROM `venueChat` ORDER BY `venueChat`.`time` ASC";
	$sql = "SELECT * FROM (
			SELECT ID, message, sender, time FROM `venueChat` ORDER BY `venueChat`.`time` DESC LIMIT 50)
		as tab ORDER BY `time` ASC";
	$result = mysqli_query($con,$sql) or die('Query Error: ' . mysqli_error($con));
	

	if(mysqli_num_rows($result) == 0){
		echo '<span style="text-align:center;">No Messages</span><br>';
		return;
	}

	$tempLastSender = null;
	if(User::isLoggedIn())
		$currentUser = User::getUserName();
	else
		$currentUser = "Guest";
	while( $row = mysqli_fetch_array($result) ){
	
		//If a different sender than the last sender and not the current user
		if($tempLastSender != $row['sender'] && $row['sender'] != $currentUser )
		{
			echo '<div class="chatMessageDetails">' . $row['sender'] . ':</div>';
		}
		
		echo '<div class="chatMessage ';
			if($row['sender'] == $currentUser)
				echo 'sentChat';
			else
				echo 'recievedChat';
		echo '" title="By: ' . $row['sender'] . ' On: ' . $row['time'] . '">';
		echo $row['message'] . '</div>';
		$tempLastSender = $row['sender'];
	}
	
	mysqli_close($con);
?>