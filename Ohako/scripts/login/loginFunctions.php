<?php

/*******************************************/
/************ Database variables ***********/
/************ Do not modify EVER ***********/
/*******************************************/

$database_hostname = "ryanwalkerdavis.com";
$database_username = "one";
$database_password = "conquest";
$database_name = "ryanwalkerdavis";

// Creates connection
$database_link = mysqli_connect("$database_hostname", "$database_username", "$database_password", "$database_name") or die("Error connecting to database\n");



/*******************************************/
/************* URL manipulation ************/
/*******************************************/

$base_url = "http://ryanwalkerdavis.com/";
$home_url = "";
$login_url = "";
$login_failure_url = $login_url;// . "?failure_reason=";


/* Redirects the user to the supplied URL */
function redirect_to($new_url)
{
    global $base_url;
    header("location:" . $base_url . $new_url);
    exit();
}

/*******************************************/
/**************** Login/out ****************/
/*******************************************/

/* Sends the user back to the login page for the supplied reason */
function login_failure($reason)
{
	global $login_failure_url;
	session_start();
	$_SESSION["login_failure"] = $reason;
   // redirect_to("$login_failure_url$reason");
	redirect_to("$login_failure_url");
}

/* Checks if a user is logged in */
function user_logged_in()
{
		if (isset($_COOKIE['seshID'])) {
			//Session cookie is set...check confirm with database...
			if(isset($_SESSION["userID"])){
				//and session is set lets just return true if userID matches
				if($_COOKIE['userID'] == $_SESSION["userID"]){
					return true;
				}
			}
			
			$seshID = $_COOKIE['seshID'];
			global $database_link;
			$query = $database_link->prepare("SELECT userID, expires FROM userSessions WHERE sessionID=?");
			$query->bind_param('s', $seshID);
			$query->execute();
			$query->store_result();
			$query->bind_result($userID, $expires);
			if ($query->num_rows != 0) {
				$query->fetch();
				
				//entry with same seshID found in database...check if userID matches cookie
				if(isset($_COOKIE['userID'])){
					if($_COOKIE['userID'] == $userID){
						return initialize_user_session($userID);
					}	
				}
				
			}else{
				//seshID not found in database
				log_out();
			}
			
		}//end if cookie set		
		else if(isset($_SESSION["userID"])){
			log_out();
		}
	return false;
}

/* Starts a user's session with field from their row in the database */
function initialize_user_session($userID)
{
    session_start();
	
	//If get data from database
	
		// Query for email and password
		global $database_link;
		$query = $database_link->prepare("SELECT firstName, lastName, userName, email FROM users WHERE ID = ?");
		$query->bind_param('d', $userID);
		$query->execute();
		$query->store_result();
		$query->bind_result($firstName, $lastName, $userName, $email);
		$query->fetch();
	
	
    $_SESSION["userID"] = $userID;
    $_SESSION["email"] = $email;
    $_SESSION["firstName"] = $firstName;
	$_SESSION["lastName"] = $lastName;
	$_SESSION["userName"] = $userName;
	
	//
	//Lets set a cookie!! and save it in the database
	//
	if(!isset($_COOKIE['seshID'])){
		$expire = time()+60*60*24*30;
		setCookie("seshID", session_id(), $expire, "/", ".ryanwalkerdavis.com", TRUE, true);
		setCookie("userID", $userID, $expire, "/", ".ryanwalkerdavis.com", TRUE, true);
		//save in database
		$query = $database_link->prepare("INSERT INTO userSessions (userID, sessionID, expires) VALUES (?,?,?)");
		$query->bind_param('sss', $userID, session_id(), $expire);
		$query->execute();
	}
	return true;
}

/* Logs a user out */
function log_out()
{
	if(isset( $_COOKIE['seshID']) ){
		$seshID = $_COOKIE['seshID'];
		global $database_link;
		$query = $database_link->prepare("DELETE FROM `ryanwalkerdavis`.`userSessions` WHERE `userSessions`.`sessionID` = ? ");
		$query->bind_param('s', $seshID);
		$query->execute();
	}
		
    session_start();
	$_SESSION = array();
	if (ini_get("session.use_cookies")) {
		$params = session_get_cookie_params();
		setcookie(session_name(), '', time() - 42000, "/", ".ryanwalkerdavis.com", TRUE, true);
	}
    session_destroy();
	
	setCookie("seshID", "", time(), "/", ".ryanwalkerdavis.com", TRUE, true);
	setCookie("userID", "", time(), "/", ".ryanwalkerdavis.com", TRUE, true);
	
    global $login_url;
	redirect_to($login_url);
}

/* Returns error string if user not logged in. Use in request-handler PHP files */
function error_if_not_logged_in()
{
    if ($_POST["testing"] != "magic" && ! user_logged_in()) {
        echo "Error: user is not logged in.\n";
        exit();
    }
}

?>