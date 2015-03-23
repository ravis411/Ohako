<?php
//User.php 
//Handles most user stuff from now on...
$userCon = mysqli_connect("wrytek.us", "ohako", "karaoke", "ohako") or die("Failed to connect to MySQL: " . mysqli_connect_error());
	
	





if(  isset($_POST['intent']) ){

	
	switch ($_POST['intent']) {
		
		case 'checkIn':
			//Check the user in

			if(!isset($_POST['location'])){
				echo "Error: location not set.";
				exit;
			}

			//checkIn();

			break;

		case 'checkOut':
			//Check a user out



			break;

		default:
			echo "Unreccognized Intent";
			exit;
			break;
	}



}else{
	print_r($_POST);
}

echo "error?";



function checkIn($location){


	$query = $userCon->prepare("INSERT INTO userVenueSessions (userID, venueID, checkinTime, expires) VALUES (?,?,?,?,?)");
	$query->bind_param('sssss', $firstName, $lastName, $userName, $email, $password);

	if ($query->execute()) {

	}
}





?>