<?php
	
	require_once('../../vendor/autoload.php');
	require_once('../database.php');
 	
 	use Illuminate\Database\Capsule\Manager as Capsule;

 	ob_start();
 	// Get the Venue and also it's row from dailyEvents
 	$data = Venue::find($_POST['id'])
 			->join('dailyEvents', 'dailyEvents.id', '=', 'venues.dailyEvent_id')
 			->get();

 	// Get the Location for the Venue
 	$location = Venue::find($_POST['id'])->location->get();

 	print($data);