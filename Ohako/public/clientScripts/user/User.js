//User Class
//For storing and manipulating user data...

// var User = function(info){
// 	// this.ID = info.ID;
// 	// this.firstName = info.firstName;
// 	// this.lastName = info.lastName;
// 	// this.userName = info.userName;
// 	// this.email = info.email;
// 	// this.checkedIn = info.checkedIn;
// };

function User() {

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