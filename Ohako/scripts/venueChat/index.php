<?php
//VenueChat.php
//Handles some venue chat stuffs

$venueCon = mysqli_connect("wrytek.us", "ohako", "karaoke", "ohako") or die("Failed to connect to MySQL: " . mysqli_connect_error());

//require_once __DIR__ . '/../login/User.php';

if(  isset($_POST['intent']) ){

	
	switch ($_POST['intent']) {
		
		case 'getUsers':
			//Send the list of users

			if(!isset($_POST['lastUpdate']) || $_POST['lastUpdate'] == null || ""){
				//Fine for now...
				$_POST['lastUpdate'] = (new DateTime("first day of January 2008"))->getTimestamp();
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
	$lastUpdateTimestamp = null;

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

	$venueGetLastUpdate = $venueCon->prepare("SELECT time FROM userVenueSessionsUpdateTime WHERE ID=0");
		$venueGetLastUpdate->bind_result($lastUpdateTimestamp);
		$venueGetLastUpdate->execute();
		$venueGetLastUpdate->fetch();

	
	
	$data = array();
	$data["userList"] = $userList;
	$data["time"] = (new DateTime())->getTimestamp();

	//Lets see if we need to update or not...
		//Compare the clients' time with table update time
	if( $lastUpdateTimestamp != null && isset($_POST['lastUpdate']) ){
		$t0 = new DateTime($lastUpdateTimestamp);

		$userLastCheckedTime = new DateTime();
		$userLastCheckedTime->setTimestamp($_POST['lastUpdate']);
		//$data["timer"] = $t0->format("U") ." ". $userLastCheckedTime->format("U");
		if( $userLastCheckedTime < $t0 ){
			$data["updates"] = true;
		}
		else{
			$data["updates"] = false;
		}
	}else{
		$data["updates"] = true;
	}


	

	
	
	return $data;

}


?>