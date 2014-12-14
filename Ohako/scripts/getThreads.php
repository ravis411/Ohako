<?php
	$con = mysqli_connect("wrytek.net", "one", "conquest", "ohako") or die("Failed to connect to MySQL: " . mysqli_connect_error());
	
	$sql = "SELECT DISTINCT `thread` FROM `messages` ORDER BY `time` DESC ";
	
	$result = mysqli_query($con,$sql) or die('Query Error: ' . mysqli_error($con));
	
	if(mysqli_num_rows($result) == 0){
		echo '<h2 style="text-align:center;">No Threads</h2>';
		return;
	}
	
	while( $row = mysqli_fetch_array($result) ){
		echo '<div class="mailItem">';
		echo $row['thread'] . '</div>';
	}
	
	mysqli_close($con);
?>