<?php
require_once __DIR__ . '/loginFunctions.php';

class User {

	//Returns true if the user is successfully logged in, false otherwise
	public static function isLoggedIn(){
		return user_logged_in();
	}

	public static function getUserName(){
		if( self::isLoggedIn() && isset( $_SESSION["userName"] ) ){
			return $_SESSION["userName"];
		}else{
			return null;
		}
	}

	//return the userID of the user if they are logged in, otherwise null
	public static function getUserID(){
		if( self::isLoggedIn() && isset($_SESSION["userID"]) ){
			return $_SESSION["userID"];
		}else{
			return null;
		}
	}

	//returns the email of the currently logged in user, false otherwise
	public static function getEmail(){
		if( self::isLoggedIn() && isset( $_SESSION["email"] ) ){
			return $_SESSION["email"];
		}else{
			return null;
		}
	}

	//returns the first name of the currently logged in user
	public static function getFirstName(){
		if( self::isLoggedIn() && isset( $_SESSION["firstName"] ) ){
			return $_SESSION["email"];
		}else{
			return null;
		}
	}

	//returns the last name of the currently logged in user
	public static function getLastName(){
		if( self::isLoggedIn() && isset( $_SESSION["lastName"] ) ){
			return $_SESSION["email"];
		}else{
			return null;
		}
	}

	//returns the user data as an associative array
	public static function getData(){
		if( self::isLoggedIn() ){
			$arr = array();
			$arr['ID'] = $_SESSION["userID"];
			$arr['firstName'] = $_SESSION["firstName"];
			$arr['lastName'] = $_SESSION["lastName"];
			$arr['userName'] = $_SESSION["userName"];
			$arr['email'] = $_SESSION["email"];
			$arr['checkedIn'] = null;
			return json_encode($arr);
		}else{
			return null;
		}
	}

}//End of User class

?>