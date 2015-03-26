<?php 
	require_once __DIR__ . '/../login/User.php';
	$con=new mysqli("wrytek.net", "ohako", "karaoke", "ohako") or die("Failed to connect to MySQL: " . $con->connect_error);
	
	function test_input($data)
	{
		$data = trim($data);
		$data = htmlspecialchars($data);
		if(strlen($data) ==0){
			return null;
		}
		return $data;
	}

	if(!User::isLoggedIn()){
		$sender = "Guest";
	}else{
		$sender = User::getUserName();
	}
	$message = test_input($_POST["message"]);
	
	$stmt = $con->prepare("INSERT INTO venueChat (message, sender) VALUES ( ?, ?)");
	
	$stmt->bind_param('ss', $message, $sender);
	
	if(!$stmt->execute())
		die("Failed to execute!");
	
	$stmt->close();
		
	//(mysqli_query($con,$sql)) or die('Query Error: ' . mysqli_error($con));
	
	
	$con->close();
	echo "Success";
?>