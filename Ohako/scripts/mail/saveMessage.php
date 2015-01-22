<?php 
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

	$thread = test_input($_POST[thread]);
	$message = test_input($_POST[message]);
	
	//$sql = "INSERT INTO messages (thread, message) VALUES ( '$thread', '$message')";
	$stmt = $con->prepare("INSERT INTO messages (thread, message) VALUES ( ?, ?)");
	
	$stmt->bind_param('ss', $thread, $message);
	
	if(!$stmt->execute())
		die("Failed to execute!");
	
	$stmt->close();
		
	//(mysqli_query($con,$sql)) or die('Query Error: ' . mysqli_error($con));
	
	
	$con->close();
	echo "Success";
?>