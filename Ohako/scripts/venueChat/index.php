<?php
//VenueChat.php
//Handles some venue chat stuffs

$venueCon = mysqli_connect("wrytek.us", "ohako", "karaoke", "ohako") or die("Failed to connect to MySQL: " . mysqli_connect_error());

//require_once __DIR__ . '/../login/User.php';

if(  isset($_POST['intent']) ){

	
	switch ($_POST['intent']) {
		
		case 'getUsers':
			//Send the list of users

			if(!isset($_POST['lastUpdate'])){
				//Fine for now...
			}

			if(!isset($_POST['venueID'])){
				//Fine for now...
				$_POST['venueID'] = 0;
			}

			echo json_encode( getCurrentUsers($_POST['venueID']) );

			exit;
		break;


		default:
			echo "Unreccognized Intent";
			exit;
		break;
	}
}


//Reloads the user list
function getCurrentUsers($venueID){

	$userList = array();
	global $venueCon;
	$userID = null;
	$userName = null;

	$userGet = $venueCon->prepare("SELECT userName FROM users WHERE ID=?");
		$userGet->bind_param('i', $userID);
		$userGet->bind_result($userName);

	$venueGet = $venueCon->prepare("SELECT userID FROM userVenueSessions WHERE venueID=?");
		$venueGet->bind_param('i', $venueID);
		$venueGet->execute();
		$venueGet->store_result();
		$venueGet->bind_result($userID);

	if ($venueGet->num_rows != 0) {
		while($venueGet->fetch()){
			$userGet->execute();
			$userGet->store_result();
			if($userGet->fetch()){
				$userList[] = $userName;
			}
		}
	}

	return $userList;
}


?>