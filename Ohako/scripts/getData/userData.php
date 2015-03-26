<?php
	
	require_once('../../vendor/autoload.php');
	require_once('../database.php');
 	
 	use Illuminate\Database\Capsule\Manager as Capsule;

 	// Get the Venue and also it's row from dailyEvents
 	$data = User::where('ID', $_POST['id'])->get();

 	$pictures = UserPictures::where('user_id', $data[0]['profilePicture_id'])->get();

 	$data[0]['profilePicture']=$pictures[0]['location'];

 	print($data);
