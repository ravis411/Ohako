<?php
	
	require_once('../../vendor/autoload.php');
	require_once('../database.php');
 	
 	use Illuminate\Database\Capsule\Manager as Capsule;

 	// Get the Venue and also it's row from dailyEvents
 	$data = Venue::where('id', $_POST['id'])->get();

 	// Get the Location for the Venue
 	$location = Location::where('id', $data[0]['location_id'])->get();

 	// Get the Details for the Venue
 	$details = VenueDetail::where('id', $data[0]['venueDetail_id'])->get();

 	// Get the Events for the Venue
 	$events = DailyEvent::where('id', $data[0]['dailyEvent_id'])->get()->toArray();

 	$karaoke = "";
 	foreach ($events[0] as $key => $event) {
 		if ($event=="karaoke")
 			$karaoke.= " " . substr($key, 0, 3);
 	}

 	$data[0]['karaoke']=$karaoke;
 	$data[0]['details']=$details;
 	$data[0]['location']=$location;

 	print($data);
