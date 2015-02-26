<?php
//ini_set('display_errors',1);
//error_reporting(E_ALL);
//ob_start();

require_once __DIR__ . '/loginFunctions.php';

//echo "SHIT";


$userName = trim($_POST["userName"]);
$email = trim($_POST["email"]);
$password = $_POST["password"];
$firstName = trim($_POST["firstName"]);
$lastName = trim($_POST["lastName"]);

//echo "" . $userName . $email . $password . $firstName . $lastName;

$arry = array('userName'=>$email, 'success'=>true, 'errorMessage'=>"");

if (strlen($userName) == 0) {
    $arry["errorMessage"] = "Registration failed: username field empty\n";
	$arry["success"] = false;
    echo json_encode($arry);
	exit;
}
if( strlen($firstName) == 0 || strlen($lastName) == 0){
	$arry["success"] = false;
    echo json_encode($arry);
	exit;
}

if (strlen($email) == 0) {
    $arry["success"] = false;
    echo json_encode($arry);
	exit;
}
if (strlen($password) == 0) {
    $arry["success"] = false;
    echo json_encode($arry);
	exit;
}


$query = $database_link->prepare("SELECT * FROM users WHERE userName = ?") or die("Error preparing selection query");
$query->bind_param('s', $userName);
$query->execute() or die("Error executing selection query");
$query->store_result();

if ($query->num_rows != 0) {
    $arry["errorMessage"] = "Registration failed: username already registered\n";
    $arry["success"] = false;
    echo json_encode($arry);
	exit;
}

$query = $database_link->prepare("SELECT * FROM users WHERE email=?") or die("Error preparing selection query");
$query->bind_param('s', $email);
$query->execute() or die("Error executing selection query");
$query->store_result();

if ($query->num_rows != 0) {
    $arry["errorMessage"] = "Registration failed: email already registered\n";
    $arry["success"] = false;
    echo json_encode($arry);
	exit;
}

$query = $database_link->prepare("INSERT INTO users (firstName, lastName, userName, email, password) VALUES (?,?,?,?,?)") or die("Error preparing insertion query");
$query->bind_param('sssss', $firstName, $lastName, $userName, $email, $password) or die("Error preparing insertion query 2");

if ($query->execute()) {
    $arry["errorMessage"] = "Registration successful\n";
    initialize_user_session(mysqli_insert_id($database_link), $email, $name);
   // redirect_to($home_url);
}

echo json_encode($arry);


?>