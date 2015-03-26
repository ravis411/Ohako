<?php
	require_once('../../vendor/autoload.php');
	require_once('../database.php');
 	
 	use Illuminate\Database\Capsule\Manager as Capsule;

	require_once __DIR__ . '/../login/User.php';

	$return = Request::all();

	$return = Request::orderBy('updated_at', 'ASC')
						->join('users', 'users.id', '=', 'requests.user_id')
						->select('requests.artist', 'requests.song', 'users.userName', 'users.ID', 'requests.updated_at')->get();

	print($return);