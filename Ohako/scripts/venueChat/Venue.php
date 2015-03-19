<?php


class Venue {
	
	public static $name;

	function __construct() {
		$this->name = null;
	}



	function __destruct() {
		
	}




	//Returns the list of active users in the venue
	public function getUsers(){
		return array("ravis411", "user1", "user2", "example");
	}

	//Adds a user to the venue's list of active users
	public function addUser(){

	}

	//Removes a user from the venue's list of active users
	public function removeUser()

}

?>