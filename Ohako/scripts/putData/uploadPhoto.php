<?php
	require_once('../../vendor/autoload.php');
	require_once('../database.php');
 	
 	use Illuminate\Database\Capsule\Manager as Capsule;

	require_once __DIR__ . '/../login/User.php';

	$target_dir = "../../images/users/";

	echo User::getUserID();

	 //$target_dir . basename($_FILES["fileToUpload"]["name"]);
	$uploadOk = 1;
	$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
	$target_file = $target_dir . User::getUserID() . '.' . $imageFileType;

	// Check if image file is a actual image or fake image
	if(isset($_POST["submit"])) {
	    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
	    if($check !== false) {
	        echo "File is an image - " . $check["mime"] . ".";
	        $uploadOk = 1;
	    } else {
	        echo "File is not an image.";
	        $uploadOk = 0;
	    }

	    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
	        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
	        $picture = UserPictures::where('user_id', User::getUserID())->first();
	        $picture->location = 'images/users/' . User::getUserID() . '.' . $imageFileType;
	        $picture->save();
	    }	    
}