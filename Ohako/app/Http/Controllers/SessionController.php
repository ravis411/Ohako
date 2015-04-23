<?php namespace App\Http\Controllers;

	use App\Models\Venue;
	use App\Models\Location;
	use App\Models\VenueDetail;
	use App\Models\DailyEvent;
	use App\Models\User;
	use App\Models\UserPictures;

	use Illuminate\Http\Request;

class SessionController extends Controller {

	public function login(Request $request)
	{
		$credentials = ['email' => $request->input('email'),
						'password' => $request->input('password')
					];

		var_dump($credentials);

		if (\Auth::attempt($credentials))
			return "success"; //redirect()->intended();

		return "failure";
	}
}
