<?php
	require_once('../../vendor/autoload.php');
	require_once('../database.php');
 	
 	use Illuminate\Database\Capsule\Manager as Capsule;

	require_once __DIR__ . '/../login/User.php';

	$target_dir = __DIR__ . "../../images/users/";
	$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

	$target_dir . basename($_FILES["fileToUpload"]["name"]);
	$uploadOk = 1;
	$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
	$target_file = $target_dir . User::getUserID() . '.' . $imageFileType;

	// Check if image file is a actual image or fake image
	if(isset($_POST["submit"])) {
	    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
	    if($check !== false) {
	        $uploadOk = 1;
	    } else {
	        $uploadOk = 0;
	    }

	    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
	        $picture = UserPictures::where('user_id', User::getUserID())->first();
	        if(sizeof($picture)<1){
	        	$picture = new UserPictures;
	        	$picture->user_id=User::getUserID();
	        }
	        $picture->location = 'images/users/' . User::getUserID() . '.' . $imageFileType;
	        $picture->save();
	    }	    

	    header("location:" . $base_url);
}