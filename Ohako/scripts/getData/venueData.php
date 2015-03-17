<?php
	
	require_once('../../vendor/autoload.php');
	require_once('../database.php');
 	
 	use Illuminate\Database\Capsule\Manager as Capsule;

 	ob_start();
 	$location = Venue::find($_POST['id'])->get()->toJson();
 	print $location;

 	return $location;