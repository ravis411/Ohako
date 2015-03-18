<?php
header("Access-Control-Allow-Origin: *");
ob_start();

require_once __DIR__ . '/loginFunctions.php';

// Email and password from form
$email = $_POST["email"];
$password = $_POST["password"];

$arry = array('userName'=>$email, 'success'=>true, 'errorMessage'=>"");

// Query for email and password
$query = $login_database_link->prepare("SELECT ID, userName, password FROM users WHERE userName = ? OR email = ?");
$query->bind_param('ss', $email, $email);
$query->execute() or die("Error executing query\n");
$query->store_result();
$query->bind_result($userID, $name, $realpw);
$query->fetch();

// Exactly one matching email?
if (! ($query->num_rows === 1)) {
    //echo "Login failed: email not registered\n";
    //login_failure("Email not registered");
	$arry['success'] = false;
	$arry['errorMessage'] = "Email not registered";
}

// Matching password?
else if (! ($password == $realpw)) {
    //echo "Login failed: incorrect password\n";
    //login_failure("Incorrect password");
	$arry['success'] = false;
	$arry['errorMessage'] = "Incorrect Password";
}

// Yes!
//echo "Login successful\n";
else if($arry['success'])
	initialize_user_session($userID);
//redirect_to("");


echo json_encode($arry);
ob_end_flush();
?>