<?php
// header("Access-Control-Allow-Origin: *");
// ob_start();

	require_once __DIR__ . '/loginFunctions.php';

	// For the ORM
	require_once('../../vendor/autoload.php');
	require_once('../database.php');
	
	// Also for the ORM
	use Illuminate\Database\Capsule\Manager as Capsule;

	// Email and password from form
	$email = $_POST["email"];
	$password = $_POST["password"];

	$arry = array('userName'=>$email, 'success'=>true, 'errorMessage'=>"");

	// Create the user class by calling the DB for an email match
	$user = User::where('email', $email)->get()->toArray();

	if (!sizeof($user)==1) {
		$arry['success'] = false;
		$arry['errorMessage'] = "Incorrect Email or Password";
	}

	if (!$user[0]['password'] == $password){
		$arry['success'] = false;
		$arry['errorMessage'] = "Incorrect Email or Password";
	}

	else if($arry['success'])
		initialize_user_session($user[0]);

	//print($user);

	print(json_encode($arry));

// $arry = array('userName'=>$email, 'success'=>true, 'errorMessage'=>"");

// // Query for email and password
// $query = $login_database_link->prepare("SELECT ID, userName, password FROM users WHERE userName = ? OR email = ?");
// $query->bind_param('ss', $email, $email);
// $query->execute() or die("Error executing query\n");
// $query->store_result();
// $query->bind_result($userID, $name, $realpw);
// $query->fetch();

// // Exactly one matching email?
// if (! ($query->num_rows === 1)) {
//     //echo "Login failed: email not registered\n";
//     //login_failure("Email not registered");
// 	$arry['success'] = false;
// 	$arry['errorMessage'] = "Email not registered";
// }

// // Matching password?
// else if (! ($password == $realpw)) {
//     //echo "Login failed: incorrect password\n";
//     //login_failure("Incorrect password");
// 	$arry['success'] = false;
// 	$arry['errorMessage'] = "Incorrect Password";
// }

// // Yes!
// //echo "Login successful\n";
// else if($arry['success'])
// 	initialize_user_session($userID);
// //redirect_to("");


	//if ($user.password==$password)


	//$user = User::where('userName', $email)->get();



// echo json_encode($arry);
// ob_end_flush();
?>