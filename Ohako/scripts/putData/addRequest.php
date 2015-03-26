<?php
	require_once('../../vendor/autoload.php');
	require_once('../database.php');
 	
 	use Illuminate\Database\Capsule\Manager as Capsule;

	require_once __DIR__ . '/../login/User.php';

	if( ! ini_get('date.timezone') )
		{
		    date_default_timezone_set('America/Los_Angeles');
		}

	// $request = new Request;

	// $request->user_id = User::getUserID();
	// $request->artist = $_POST['artist'];
	// $request->song = $_POST['song'];

	// $request->save();


	$check = Request::first()->orderBy('updated_at', 'ASC')->get();

	$timezone = date_default_timezone_get();

	//var_dump(count($check));
	if (count($check)>10)
		Request::destroy($check[0]['id']);

	$return = Request::all();

	$return = Request::orderBy('updated_at', 'ASC')
						->join('users', 'users.id', '=', 'requests.user_id')
						->select('requests.artist', 'requests.song', 'users.userName', 'users.ID', 'requests.updated_at')->get();

	print($return);