//User Class
//For storing and manipulating user data...

function User() {
	this.loggedIn = false;
}

User.prototype.setUser = function(data) {
	this.userName = data.userName;
	this.firstName = data.firstName;
	this.lastName = data.lastName;
	this.id = data.ID;
	this.email = data.email;

	this.loggedIn = true;
}

User.prototype.loggedIn = function() {
	return this.loggedIn;
}


//Checks a User into the venue
User.prototype.checkIn = function(venueID) {
	this.checkedIn = venueID;

	//Update database
	$.post("/scripts/User/",
		{
			intent: "checkIn",
			location: venueID
		},
		function(data, status){
			if(data == "Success"){
				//alert("Data: " + data + "\nStatus: " + status);
			}else{
				//alert("Data: " + data + "\nStatus: " + status);
			}
	});
};

//Checks a User out of the venue
User.prototype.checkOut = function() {

	this.checkedIn = null;

	//Update database
	$.post("/scripts/User/",
		{
			intent: "checkOut"
		},
		function(data, status){

	});
};

//Don't trust this yet...
User.prototype.checkedIn = function(){
	return this.checkedIn;
}