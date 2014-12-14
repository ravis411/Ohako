<?php 
	$con=mysqli_connect("wrytek.net", "one", "conquest", "ohako") or die("Failed to connect to MySQL: " . mysqli_connect_error());
	
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
	
	$sql = "INSERT INTO messages (thread, message) VALUES ( '$thread', '$message')";
		
		
	(mysqli_query($con,$sql)) or die('Query Error: ' . mysqli_error($con));
	
	
	mysqli_close($con);
	echo "Success";
?>