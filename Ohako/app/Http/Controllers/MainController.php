<?php namespace App\Http\Controllers;

	use App\Models\Venue;
	use App\Models\Location;
	use App\Models\VenueDetail;
	use App\Models\DailyEvent;
	use App\Models\User;
	use App\Models\UserPictures;
	use App\Models\Artist;
	use App\Models\Song;
	use App\Models\Request as SongRequest;

	use Illuminate\Http\Request;

class MainController extends Controller {

	public function index()
	{
		return view('layout');
	}

	public function addRequest(Request $request)
	{
		$songRequest = new SongRequest();
		$songRequest->user_id = $request->input('userID');
		$songRequest->artist = $request->input('artist');
		$songRequest->song = $request->input('song');

		$songRequest->save();

		$return = $songRequest::orderBy('updated_at', 'ASC')
						->join('users', 'users.id', '=', 'requests.user_id')
						->select('requests.artist', 'requests.song', 'users.userName', 'users.ID', 'requests.updated_at')
						->take(3)->get();

		return $return;
	}

	public function songBook($id)
	{
		$songs = Artist::with('songs')->get();

 		return $songs;
	}

	public function getRequests()
	{
		$return = SongRequest::orderBy('updated_at', 'ASC')
						->join('users', 'users.id', '=', 'requests.user_id')
						->select('requests.artist', 'requests.song', 'users.userName', 'users.ID', 'requests.updated_at')
						->take(3)->get();

		return $return;
	}

	public function login(Request $request)
	{
		$email = $request->input('email');
		$password = $request->input('password');

		$user = User::where('email', '=', $email)->first();

		if ($user==NULL)
			return "fail";
		else if ($password != $user->password)
			return "fail";
		else
			return $user;
	}

	public function getHeader()
	{
		if (\Auth::check())	
			return view('layout');
		else
			return view('header/login');
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

	/*
		TODO
		Check if valid id.
		Cannot get profile of any randomly sent id.
	*/
	public function userProfile($id)
	{
	 	$data = User::where('ID', $id)->get();

	 	$pictures = UserPictures::where('user_id', $id)->get();

	 	$data[0]['profilePicture']=$pictures[0]['location'];

	 	return view('userProfile', [
	 				'data' =>$data 
	 			]);
	}

}