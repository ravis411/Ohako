<?php namespace App\Http\Controllers;

	use App\Models\Venue;
	use App\Models\Location;
	use App\Models\VenueDetail;
	use App\Models\DailyEvent;

class MainController extends Controller {

	public function index()
	{
		return view('home');
	}

	public function venueProfile($id)
	{
		// Get the Venue and also it's row from dailyEvents
	 	$data = Venue::where('id', $id)->get();

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

		return view('venueProfile', [
									  'venue' => $data->toArray(),
									  'karaoke' => $karaoke,
									  'details' => $details->toArray(),
									  'location' => $location ]);
	}

}