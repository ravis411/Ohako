<?php
	
	require_once('../../vendor/autoload.php');
	require_once('../database.php');
 	
 	use Illuminate\Database\Capsule\Manager as Capsule;

 	// Get the Venue and also it's row from dailyEvents
 	$data = Venue::find($_POST['id'])
 			->join('locations', 'locations.id', '=', 'venues.location_id')
 			->get();

 	// Get the Location for the Venue
 	$location = Venue::find($_POST['id'])->location->get();

 	// Get the Details for the Venue
 	$details = Venue::find($_POST['id'])->venueDetail->get();

 	// Get the Events for the Venue
 	$events = Venue::find($_POST['id'])->dailyEvent->get()->toArray();

 	$karaoke = "";
 	foreach ($events[0] as $key => $event) {
 		if ($event=="karaoke")
 			$karaoke.= " " . substr($key, 0, 3);
 	}

 	$data[0]['karaoke']=$karaoke;

 	print($data);
