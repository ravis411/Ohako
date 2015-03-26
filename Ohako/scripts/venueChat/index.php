<?php
//VenueChat.php
//Handles some venue chat stuffs

if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('America/Los_Angeles');
}

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

		case 'getChats':
			echo json_encode(getChats($_POST["lastID"]));
			exit;
			break;


		default:
			echo "Unreccognized Intent";
			exit;
		break;
	}
}


//Gets chats since specified 
	//Returns all messages since $lastMessageRetrieved
function getChats($lastMessageRetrieved = null){
	global $venueCon;

	$data = array();
	$chats = array();

	//Lets see if we need to send any new chats back or not...
	if($lastMessageRetrieved == null){
		$lastMessageRetrieved = 0;
		$chatQuery = $venueCon->prepare("SELECT * FROM (
			SELECT ID, message, sender, time FROM `venueChat` ORDER BY `venueChat`.`time` DESC LIMIT 50)
		as tab ORDER BY `time` ASC");
		$data["WHICH"] = "FIRST";
	}else{
		$chatQuery = $venueCon->prepare("SELECT ID, message, sender, time FROM `venueChat` WHERE ID>? ORDER BY `venueChat`.`time` ASC");
		$chatQuery->bind_param("i", $lastMessageRetrieved);
		$data["WHICH"] = "SECOND";
	}

	$chatQuery->bind_result($ID, $message, $sender, $time);
	$chatQuery->execute();
	$chatQuery->store_result();
	if($chatQuery->num_rows != 0){
		while($chatQuery->fetch()){
			$chat = array();
			$chat["ID"] = $ID;
			$chat["message"] = $message;
			$chat["sender"] = $sender;
			$chat["time"] = $time;

			$chats[] = $chat;
		}
	}

	$data["lastMessage"] = $lastMessageRetrieved;
	$data["chats"] = $chats;

	return $data;
}


//Reloads the user list
function getCurrentUsers($venueID){

	$userList = array();
	global $venueCon;
	$userID = null;
	$userName = null;
	$lastUpdateTimestamp = null;

	

	$venueGetLastUpdate = $venueCon->prepare("SELECT time FROM userVenueSessionsUpdateTime WHERE 1");
		$venueGetLastUpdate->bind_result($lastUpdateTimestamp);
		$venueGetLastUpdate->execute();
		$venueGetLastUpdate->store_result();
		$venueGetLastUpdate->fetch();
	
	
	$data = array();
	
	$data["time"] = (new DateTime())->getTimestamp();

	//Lets see if we need to update or not...
		//Compare the clients' time with table update time
	if( $lastUpdateTimestamp != null && isset($_POST['lastUpdate']) ){
		$t0 = new DateTime($lastUpdateTimestamp);

		$userLastCheckedTime = new DateTime();
		$userLastCheckedTime->setTimestamp($_POST['lastUpdate']);
		//$data["timer"] = $t0->format("U") ." ". $userLastCheckedTime->format("U");
		if( $userLastCheckedTime <= $t0 ){
			$data["updates"] = true;
		}
		else{
			$data["updates"] = false;
		}
	}else{
		$data["updates"] = true;
	}


	if($data["updates"]){
		$userGet = $venueCon->prepare("SELECT userName, ID FROM users WHERE ID=?");
			$userGet->bind_param('i', $userID);
			$userGet->bind_result($userName, $ID);

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
					$userList[] = ['userName' => $userName, 'userID' =>$ID];
				}
			}
		}
		$data["userList"] = json_encode($userList);
	}

	
	
	return $data;

}


?>