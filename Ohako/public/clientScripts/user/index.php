<?php
//User.php 
//Handles most user stuff from now on...
$userCon = mysqli_connect("wrytek.us", "ohako", "karaoke", "ohako") or die("Failed to connect to MySQL: " . mysqli_connect_error());
	
require_once __DIR__ . '/../login/User.php';


if(  isset($_POST['intent']) ){

	
	switch ($_POST['intent']) {
		
		case 'checkIn':
			//Check the user in

			if(!isset($_POST['location'])){
				echo "Error: location not set.";
				exit;
			}

			echo checkIn($_POST['location']);
			exit;
		break;

		case 'checkOut':
			//Check a user out
			checkOut();
		break;

		case 'checkedIn':
			echo checkedIn();
			exit;
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
	global $userCon;

	if(!User::isLoggedIn()){
		echo "User not logged in...";
		exit;
	}

	$userID = User::getUserID();
	$venueID = 0; // Need to change this
	$expires = time()+60*60*2; //Hrmmm

	$userVenueSessionID = null;

	//Lets see if they are already checked in...
	$queryGet = $userCon->prepare("SELECT ID, venueID FROM userVenueSessions WHERE userID=?");
		$queryGet->bind_param('i', $userID);
		$queryGet->execute();
		$queryGet->store_result();
		$queryGet->bind_result($userVenueSessionID, $oldVenueID);
	if ($queryGet->num_rows != 0) {
		$queryGet->fetch();
		if($oldVenueID == $venueID){
			//Already checked in...
			return true;
			exit;
		}else{
			//Already checked in ...but wrong venue ... lets check out
			checkOut();
		}
	}

	//Made it this far... check user into the venue...
	$query = $userCon->prepare("INSERT INTO userVenueSessions (userID, venueID, expires) VALUES (?,?,?)");
	$query->bind_param('sss', $userID, $venueID, $expires);

	if ($query->execute()) {
		//Checked In
		return true;
	}
}

//Checks a user out of a venue
function checkOut(){
	global $userCon;

	if(!User::isLoggedIn()){
		echo "User not logged in...can't check out...";
		exit;
	}
	$userID = User::getUserID();

	$deleteQuery = $userCon->prepare("DELETE FROM `userVenueSessions` WHERE userID = ?");
	$deleteQuery->bind_param('i', $userID);
	return $deleteQuery->execute();
}

//Returns the venueID of the checked in venue or false
function checkedIn(){
	global $userCon;
	$data = array();

	if(!User::isLoggedIn()){
		return false;
	}
	$userID = User::getUserID();

	$queryGet = $userCon->prepare("SELECT venueID FROM userVenueSessions WHERE userID=?");
		$queryGet->bind_param('i', $userID);
		$queryGet->execute();
		$queryGet->store_result();
		$queryGet->bind_result($venueID);
	if ($queryGet->num_rows != 0) {
		if($queryGet->fetch())
			$data["checkedIn"] = true;
			$data["venueID"] = $venueID;
	}else{
		$data["checkedIn"] = false;
	}
	return json_encode($data);
}


?>