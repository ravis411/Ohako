
var UPPERDIVSTATES = {closed: "closed", open: "open"};
var upperDivState = UPPERDIVSTATES.closed;
var upperDiv = null;

var LOGINSTATES = {login:"login", register:"register"};
var loginState = LOGINSTATES.login;

function loginButtonsInit(){
	console.log("y");
	
	$("#header #headerLogInDiv").on("click", menuClickHandler);
	$("#upperDiv #loginForm #loginFormSubmitButton").on("click", logInClickHandler);
	$("#upperDiv #loginForm").on("submit", logInSubmitHandler);
	$("#upperDiv #registrationDiv #registrationSubmitButton").on("click", registrationClickHandler);
	$("#upperDiv #loginDiv #loginFormSwitchToRegistrationButton").on("click", switchLogRegClickHandler);
	$("#upperDiv #registrationDiv #registrationSwitchToLoginButton").on("click", switchLogRegClickHandler);
		
	//Hack for testing
	loginError = false;
	if(loginError === true){
		upperDivState = UPPERDIVSTATES.open;
	}
	
	//inputKeyPressInit();
}

function switchLogRegClickHandler(e){
	console.log('hey')
	if(loginState == LOGINSTATES.login){
		loginState = LOGINSTATES.register;
		$("#loginDiv").hide();
		$("#registrationDiv").show();
	}else{
		loginState = LOGINSTATES.login;
		$("#registrationDiv").hide();
		$("#loginDiv").show();
	}
}

function menuClickHandler(e){
	console.log("Hry");
	e.preventDefault();
	e.stopPropagation();
	if(upperDivState == UPPERDIVSTATES.closed){
		
		upperDivState = UPPERDIVSTATES.open;
		upperDiv.slideDown();
		
	}else{
		upperDivState = UPPERDIVSTATES.closed;
		upperDiv.slideUp();
	}
}

function inputKeyPressInit(){
	$("#registrationForm :input").keypress(function (e) {	
		if (e.keyCode == 13) {
			e.preventDefault();
			e.stopPropagation();
			if( $(this)[0] == $("#registrationPassword2")[0] ){
				register();
				return false;
			}else{
				$(this).nextAll(":input").get(0).focus();
				return false;
			}
		}
	});
}

function logInClickHandler(e){
	console.log("log in clicked");
	e.preventDefault();
	logIn();
}
function logInSubmitHandler(e){
	e.preventDefault();
	console.log("Submit");
	logIn();
}

function registrationClickHandler(e){
	e.preventDefault();
	register();
}

function register(){
	$("#registrationDiv #registrationForm input[type='text'], input[type!='submit']").css("background", "white");
	$("#upperDiv #registrationDiv #registrationFail").html("");
	var firstName = $("#upperDiv #registrationDiv #registrationFirstName").val();
	var lastName = $("#upperDiv #registrationDiv #registrationLastName").val();
	var userName = $("#upperDiv #registrationDiv #registrationUserName").val();
	var email = $("#upperDiv #registrationDiv #registrationEmail").val();
	var pass = $("#upperDiv #registrationDiv #registrationPassword").val();
	var pass2 = $("#upperDiv #registrationDiv #registrationPassword2").val();
	
	
	//Basic Input checking
	
	if(pass != pass2 || pass.length < 1){
		$("#upperDiv #registrationDiv #registrationPassword2").val("");
		$("#upperDiv #registrationDiv #registrationPassword").val("");
		$("#registrationPassword").css("background", "red");
		$("#registrationPassword").focus();
		$("#registrationPassword2").css("background", "red");
		$("#upperDiv #registrationDiv #registrationFail").text("Passwords do not match.");
	}
	
	if(email.length <= 3){
		$("#registrationEmail").css("background", "red");
		$("#registrationEmail").focus();
		$("#upperDiv #registrationDiv #registrationFail").html("Please enter a valid email.");
	}
	
	if(userName.length == 0){
		$("#registrationUserName").css("background", "red");
		$("#registrationUserName").focus();
		$("#upperDiv #registrationDiv #registrationFail").html("Please enter a username.");
	}
	
	if(lastName.length == 0){
		$("#registrationLastName").css("background", "red");
		$("#registrationLastName").focus();
		$("#upperDiv #registrationDiv #registrationFail").html("Please enter your full name.");
	}
	if(firstName.length == 0){
		$("#registrationFirstName").css("background", "red");
		$("#registrationFirstName").focus();
		$("#upperDiv #registrationDiv #registrationFail").html("Please enter your full name.");
	}
	
	//End input checking
	if( $( "#upperDiv #registrationDiv #registrationFail").html() == "" )
	{
		$( "#upperDiv #registrationDiv #registrationFail").html("Submitting?..");
	}else
		return false;
	
	$( "#upperDiv #registrationDiv #registrationFail").html("Submitting?....?");
	$.post("http://wrytek.us/scripts/login/register.php",
		{
			userName:userName,
			password:pass,
			firstName:firstName,
			lastName:lastName,
			email:email
		},
		function(data, status){
			//alert("CALLBACK Data: " + data + "  \n::::?Status???::: " + status);
			if(data.success){
				//alert("Succs " + data);
				$("#upperDiv #registrationForm #registrationFail").html(data.errorMessage);
				$("#upperDiv #registrationForm #registrationFail").show();
				location.reload(true);
			}
			else{
				//alert("DATAAA: ");
				$("#upperDiv #registrationForm #registrationFail").html(data.errorMessage);
				$("#upperDiv #registrationForm #registrationFail").show();
			}
		},"json");
}

function logIn(){
	var userName = $("#loginForm #loginFormUserName").val();
	var pass = $("#loginForm #loginFormPassword").val();

	$.post("/scripts/login/checkLogin.php",
		{
			email:userName,
			password:pass
		},
		function(data, status){
			if(data.success)
				//alert("loged in?" + document.cookie + "\n\n" + data.toSource());
				location.reload(true);
			else{
				$("#upperDiv #loginForm #loginFail").html(data.errorMessage);
				$("#upperDiv #loginForm #loginFail").show();
			}
		}, "json");
}